import ChatClient from "./ChatClient";
import pinia from "../../stores/piniaInstance";

// * Stores
import useChannelStore from "../../stores/channel.store";
import useUsersInChannelStore from "../../stores/usersInChannel.store";
import useChatClientStateStore from "../../stores/chatClient.store";

const client = new ChatClient();
const channelStore = useChannelStore(pinia);
const usersInChannelStore = useUsersInChannelStore(pinia);
const chatClientStore = useChatClientStateStore(pinia);

window.chatClient = chatClientStore;

function updateRooms(rooms) {
  channelStore.setChannelList(rooms);
}

function updateUsersInRoom({ users, newUser, userThatLeft }) {
  usersInChannelStore.updateUsers(users);
}

function updateCurrentRoom({ roomID }) {
  channelStore.setCurrentChannel(roomID);
}

function connected() {
  console.log("Succesfully connected to socket server");
  chatClientStore.connected();
}

function disconnected() {
  console.log("failed to connect to socket server");
  chatClientStore.disconnected();
}

client.subscribe("update_rooms", updateRooms);
client.subscribe("other_user_joined_room", updateUsersInRoom);
client.subscribe("other_user_left_room", updateUsersInRoom);
client.subscribe("join_room_success", updateCurrentRoom);
client.subscribe("connected", connected);
client.subscribe("disconnected", disconnected);

export function setupClient(token, username) {
  client.setToken(token);
  client.setUsername(username);
  client.setUrl("http://localhost:3001");
}

export function connectIfNotConnected() {
  if (!client.isConnected()) {
    chatClientStore.connecting();
    client.connect();
  }
}

export default client;
