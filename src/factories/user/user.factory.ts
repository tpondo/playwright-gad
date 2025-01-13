import { faker } from '@faker-js/faker/locale/en';
import { RegisterUser } from '../../models/user/user.model';

export function randomUserData(): RegisterUser {
  const registerUser: RegisterUser = {
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
