import { Server } from "socket.io";
import lobbies from "../../../lobbies";
import addObjective from "../../../functions/addObjective";

export default function startGame(socketServer: Server, lobbyCode: string) {
    lobbies[lobbyCode].gameData.startTime = new Date();
    socketServer.to(lobbyCode).emit("gameEvent", "startGame");
    addObjective(lobbyCode, "1", "explore the room");
}
