import { createApp } from 'vue'
import App from './App.vue'
import './global.css';
import useChannels from './stores/channel';

// Vue Plugins
import { createPinia } from 'pinia';

// devtools plugin
// import FlashUpdates from 'vue-devtool-flash-updates';


const app = createApp(App);

app.use(createPinia());
// app.use(FlashUpdates);

window.store = {};
window.store.channels = useChannels();


app.mount('#app');
