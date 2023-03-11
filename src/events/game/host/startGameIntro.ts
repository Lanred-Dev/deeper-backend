import { Server, Socket } from "socket.io";
import lobbies, { player } from "../../../lobbies";
import shuffle from "../../../functions/shuffle";

export default function startGameIntro(socketServer: Server, socket: Socket) {
    if (lobbies[socket.data.lobby.code].gameData.isStarted === true || lobbies[socket.data.lobby.code].players.length < 3) return;

    lobbies[socket.data.lobby.code].gameData.isStarted = true;
    lobbies[socket.data.lobby.code].gameData.roles = {
        crim: null,
        investigator: null,
        owner: null,
        police: [],
    };
    socketServer.to(socket.data.lobby.code).emit("gameEvent", "startIntro");

    shuffle(lobbies[socket.data.lobby.code].players);
    lobbies[socket.data.lobby.code].players.forEach((player: player) => {
        if (lobbies[socket.data.lobby.code].gameData.roles.crim === null) {
            player.role = "crim";
            lobbies[socket.data.lobby.code].gameData.roles.crim = player.socketID;
        } else if (lobbies[socket.data.lobby.code].gameData.roles.investigator === null) {
            player.role = "investigator";
            lobbies[socket.data.lobby.code].gameData.roles.investigator = player.socketID;
        } else if (lobbies[socket.data.lobby.code].gameData.roles.owner === null) {
            player.role = "owner";
            lobbies[socket.data.lobby.code].gameData.roles.owner = player.socketID;
        } else {
            player.role = "police";
            lobbies[socket.data.lobby.code].gameData.roles.police.push(player.socketID);
        }
    });
}
