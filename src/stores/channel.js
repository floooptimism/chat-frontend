import { defineStore } from "pinia";
import stringSimilarity  from 'string-compare';

const useChannels = defineStore('channels',{
    
    state: () => {
        return {
            channelList: [],
            currentChannel: null,
        }
    },

    getters: {
        searchChannel: state => {
            return (channelName) => {
                if (channelName.trim() === "") {
                    return state.channelList;
                  }
                return state.channelList.filter(channel => stringSimilarity(channel.channelName, channelName) >= 0.6);
            }
        }
    },

    actions: {
        setChannelList(channels){
            this.channelList = channels;
        },

        setCurrentChannel(channel){
            this.currentChannel = channel;
        }
    }


})

export default useChannels;