import lobbies from "../lobbies";

export function validateCode(code: string): boolean {
    if (typeof code !== "string" || code.length !== 4 || lobbies[code] === undefined || lobbies[code] === null) return false;

    return true;
}

export default function validateLobby(code: string, isHost: boolean = false): boolean {
    if (validateCode(code) === false || lobbies[code].gameData.isStarted === true) return false;
    if (isHost === false && lobbies[code].players.length >= 9) return false;

    return true;
}
