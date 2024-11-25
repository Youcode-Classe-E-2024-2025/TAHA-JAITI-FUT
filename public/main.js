let data = JSON.parse(localStorage.getItem("players") || "[]");

const fetchData = async () => {
    if (data.length === 0 && !localStorage.getItem("players_loaded")) {
        try {
            const response = await axios.get('https://raw.githubusercontent.com/aymanebenhima/FUT-Champ-Ultimate-Team-Assets/refs/heads/main/players.json');
            if (response.data && response.data.players) {
                data = response.data.players;
                localStorage.setItem("players", JSON.stringify(data));
                localStorage.setItem("players_loaded", "true");
                console.log(data);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
}


const formations = {
    "4-3-3": [
        { position: "LW", col: 1, row: 1, span: 1 },
        { position: "ST", col: 2, row: 1, span: 2 },
        { position: "RW", col: 4, row: 1, span: 1 },
        { position: "CM", col: 1, row: 2, span: 1 },
        { position: "CM", col: 2, row: 2, span: 2 },
        { position: "CM", col: 4, row: 2, span: 1 },
        { position: "LB", col: 1, row: 3, span: 1 },
        { position: "CB", col: 2, row: 3, span: 1 },
        { position: "CB", col: 3, row: 3, span: 1 },
        { position: "RB", col: 4, row: 3, span: 1 },
    ],
    "4-4-2": [
        { position: "ST", col: 2, row: 1, span: 1 },
        { position: "ST", col: 3, row: 1, span: 1 },
        { position: "LM", col: 1, row: 2, span: 1 },
        { position: "CM", col: 2, row: 2, span: 1 },
        { position: "CM", col: 3, row: 2, span: 1 },
        { position: "RM", col: 4, row: 2, span: 1 },
        { position: "LB", col: 1, row: 3, span: 1 },
        { position: "CB", col: 2, row: 3, span: 1 },
        { position: "CB", col: 3, row: 3, span: 1 },
        { position: "RB", col: 4, row: 3, span: 1 },
    ]
};

const changeFormation = (formationValue) => {
    const formation = formations[formationValue];
    const container = document.querySelector(".formation-container");

    container.innerHTML = "";

    formation.forEach((player) => {
        const playerDiv = document.createElement('div');

        let classes = `player col-start-${player.col} row-start-${player.row}`;

        if (player.span > 1) {
            classes += ` col-span-${player.span}`;
        }

        playerDiv.className = classes;
        playerDiv.textContent = player.position;
        container.appendChild(playerDiv);
    });
}



document.getElementById("formationSelector").addEventListener("change", (e) => {
    const selectedFormation = e.target.value;
    changeFormation(selectedFormation);
});

// Initialize with a default formation
changeFormation("4-4-2");



document.addEventListener('DOMContentLoaded', fetchData)