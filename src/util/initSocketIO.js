import io from 'socket.io-client';

const URL_BASE = process.env.REACT_APP_API_URL;
//const URL_BASE = process.env.REACT_APP_API_URL_LOCAL;

function initSocket(event, callback) {
    const socket = io(URL_BASE);
    socket.on(event, (data) => {
        callback(data);
    });
}

export default initSocket;