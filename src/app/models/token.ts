export interface Token {
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
  refreshExpiresIn: number;
  accessTokenExpirationTime: number;
}
