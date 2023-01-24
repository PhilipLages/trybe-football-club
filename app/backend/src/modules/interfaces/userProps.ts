export interface LoginProps {
  email: string;
  password: string;
}

export interface UserProps extends LoginProps {
  id?: number;
  username: string;
  role?: string;
}

export interface GetUserProps {
  status: number,
  data: {
    message?: string;
    role?: string,
  }
}
