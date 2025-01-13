import { LoginUser } from '../../models/user/user.model';

export const testUser1: LoginUser = {
  userEmail: process.env.TEST_EMAIL_1 ?? '[NOT SET]',
  userPassword: process.env.TEST_PASSWORD_1 ?? '[NOT SET]',
};
