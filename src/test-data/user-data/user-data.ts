import { USER_EMAIL, USER_PASSWORD } from '@_env-config';
import { LoginUserModel } from '@_src/models/user/user.model';

export const testUser1: LoginUserModel = {
  userEmail: USER_EMAIL,
  userPassword: USER_PASSWORD,
};
