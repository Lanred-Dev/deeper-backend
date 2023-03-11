import { Server, Socket } from "socket.io";
import lobbies, { player } from "../../../lobbies";
import startGame from "./startGame";

export default function presentPlayerRoles(socketServer: Server, hostSocket: Socket) {
    const playersConfirmed: Array<string> = [];

    lobbies[hostSocket.data.lobby.code].players.forEach(({ socketID, role }: player) => {
        const socket: Socket = socketServer.sockets.sockets.get(socketID)!;
        socket.emit("gameEvent", "presentRole", role);

        socket.on("confirmRole", () => {
            if (playersConfirmed.includes(socketID)) return;

            socket.removeAllListeners("confirmRole");
            playersConfirmed.push(socketID);

            if (playersConfirmed.length === lobbies[hostSocket.data.lobby.code].players.length) startGame(socketServer, hostSocket.data.lobby.code);
        });
    });
}
