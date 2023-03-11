import { Socket } from "socket.io";
import { validateCode } from "../../functions/validateLobby";
import removeSocketFromRoom from "../../functions/removeSocketFromRoom";

export default function disconnect(socket: Socket) {
    if (validateCode(socket.data.lobby.code) === false) return;

    removeSocketFromRoom(socket, socket.data.username);
}
