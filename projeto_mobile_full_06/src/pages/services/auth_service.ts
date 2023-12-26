import { authStorage } from "./auth_storage";

class AuthService {
  private url = "http://192.168.0.108:3030/auth";

  public async login(username: string, password: string) {
    const response = await fetch(`${this.url}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (response.status === 201) {
      const data = await response.json();
      await authStorage.setLoggedUser(data);
      return true;
    }

    return false;
  }
}

export const authService = new AuthService();
