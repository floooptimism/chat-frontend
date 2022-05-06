import { faker } from '@faker-js/faker';

// generate messages with timestamp, message content and users using the result from generateUsers
function generateMessages(length, users){
    let messages = [];
    for(let i = 0; i < length; i++){
        let message = {
            timestamp: faker.date.recent(),
            content: faker.lorem.lines(),
            user: users[faker.random.number(users.length - 1)]
        }
        messages.push(message);
    }
    return messages;
}

export default generateMessages;