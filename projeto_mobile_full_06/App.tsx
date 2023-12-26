import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/pages/Home";
import Login from "./src/pages/Login";
import User from "./src/pages/User";
import Roles from "./src/pages/Roles";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: "Access" }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: "Home" }}
        />
        <Stack.Screen name="User" component={User} />
        <Stack.Screen name="Roles" component={Roles}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
