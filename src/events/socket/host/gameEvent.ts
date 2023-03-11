import { Socket } from "socket.io";
import { socketServer } from "../../../io";

import startGameIntro from "../../game/host/startGameIntro";
import presentPlayerRoles from "../../game/host/presentPlayerRoles";
import kickPlayer from "../../game/host/kickPlayer";
import startPoll from "../../game/host/startPoll";

export default function gameEvent(socket: Socket, event: string, ...eventData: any[]) {
    if (socket.data.lobby.isHost === false) return;

    switch (event) {
        case "startPoll":
            return startPoll();
        case "kickPlayer":
            return kickPlayer(socket, ...(eventData as [string]));
        case "startGameIntro":
            return startGameIntro(socketServer, socket);
        case "presentPlayerRoles":
            return presentPlayerRoles(socketServer, socket);
    }
}
