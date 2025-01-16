import { LoginUserModel } from '../../models/user/user.model';

export const testUser1: LoginUserModel = {
  userEmail: process.env.TEST_EMAIL_1 ?? '[NOT SET]',
  userPassword: process.env.TEST_PASSWORD_1 ?? '[NOT SET]',
};
