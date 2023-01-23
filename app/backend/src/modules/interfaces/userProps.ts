export interface LoginProps {
  email: string;
  password: string;
}

export interface UserProps extends LoginProps {
  username: string;
  role: string;
}
