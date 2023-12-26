import React from "react";
import { User } from "../model/User";
import { Alert, Button, StyleSheet, Text, View } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { userService } from "../services/user_service";

type Props = {
  user: User;
};

export default function ListUser({ user }: Props) {
  const navigation = useNavigation<NavigationProp<any>>();

  function goToEditUser(user: User) {
    navigation.navigate("User", { user });
  }

  const removeUser = (id: number | undefined) => {
    userService
      .delete(id)
      .then((result) => {
        Alert.alert("Usuário removido!");
        navigation.navigate("Home");
      })
      .catch((error) => {
        Alert.alert("Erro ao apagar o usuário");
      });

    navigation.navigate("Home", { refreshUser: true });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{user.name}</Text>
      <Text style={styles.subtitle}>{user.username}</Text>
      <Button title="Edit" onPress={() => goToEditUser(user)} color="#6059FF" />
      <Button title="Remove" onPress={() => removeUser(user.id)} color="#333" />
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
