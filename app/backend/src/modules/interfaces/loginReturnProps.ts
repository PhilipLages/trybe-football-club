export default interface LoginReturnProps {
  status: number;
  data: {
    message?: string;
    token?: string;
  }
}
