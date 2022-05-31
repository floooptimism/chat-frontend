import { defineStore } from "pinia";
import stringSimilarity  from 'string-compare';
import fakerGenerateChannels from '../test_helpers/generateChannels'

const useChannels = defineStore('channels',{
    
    state: () => {
        return {
            channelList: fakerGenerateChannels(10),
            currentChannel: null,
        }
    },

    getters: {
        searchChannel: state => {
            return (channelName) => {
                if (channelName.trim() === "") {
                    return state.channelList;
                  }
                return state.channelList.filter(channel => stringSimilarity(channel.channelName, channelName) >= 0.5);
            }
        }
    },

    actions: {
        setChannelList(channels){
            this.channelList = channels;
        },

        setCurrentChannel(channel){
            let currentChannelId = this.currentChannel && this.currentChannel.channelId;
            if(channel.channelId === currentChannelId) return;
            this.currentChannel = channel;
            this.clearMessages();
        },

        appendMessage(message){
            this.currentChannelMessages.push(message);
        },

        clearMessages(){
            this.currentChannelMessages = [];
        }
    }


})


export default useChannels;