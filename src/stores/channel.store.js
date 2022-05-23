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
            this.currentChannel = channel;
        }
    }


})


export default useChannels;