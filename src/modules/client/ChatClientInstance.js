import ChatClient from './ChatClient';
import pinia from '../../stores/piniaInstance';

// * Stores
import useChannelStore from '../../stores/channel.store';
import useUsersInChannelStore from '../../stores/usersInChannel.store';
import useChatClientStateStore from '../../stores/chatClient.store';
import useSidebarStore from '../../stores/sidebar.store';


const client = new ChatClient();
const channelStore = useChannelStore(pinia);
const usersInChannelStore = useUsersInChannelStore(pinia);
const chatClientStore = useChatClientStateStore(pinia);
const STORE_sidebar = useSidebarStore(pinia);

window.chatClient = chatClientStore;



function updateRooms(rooms){
    channelStore.setChannelList(rooms);
}

function updateUsersInRoom({users, newUser, userThatLeft}){
    usersInChannelStore.updateUsers(users);
}

function updateCurrentRoom({room}){
    channelStore.setCurrentChannel(room);
    STORE_sidebar.setIsDisplayingChannels(false);
}

function connected(){
    console.log("Succesfully connected to socket server");
    chatClientStore.connected();
}

function connect_error(){
    console.log("Connect Error");
    chatClientStore.disconnected();

    // reconnect after a second
    setTimeout(()=>{
        client.connect();
    }
    , 1000);

}

function disconnected(){
    console.log("failed to connect to socket server");
    chatClientStore.disconnected();
}

function connecting(){
    console.log("Connecting to socket server");
    chatClientStore.connecting();
}

function message_from_room({id, user, message, timestamp}){
    channelStore.appendMessage({id, user, message, timestamp});
}

function message_from_server({message, timestamp}){
    console.log("RECEIEVD", message, timestamp);
    const newMessage = {
        id: "server"+timestamp,
        user:{
            name: "Server",
        },
        message,
        timestamp,
        fromServer: true
    }

    channelStore.appendMessage(newMessage);

}



client.subscribe('update_rooms', updateRooms);
client.subscribe('other_user_joined_room', updateUsersInRoom);
client.subscribe('other_user_left_room', updateUsersInRoom);
client.subscribe('message_from_room', message_from_room)
client.subscribe('join_room_success', updateCurrentRoom);
client.subscribe('connected', connected);
client.subscribe('disconnected', disconnected);
client.subscribe('connect_error', connect_error);
client.subscribe('connecting', connecting)
client.subscribe('message_from_server', message_from_server);


client.setUrl(import.meta.env.VITE_SOCKETSERVER); 


export function setupClient(token){
    client.setToken(token);
}

export function connectIfNotConnected(){
    if(!client.isConnected()){
        client.connect();
    }
}

export default client;