export interface User {
  username: string;
  hashed_password?: string;
  locked_at: Date;
  login_at: null | Date;
}
