import { Server } from "socket.io";
import lobbies from "../../../lobbies";

export default function startGame(socketServer: Server, lobbyCode: string) {
    lobbies[lobbyCode].gameData.startTime = new Date();
    socketServer.to(lobbyCode).emit("gameEvent", "startGame");
}
