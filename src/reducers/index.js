// get io from socket.io-client module
import { io } from 'socket.io-client';
// establish socket connection to the jeopardy server
const socket = io('https://jeopardygamebackend.herokuapp.com/');
// const socket=io('http://localhost:7000')

// export the socket object
export default () => socket;