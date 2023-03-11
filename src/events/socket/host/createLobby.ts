import generateRandomString from "../../../functions/generateRandomString";
import lobbies from "../../../lobbies";

export default function createLobby(callback: Function) {
    const code: string = generateRandomString(4);
    const token: string = generateRandomString(15);

    lobbies[code] = {
        token,
        code,
        host: null,
        players: [],
        gameData: {
            isStarted: false,
            state: "preGame",
            votes: {},
        },
    };

    callback(code, token);
}
