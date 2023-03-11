import { Socket } from "socket.io";
import validateLobby from "../../../functions/validateLobby";
import lobbies from "../../../lobbies";

export default function joinLobby(socket: Socket, code: string, token: string, callback: Function) {
    if (validateLobby(code, true) === false || lobbies[code]?.token !== token) return callback(false);

    socket.data = {
        token,
        lobby: {
            code,
            isHost: true,
        },
    };
    lobbies[code].host = socket;
    callback(true, lobbies[code].players);
    socket.join(code);
}
