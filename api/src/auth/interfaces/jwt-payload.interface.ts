export interface JwtPayload {
  sub: string;
  sid: string;
  jti: string;
  email?: string;
  role?: string;
}
