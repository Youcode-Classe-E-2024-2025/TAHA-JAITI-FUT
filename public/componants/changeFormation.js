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

export const changeFormation = (formationValue) => {
    const formation = formations[formationValue];
    const container = document.querySelector("#formaaaa");

    container.innerHTML = "";

    formation.forEach((player) => {
        const playerDiv = document.createElement('div');

        let classes = `col-start-${player.col} row-start-${player.row} emptyCard centered bg-card`;

        if (player.span > 1) {
            classes += ` col-span-${player.span}`;
        }
        if (player.position === "RB" || player.position === "LB" || player.position === "LW"
            || player.position === "RW" || player.position === "RM" || player.position === "LM") {
            classes += ' mb-12';
        }

        playerDiv.className = classes;
        playerDiv.innerHTML = `<span class="icon-[gg--add] text-4xl text-lime-green "></span>
                                <p class="font-bold">${player.position}</p>`;

        playerDiv.setAttribute('data-pos', player.position);
        container.appendChild(playerDiv);
    });
};