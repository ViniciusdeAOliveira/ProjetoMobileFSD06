export interface User {
  id?: number;
  name: string;
  username: string;
  roles: string[];
  password?: string;
  token?: string;
}
