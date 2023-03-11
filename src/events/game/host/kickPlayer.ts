import { Socket } from "socket.io";
import { socketServer } from "../../../io";
import { player } from "../../../lobbies";
import removeSocketFromRoom from "../../../functions/removeSocketFromRoom";

export default function kickPlayer(socket: Socket, playerUsername: string) {
    const player: player = removeSocketFromRoom(socket, playerUsername);
    socketServer.sockets.sockets.get(player?.socketID)?.emit("kickedFromLobby");
}
