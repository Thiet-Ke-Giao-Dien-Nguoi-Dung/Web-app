const URL_BASE = process.env.REACT_APP_API_URL_LOCAL;

import io from 'socket.io-client';

function initSocket(event, callback) {
    console.log("Run");
    const socket = io(URL_BASE);
    socket.on(event, (data) => {
        callback(data);
    });
}

export default initSocket;