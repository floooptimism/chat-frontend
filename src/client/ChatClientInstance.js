import pinia from '../stores/piniaInstance';

// * Stores
import useChannel from '../stores/channel';
import useUsersInChannel from '../stores/usersInChannel';

import ChatClient from './ChatClient';


const client = new ChatClient();
const globalStoreChannel = useChannel(pinia);
const globalStoreUsersInChannel = useUsersInChannel(pinia);



function updateRooms(rooms){
    globalStoreChannel.setChannelList(rooms);
}

function updateUsersInRoom({users, newUser, userThatLeft}){
    globalStoreUsersInChannel.updateUsers(users);
}

function updateCurrentRoom({roomID}){
    globalStoreChannel.setCurrentChannel(roomID);
}



client.subscribe('update_rooms', updateRooms);
client.subscribe('other_user_joined_room', updateUsersInRoom);
client.subscribe('other_user_left_room', updateUsersInRoom);
client.subscribe('join_room_success', updateCurrentRoom);

export default client;