import validateLobby from "../../functions/validateLobby";

export default function checkLobbyCode(code: string, callback: Function) {
    code = code?.toLowerCase();
    
    if (validateLobby(code) === false) return callback(false);

    callback(true);
}
