

//check for existing players with the same pos
export const fetchExistingPlayers = (targetPos) => {
    let data = JSON.parse(localStorage.getItem("players") || "[]");
    let arr = [];
    insertContainer.innerHTML = "";

    data.forEach((players) => {
        let existingCard = formationContainer.querySelector(`#plr${players.id}`);

        if ((players.position === targetPos && !existingCard)) {
            arr.push(players);
        }
    });

    return arr;
};

export const fetchPlayersInTeam = () => {
    let data = JSON.parse(localStorage.getItem("players") || "[]");
    let arr = [];

    data.forEach((players) => {
        let existingCard = formationContainer.querySelector(`#plr${players.id}`);

        if ((!existingCard)) {
            arr.push(players);
        }
    });

    return arr;
}