import { defineStore } from "pinia";
import stringSimilarity  from 'string-compare';
import fakerGenerateChannels from '../test_helpers/generateChannels'

let fchannels = fakerGenerateChannels(10);
fchannels[0].channelId = "testing";

const useChannels = defineStore('channels',{
    
    state: () => {
        return {
            channelList: fchannels,
            currentChannel: null,
            currentChannelMessages: [],
        }
    },

    getters: {
        searchChannel: state => {
            return (channelName) => {
                if (channelName.trim() === "") {
                    return state.channelList;
                  }
                return state.channelList.filter(channel => stringSimilarity(channel.name, channelName) >= 0.5);
            }
        }
    },

    actions: {
        setChannelList(channels){
            this.channelList = channels;
        },

        setCurrentChannel(channel){
            let currentChannelId = this.currentChannel && this.currentChannel.id;
            if(channel.channelId === currentChannelId) return;
            this.currentChannel = channel;
            this.clearMessages();
        },

        appendMessage(message){
            // if greater than 100, remove first message
            if(this.currentChannelMessages.length >= 100){
                this.currentChannelMessages.shift();
            }
            this.currentChannelMessages.push(message);
            
        },

        clearMessages(){
            this.currentChannelMessages = [];
        }
    }


})


export default useChannels;