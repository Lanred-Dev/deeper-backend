import lobbies from "../lobbies";

export default function addObjective(lobbyCode: string, objectiveID: string, objective: string) {
    lobbies[lobbyCode].gameData.objectives[objectiveID] = objective;
    lobbies[lobbyCode].host?.emit("gameEvent-host", "updateObjectives", lobbies[lobbyCode].gameData.objectives);
}
