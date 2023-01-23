export interface LoginProps {
  email: string;
  password: string;
}

export interface UserProps extends LoginProps {
  id?: number;
  username: string;
  role: string;
}
