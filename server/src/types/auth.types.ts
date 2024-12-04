export interface UserPayload {
  id: string;
  email: string;
  name?: string;
}

export interface TokenPayload {
  userId: string;
}
