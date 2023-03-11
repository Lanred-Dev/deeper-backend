import { Socket } from "socket.io";
import lobbies, { playerIcons as validPlayerIcons, player } from "../../../lobbies";
import validateLobby from "../../../functions/validateLobby";

function validateUsername(username: string, code: string) {
    const containsUsername: boolean =
        lobbies[code].players.filter((player: player) => {
            return player.username === username;
        }).length === 0
            ? false
            : true;

    if (typeof username !== "string" || username.length > 15 || containsUsername === true) return false;

    return true;
}

function getPlayerIcon(players: Array<player>) {
    const takenPlayerIcons: Array<string> = players.map((player: player) => {
        return player.icon;
    });
    const playerIcons: Array<string> = [...validPlayerIcons].filter((icon: string) => {
        return !takenPlayerIcons.includes(icon);
    });

    return playerIcons[Math.floor(Math.random() * playerIcons.length)];
}

export default function joinLobby(socket: Socket, code: string, username: string, callback: Function) {
    code = code?.toLowerCase();
    username = username?.toLowerCase();

    if (validateLobby(code) === false || validateUsername(username, code) === false) return callback(false);

    socket.data.username = username;
    socket.data.lobby = {
        code,
        isHost: false,
    };

    const player: player = {
        username,
        icon: getPlayerIcon(lobbies[code].players),
        socketID: socket.id,
        role: "",
    };

    lobbies[code].players.push(player);
    lobbies[code].host?.emit("gameEvent-host", "playerJoin", { username: player.username, icon: player.icon }, lobbies[code].players.length);
    callback(true);
    socket.join(code);
    socket.emit("gameEvent", "lobby");
}
