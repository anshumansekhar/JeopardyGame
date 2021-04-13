// get io from socket.io-client module
import { io } from 'socket.io-client';
// establish socket connection to the jeopardy server
const socket = io('https://jeopardygamebackend.herokuapp.com/');

// export the socket object
export default () => socket;