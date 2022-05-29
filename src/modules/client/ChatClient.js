import {io} from 'socket.io-client';


/**
 * Client for the chat socket server
 * Client is it's own event system.
 * Modules can listen for events coming from client.
 * Check the property `events` in the module to see what events are available
 */

class ChatClient{
    /**
     * 
     * @param {string} url - the url of the socket server
     * @param {string} username - the username of the client
     * @param {string} token - the token of the client
     */
    constructor(url, username, token){
        /** @property {string} username - Client username */
        this.username = username;
        /** @property {string} token - Client token for authentication to the socket server */
        this.token = token;
        /** @property {Array} rooms_list - Stores all the current rooms the socket server has */
        this.rooms = [];
        /** @property {Array} usersInRoom - Stores all the users in the current room the client is in  */
        this.usersInRoom = [];
        /** @property {string} url - URL of the socket server */
        this.url = url;
        this.currentRoom = null;

        /**
         * @property {object} io - The Socket.io client object
         */
        this.io = null;

        /**
         * @property {object} events  - a map of event names to callback functions
         */
        this.events = {
            message_from_room: [],          // Triggered when a message is received from a room
            update_rooms: [],               // Triggered when the list of rooms is updated
            other_user_joined_room: [],     // Triggered when a user joins a room
            other_user_left_room: [],       // Triggered when a user leaves a room
            join_room_success: [],          // Triggered when this client successfully joins a room
            connected: [],                  // Triggered when the client is connected to the socket server
            disconnected: [],                // Triggered when the client is disconnected from the socket server
            connect_error: [],
            connecting: []
        };

        /** @property {Boolean} connected - Indicates if the client is connnected or not */
        this.connected = false;
    }

    setUsername(username){
        this.username = username;
    }

    isConnected(){
        return this.connected;
    }

    setCurrentRoom(roomID){
        this.currentRoom(roomID);
    }

    setToken(token){
        this.token = token;
    }

    setUrl(url){
        this.url = url;
    }

    updateRooms(rooms){
        this.rooms = rooms;
    }

    updateUsersInRoom(users){
        this.usersInRoom = users;
    }

    /**
     * Connects to a socket server
     * @param {function} success - callback function to be called when the client is connected
     * @param {function} fail - callback function to be called when the client fails to connect
     */
    connect(success, fail){
        if(this.io){
            this.disconnect();
        }
        this.io = new io(this.url, {
            auth: {
                token: this.token
            },
            query: `username=${this.username}`
        });

        // Connecting
        this.notifySubscribers('connecting');

        let self = this;

        this.io.on('connect', () => {
            this.connected = true;
            this.notifySubscribers('connected', {});
            success && success();
        });
        this.io.on('connect_error', (error)=>{
            console.log("ChatClient -> Error:", error);
            this.disconnect();
            self.notifySubscribers('connect_error', {});
            fail && fail();
        });
        this.io.on('disconnect', () => {
            this.notifySubscribers('disconnected', {});
        });

        this.io.on('message_from_room', ({user, message}) => {
            self.notifySubscribers('message_from_room', {user, message});
        });
        this.io.on('update_rooms', (rooms) => {
            self.updateRooms(rooms);
            self.notifySubscribers('update_rooms', rooms);
        });

        this.io.on('other_user_joined_room', ({users, newUser}) => {
            self.updateUsersInRoom(users);
            self.notifySubscribers('other_user_joined_room', {users, newUser});
        });

        this.io.on('other_user_left_room', ({users, userThatLeft}) => {
            self.updateUsersInRoom(users);
            self.notifySubscribers('other_user_left_room', {users, userThatLeft});
        });

        this.io.on('join_room_success', ({roomID}) => {
            self.setCurrentRoom(roomID);
            self.notifySubscribers('join_room_success', {roomID})
        })
    }

    /**
     * Sends a message to a room the user is currently in
     * @param {string} message 
     */
    sendMessage(message){
        if(!this.currentRoom) return;
        this.io.emit('message_to_room', {
            message
        });
    }

    /**
     * Joins a room
     * @param {string} roomID 
     */
    joinRoom(roomID) {
        this.io.emit('join_room', {roomID});
    }

    /**
     * Will notify all subscribers of an event
     * @param {string} event 
     * @param {object} data 
     */
    notifySubscribers(event, data){
        for(let callback of this.events[event]){
            callback(data);
        }
    }

    /**
     * Subscribes to an event
     * @param {string} event - the event to subscribe to
     * @param {function} callback - the callback function to be called when the event is triggered
     * @returns {function} - a function to unsubscribe from the event
     */
    subscribe(event, callback){
        if(!this.events[event]){
            throw new Error("Event not found");
        }
        this.events[event].push(callback);

        return () => {
            this.events[event] = this.events[event].filter(cb => cb !== callback);
        }
    }

    /**
     * Disconnects from the socket server
     */
    disconnect(){
        this.io && this.io.disconnect();
        this.connected = false;
        this.io = null;
    }
}

export default ChatClient;