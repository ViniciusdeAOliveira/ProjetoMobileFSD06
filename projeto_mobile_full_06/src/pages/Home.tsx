import React from "react";
import { FlatList, Text, View, TouchableOpacity } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { userService } from "./services/user_service";
import { User } from "./model/User";
import { rolesService } from "./services/roles_service";
import { Roles } from "./model/Roles";
import ListUser from "./components/ListUser";
import ListRoles from "./components/ListRoles";
import { StyleSheet } from "react-native";

export default function Home({ route }: any) {
  const [users, setUsers] = React.useState<User[]>([]);
  const [roles, setRoles] = React.useState<Roles[]>([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const navigation = useNavigation<NavigationProp<any>>();

  React.useEffect(() => {
    const { refreshUser, refreshRoles } = route.params || {};

    if (refreshUser) {
      fetchUserList();
    }

    if (refreshRoles) {
      fetchRolesList();
    }
  }, [route.params]);

  React.useEffect(() => {
    navigation.setOptions({
      title: "Home",
      headerTitleAlign: "center",
      headerLeft: () => (
        <TouchableOpacity onPress={logOff} style={styles.exitButton}>
          <Text style={styles.buttonText}>Exit</Text>
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={goToCreateUser} style={styles.button}>
            <Text style={styles.buttonText}>Users</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={goToCreateRoles} style={styles.button}>
            <Text style={styles.buttonText}>Roles</Text>
          </TouchableOpacity>
        </View>
      ),
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

    fetchUserList();
    fetchRolesList();
  }, []);

  const fetchUserList = () => {
    setRefreshing(true);

    userService
      .list()
      .then((result) => {
        setUsers(result);
        setRefreshing(false);
      })
      .catch((error) => {
        setRefreshing(false);
        logOff();
      });
  };

  const fetchRolesList = () => {
    setRefreshing(true);

    rolesService
      .list()
      .then((result) => {
        setRoles(result);
        setRefreshing(false);
      })
      .catch((error) => {
        setRefreshing(false);
        logOff();
      });
  };

  function logOff() {
    navigation.goBack();
  }

  function goToCreateUser() {
    navigation.navigate("User");
  }

  function goToCreateRoles() {
    navigation.navigate("Roles");
  }

  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        <Text style={styles.listTitle}>Lista de Usuários</Text>

        <FlatList
          data={users}
          onRefresh={fetchUserList}
          refreshing={refreshing}
          renderItem={({ item }) => <ListUser user={item} />}
          style={styles.flatListStyle}
          nestedScrollEnabled={true}
        />
      </View>

      <View style={styles.listContainer}>
        <Text style={styles.listTitle}>Lista de Permissões</Text>

        <FlatList
          data={roles}
          onRefresh={fetchRolesList}
          refreshing={refreshing}
          renderItem={({ item }) => <ListRoles role={item} />}
          style={styles.flatListStyle}
          nestedScrollEnabled={true}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f0f0",
  },
  listContainer: {
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
  listTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  flatListStyle: {
    flexGrow: 1,
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  button: {
    marginRight: 10,
    padding: 7,
    backgroundColor: "#6059FF",
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
  },
  exitButton: {
    padding: 6,
    backgroundColor: "#333",
    borderRadius: 5,
  },
});
