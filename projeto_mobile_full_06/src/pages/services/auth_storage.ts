import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../model/User";

class AuthStorage {
  private static readonly KEY = "@AUTH:LOGGED_USER";

  public async getLoggedUser() {
    const json = await AsyncStorage.getItem(AuthStorage.KEY);
    return json ? JSON.parse(json) as User : null;
  }

  public async setLoggedUser(user: User) {
    const json = JSON.stringify(user);
    await AsyncStorage.setItem(AuthStorage.KEY, json);
  }

  public async removeLoggedUser() {
    await AsyncStorage.removeItem(AuthStorage.KEY);
  }
}

export const authStorage = new AuthStorage();
