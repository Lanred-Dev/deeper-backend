import { Socket } from "socket.io";

export type player = {
    username: string,
    icon: string,
    socketID: string,
    role?: string,
}

export type lobby = {
    token: string,
    code: string,
    host: Socket | null,
    players: Array<player>,
    gameData: {[key: string]: any},
}

export const playerIcons = ["rocket", "scholar", "beaker", "briefcase", "map", "scale", "engineer", "newspaper", "light"];

export let lobbies: {[key: string]: lobby} = {};

export default lobbies;