import { io } from 'socket.io-client';
const socket = io('https://jeopardygamebackend.herokuapp.com/');

export default () => socket;