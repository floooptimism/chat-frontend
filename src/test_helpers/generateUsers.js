import { faker } from "@faker-js/faker";

// generate user with userid and username
function generateUsers(length) {
  let users = [];
  for (let i = 0; i < length; i++) {
    let user = {
      profileImage: faker.image.avatar(),
      id: faker.random.alphaNumeric(10),
      username: faker.name.firstName(),
    };
    users.push(user);
  }
  return users;
}

export default generateUsers;
