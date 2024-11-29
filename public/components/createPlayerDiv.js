export const createPlayerDiv = (player) => {
    const stats = player.position === 'GK'
        ? `
                        <p>DIV ${player.diving}</p>
                        <p>HAN ${player.handling}</p>
                        <p>KIC ${player.kicking}</p>
                        <p>REF ${player.reflexes}</p>
                        <p>SPE ${player.speed}</p>
                        <p>POS ${player.positioning}</p>
                      `
        : `
                        <p>PAC ${player.pace}</p>
                        <p>SHO ${player.shooting}</p>
                        <p>DRI ${player.dribbling}</p>
                        <p>PAS ${player.passing}</p>
                        <p>DEF ${player.defending}</p>
                        <p>PHY ${player.physical}</p>
                      `;

    const newDiv = document.createElement('div');
    newDiv.innerHTML = `<div class="w-fit font-semibold absolute top-6 left-2">
                            <p>${player.rating}</p>
                            <p>${player.position}</p>
                        </div>
                        <img class="h-1/2 mt-7" src="${player.photo}" alt="">
                        <p>${player.name}</p>
                        <div class="flex text-xs gap-1">
                            ${stats}
                        </div>
                        <div class="flex items-center gap-1">
                            <img class="h-4" src="${player.flag}" alt="">
                            <img class="h-5 object-fill" src="${player.logo}" alt="">
                        </div>`

    newDiv.className = "player inTeam notSelected bg-gold-card m-0 text-black";
    newDiv.setAttribute('data-pos',player.position);
    newDiv.setAttribute('data-id',player.id);
    newDiv.id = `plr${player.id}`;

    return newDiv;
};

