import User from '../../database/models/User';
import { LoginProps } from '../interfaces/userProps';

export default class UserService {
  public model;

  constructor() {
    this.model = User;
  }

  public login = async ({ email, password }: LoginProps) => {
    const user = await this.model.findOne({ where: { email } });
  };
}
