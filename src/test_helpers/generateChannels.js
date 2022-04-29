import { faker } from '@faker-js/faker';


function generate(length){
    let channels = [];
    for(let i = 0; i < length; i++){
        let channel = {
            channelId: faker.random.alphaNumeric(10),
            channelName: faker.animal.fish(),
            channelDescription: faker.lorem.lines(),
            channelImage: faker.image.abstract(100, 100, true)
        }
        channels.push(channel);
    }
    return channels;
}

export default generate;