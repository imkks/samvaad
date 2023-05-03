import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:4000?userId=4c74fd91-036e-4a85-9ecd-94f9ba08a249';

export const socket = io(URL,
    {
        autoConnect:false,
        withCredentials:true,
        // extraHeaders:{
        //     Cookie:"Authentication=adka"
        // }
    }
    // { transports : ['websocket']}
    );