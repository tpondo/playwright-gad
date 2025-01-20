import { faker } from '@faker-js/faker/locale/en';
import { RegisterUserModel } from '@_src/models/user/user.model';

export function prepareRandomUserData(): RegisterUserModel {
  const registerUser: RegisterUserModel = {
    userFirstName: faker.person.firstName().replace(/[^A-Za-z]/g, ''),
    userLastName: faker.person.lastName().replace(/[^A-Za-z]/g, ''),
    userEmail: '',
    userPassword: faker.internet.password(),
  };

  registerUser.userEmail = faker.internet.email({
    firstName: registerUser.userFirstName,
    lastName: registerUser.userLastName,
  });

  return registerUser;
}
