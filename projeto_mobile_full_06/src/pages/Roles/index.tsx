import React, { useState } from "react";
import styles from "./styles";
import { Button, View, Alert, TouchableOpacity, Text } from "react-native";
import {
  NavigationProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { rolesService } from "../services/roles_service";
import Input from "../components/Input";

export default function Roles() {
  /* VARIÁVEIS */
  const navigation = useNavigation<NavigationProp<any>>();
  const route = useRoute();
  const params = route.params as any;
  const roles = params ? params.roles : undefined;

  const [name, setName] = React.useState(roles ? roles.name : "");
  const [description, setDescription] = React.useState(
    roles ? roles.description : ""
  );
  const fields = [name, description];

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
    if (roles === undefined) {
      navigation.setOptions({ title: "New Role" });
    } else {
      navigation.setOptions({ title: "Update Role" });
    }
  }, []);

  /* CADASTRAR */
  const handleRegister = () => {
    let verifyFields = 0;

    fields.forEach((field) => {
      if (field.length <= 0) {
        verifyFields++;
      }
    });

    if (verifyFields === 0) {
      rolesService
        .create(name, description)
        .then((result) => Alert.alert("Permissão cadastrada com sucesso!"))
        .catch((error) => Alert.alert("Ocorreu um erro no cadastro."));

      navigation.navigate("Home", { refreshRoles: true });
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
      rolesService
        .update(roles.id, name, description)
        .then((result) => Alert.alert("Permissão atualizada com sucesso!"))
        .catch((error) => Alert.alert("Ocorreu um erro na atualização."));

      navigation.navigate("Home", { refreshRoles: true });
    } else {
      Alert.alert("Todos os campos são obrigatórios.");
      return false;
    }
  };

  /* COMPONENTE */
  return (
    <View style={styles.container}>
      <Input label="Name" value={name} onChangeText={setName} style={styles.input} />

      <Input
        label="Description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />

      <View style={styles.buttonView}>
        <TouchableOpacity
          onPress={roles === undefined ? handleRegister : handleUpdate}
          style={styles.rolesButton}
        >
          <Text style={styles.buttonText}>
            {roles === undefined ? "Register" : "Update"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
