import React, { useState } from "react";
import styles from "./styles";
import { Button, View, Alert, TouchableOpacity, Text } from "react-native";
import {
  NavigationProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { userService } from "../services/user_service";
import { Roles } from "../model/Roles";
import { rolesService } from "../services/roles_service";
import Input from "../components/Input";
import Check from "../components/Check";

export default function User() {
  /* VARIÁVEIS */
  const navigation = useNavigation<NavigationProp<any>>();
  const route = useRoute();
  const params = route.params as any;
  const user = params ? params.user : undefined;
  const fetchUserList = params ? params.fetchUserList : undefined;

  const [name, setName] = React.useState(user ? user.name : "");
  const [login, setLogin] = React.useState(user ? user.username : "");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [rolesSelected, setRolesSelected] = React.useState<string[]>([]);
  const [roles, setRoles] = React.useState<Roles[]>([]);
  const fields = [name, login, password, confirmPassword];

  /* PERSONALIZAÇÃO TOPO */
  React.useEffect(() => {
    navigation.setOptions({
      headerTitleAlign: "center",
      headerStyle: {
        backgroundColor: "#AD8BFF",
        elevation: 0,
        shadowOpacity: 0,
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
        marginLeft: 10,
      },
      headerRightContainerStyle: {
        marginRight: 10,
      },
    });
  }, []);

  /* TÍTULO DINÂMICO */
  React.useEffect(() => {
    if (user === undefined) {
      navigation.setOptions({ title: "New User" });
    } else {
      navigation.setOptions({ title: "Update User" });
    }
  }, []);

  /* LISTA AS ROLES */
  React.useEffect(() => {
    fetchRolesList(user);
  }, [user]);

  /* PERMITE SELECIONAR AS ROLES */
  const handleCheckRoles = (roleChecked: any) => {
    const roleID = roleChecked.id;

    setRoles((prevRoles) =>
      prevRoles.map((role: any) =>
        role.id === roleID ? { ...role, isChecked: !role.isChecked } : role
      )
    );
  };

  React.useEffect(() => {
    setRolesSelected(
      roles.filter((role) => role.isChecked).map((role) => role.name)
    );
  }, [roles]);

  const fetchRolesList = (user: any) => {
    rolesService
      .list()
      .then((result) => {
        if (user === undefined) {
          setRoles(
            result.map((role: any) => ({
              ...role,
              isChecked: false,
            }))
          );
        } else {
          setRoles(
            result.map((role: any) => ({
              ...role,
              isChecked:
                user.roles && user.roles.length > 0
                  ? user.roles.some((roleUser: any) => roleUser === role.name)
                  : false,
            }))
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /* CADASTRAR */
  const handleRegister = () => {
    let verifyFields = 0;

    fields.forEach((field) => {
      if (field.length <= 0) {
        verifyFields++;
      }
    });

    if (verifyFields === 0) {
      if (password !== confirmPassword) {
        Alert.alert("Senha e confirma senha devem ser iguais.");
        return false;
      } else if (rolesSelected.length <= 0) {
        Alert.alert("Selecione no mínimo uma permissão");
        return false;
      } else {
        userService
          .create(name, login, password, rolesSelected)
          .then((result) => Alert.alert("Usuário cadastrado com sucesso!"))
          .catch((error) => Alert.alert("Ocorreu um erro no cadastro."));

        navigation.navigate("Home", { refreshUser: true });
      }
    } else {
      Alert.alert("Todos os campos são obrigatórios.");
      return false;
    }
  };

  /* ATUALIZAR */
  const handleUpdate = () => {
    let verifyFields = 0;

    fields.forEach((field) => {
      if (field.length <= 0) {
        verifyFields++;
      }
    });

    if (verifyFields === 0) {
      if (password !== confirmPassword) {
        Alert.alert("Senha e confirma senha devem ser iguais.");
        return false;
      } else if (rolesSelected.length <= 0) {
        Alert.alert("Selecione no mínimo uma permissão");
        return false;
      } else {
        userService
          .update({
            id: user.id,
            name: name,
            username: login,
            password: password,
            roles: rolesSelected,
          })
          .then((result) => Alert.alert("Usuário atualizado com sucesso!"))
          .catch((error) => Alert.alert("Ocorreu um erro na atualização."));

        navigation.navigate("Home", { refreshUser: true });
      }
    } else {
      Alert.alert("Todos os campos são obrigatórios.");
      return false;
    }
  };

  /* COMPONENTE */
  return (
    <View style={styles.container}>
      <Input
        label="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <Input
        label="Login"
        value={login}
        onChangeText={setLogin}
        editable={user === undefined}
        style={styles.input}
      />

      <Input
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <Input
        label="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        style={styles.input}
      />

      {roles.map((role) => (
        <Check
          key={role.id}
          label={role.name}
          onPressCheck={() => {
            handleCheckRoles(role);
          }}
          isChecked={role.isChecked}
        />
      ))}

      <View style={styles.buttonView}>
        <TouchableOpacity
          onPress={user === undefined ? handleRegister : handleUpdate}
          style={styles.userButton}
        >
          <Text style={styles.buttonText}>
            {user === undefined ? "Register" : "Update"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
