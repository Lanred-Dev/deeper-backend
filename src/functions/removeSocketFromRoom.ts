import { Socket } from "socket.io";
import { socketServer } from "../io";
import lobbies, { player } from "../lobbies";

export default function removeSocketFromRoom(socket: Socket, playerUsername: string): player {
    const code: string = socket.data.lobby.code;
    const playerToRemove: player = lobbies[code].players.find((player: player) => player.username === playerUsername) as player;
    
    socketServer.sockets.sockets.get(playerToRemove?.socketID)?.leave(code);
    lobbies[code].players = lobbies[code].players.filter((player: player) => player.username !== playerUsername);

    if (lobbies[code].gameData.isStarted !== true) lobbies[code].host?.emit("gameEvent-host", "playerLeave", playerUsername, lobbies[code].players.length);

    return playerToRemove;
}
