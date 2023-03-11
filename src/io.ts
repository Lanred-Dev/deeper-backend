import { Server, Socket } from "socket.io";
import { info } from "@lanred/basic-logger";

import checkLobbyCode from "./events/socket/checkLobbyCode";
import disconnect from "./events/socket/disconnect";

import createLobby from "./events/socket/host/createLobby";
import joinLobbyHost from "./events/socket/host/joinLobby";
import gameEvent from "./events/socket/host/gameEvent";

import joinLobby from "./events/socket/player/joinLobby";
import leaveLobby from "./events/socket/player/leaveLobby";

function handleSocketEvent(event: string, handler: Function, socket: Socket, ...customData: any[]) {
    socket.on(event, (...eventData: any[]) => {
        info("handling event\n", event, "\n", ...eventData)
        handler(...customData, ...eventData);
    });
}

export let socketServer: Server = {} as Server;

export default function io(webSocketServer: Server) {
    socketServer = webSocketServer;

    socketServer.on("connection", (socket: Socket) => {
        socket.data.lobby = {
            code: null,
            isHost: false,
        };
        socket.data.username = null;
        socket.data.token = null;

        handleSocketEvent("checkLobbyCode", checkLobbyCode, socket);
        handleSocketEvent("disconnect", disconnect, socket, socket);

        //lobby events
        handleSocketEvent("createLobby", createLobby, socket);
        handleSocketEvent("joinLobby-host", joinLobbyHost, socket, socket);

        handleSocketEvent("joinLobby", joinLobby, socket, socket);
        handleSocketEvent("leaveLobby", leaveLobby, socket, socket);

        //game events
        handleSocketEvent("gameEvent-host", gameEvent, socket, socket);
    });
}
