import React from "react";
import styles from "./styles";
import { View, Alert, TouchableOpacity, Text } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import Input from "../components/Input";
import { authService } from "../services/auth_service";

export default function Login() {
  /* VARIÁVEIS */
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigation = useNavigation<NavigationProp<any>>();

  /* PERSONALIZAÇÃO TOPO */
  React.useEffect(() => {
    navigation.setOptions({
      title: "Access",
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

  /* LOGIN */
  const handleSignIn = () => {
    if (
      !username ||
      username.trim() === "" ||
      !password ||
      password.trim() === ""
    ) {
      Alert.alert("Todos os campos são obrigatórios.");
      return false;
    }

    authService.login(username, password).then((logged) => {
      if (logged) {
        Alert.alert("Seja bem-vindo(a)!");
        navigation.navigate("Home");
      } else {
        Alert.alert("Login e/ou senha invalído(a).");
        return false;
      }
    });
  };

  /* COMPONENTE */
  return (
    <View style={styles.container}>
      <Input label="Login" onChangeText={setUsername} style={styles.input} />
      <Input
        label="Password"
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />

      <View style={styles.buttonView}>
        <TouchableOpacity onPress={handleSignIn} style={styles.loginButton}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
