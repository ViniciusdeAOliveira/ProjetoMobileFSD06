import React from "react";
import { Roles } from "../model/Roles";
import { Alert, Button, StyleSheet, Text, View } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { rolesService } from "../services/roles_service";

type Props = {
  role: Roles;
};

export default function ListRoles({ role }: Props) {
  const navigation = useNavigation<NavigationProp<any>>();

  function goToEditRoles(roles: Roles) {
    navigation.navigate("Roles", { roles });
  }

  const removeRoles = (id: number | undefined) => {
    rolesService
      .delete(id)
      .then((result) => {
        Alert.alert("Permissão removida!");
        navigation.navigate("Home");
      })
      .catch((error) => {
        Alert.alert("Erro ao apagar a permissão");
      });

    navigation.navigate("Home", { refreshUser: true });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{role.name}</Text>
      <Text style={styles.subtitle}>{role.description}</Text>
      <Button
        title="Edit"
        onPress={() => goToEditRoles(role)}
        color="#6059FF"
      />
      <Button
        title="Remove"
        onPress={() => removeRoles(role.id)}
        color="#333"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    marginBottom: 20,
    padding: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
