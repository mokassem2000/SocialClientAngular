export interface IAuth {
  message: string;
  isAuthenticated: boolean;
  name: string;
  token: string;
  expiresOn: Date;
}
