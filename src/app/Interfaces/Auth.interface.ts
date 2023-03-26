export interface IAuth {
  id: string;
  message: string;
  isAuthenticated: boolean;
  name: string;
  token: string;
  expiresOn: Date;
}
