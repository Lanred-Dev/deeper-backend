import { Socket } from "socket.io";
import removeSocketFromRoom from "../../../functions/removeSocketFromRoom";

export default function leaveLobby(socket: Socket) {
    removeSocketFromRoom(socket, socket.data.username);
}
