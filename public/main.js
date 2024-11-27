const loading = document.getElementById('loadingScreen');
let data = JSON.parse(localStorage.getItem("players") || "[]");

let nextId = data.length > 0 ? data.length + 1 : 1;


const fetchData = async () => {
    if (data.length === 0 && !localStorage.getItem("players_loaded")) {
        try {
            const response = await axios.get('./players.json');
            if (response.data && response.data.players) {
                data = response.data.players;
                localStorage.setItem("players", JSON.stringify(data));
                localStorage.setItem("players_loaded", "true");
                console.log(data);
                loading.classList.add('hidden');
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    } else {
        loading.classList.add('hidden');
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
};

const formationContainer = document.getElementById('#formationContainer');
const addForm = document.getElementById('addForm');
const closeAdd = addForm.querySelector('#closeAdd');
const openAdd = document.getElementById('openAdd');
const allPlayers = document.querySelector('#allPlayersContainer');
const closeAll = document.querySelector('#closeAll');
const openAll = document.getElementById('openAll');
const plrDisplay = document.getElementById('plrDisplay');
const closeDisplay = document.querySelector('#closeDisplay');
const closeInsert = document.querySelector("#closeInsert");
const insertContainer = document.getElementById('insertContainer');
const emptyCard = document.querySelectorAll('.emptyCard');

const removePlr = document.querySelector('#removePlr');
const changePlr = document.querySelector('#changePlr');

const addInputs = {
    name: document.querySelector('#nameInput'),
    nationality: document.querySelector('#natioInput'),
    club: document.querySelector('#clubInput'),
    position: document.querySelector('#positionInput'),
    pace: document.querySelector('#paceInput'),
    shooting: document.querySelector('#shootingInput'),
    passing: document.querySelector('#passingInput'),
    dribbling: document.querySelector('#dribblingInput'),
    defending: document.querySelector('#defendingInput'),
    physical: document.querySelector('#physicalInput'),
    logo: document.querySelector('#clubImageInput'),
    flag: document.querySelector('#flagImageInput'),
    photo: document.querySelector('#photoInput'),
    rating: document.querySelector('#ratingInput'),
};

const displayValues = {
    name: document.querySelector('.displayName'),
    position: document.querySelector('.displayPos'),
    pace: document.querySelector('.displayPAC'),
    shooting: document.querySelector('.displaySHO'),
    passing: document.querySelector('.displayPAS'),
    dribbling: document.querySelector('.displayDRI'),
    defending: document.querySelector('.displayDEF'),
    physical: document.querySelector('.displayPHY'),
    logo: document.querySelector('.displayClub'),
    flag: document.querySelector('.displayFlag'),
    photo: document.querySelector('.displayPhoto'),
    rating: document.querySelector('.displayRating'),
}

const searchInput = document.querySelector('#playerSearch');

closeDisplay.addEventListener('click', () => {
    closeDisplay.parentElement.parentElement.classList.toggle('hidden');
})

closeAdd.addEventListener('click', () => {
    addForm.parentElement.classList.toggle('hidden');
});

openAdd.addEventListener('click', () => {
    addForm.parentElement.classList.toggle('hidden');
})

closeAll.addEventListener('click', () => {
    allPlayers.parentElement.parentElement.classList.toggle('hidden');
});

openAll.addEventListener('click', async () => {
    await loadPlayers(data, allPlayers);
    allPlayers.parentElement.parentElement.classList.toggle('hidden');
})

closeInsert.addEventListener('click', () => {
    insertContainer.parentElement.parentElement.classList.toggle('hidden');
})

document.querySelector('#addBtn').addEventListener('click', async (e) => {
    e.preventDefault();

    const oldMsg = document.querySelectorAll('.error-msg');
    oldMsg.forEach((error) => error.remove());

    let isValid = true;

    Object.entries(addInputs).forEach(([key, input]) => {
        let errorText = null;
        const validateInputs = () => {
            if (!input.value && input.type !== 'file' && !key === 'id') {
                return `${key} can't be empty.`;
            }
            if (key === 'name' && !/^[a-zA-Z\s]{1,20}$/.test(input.value)) {
                return 'Enter a valid name (20 characters or less).';
            }
            if (['pace', 'shooting', 'passing', 'dribbling', 'defending', 'physical', 'rating'].includes(key)) {
                if (input.value < 0 || input.value > 100) {
                    return `${key} must be between 0 and 100.`;
                }
            }
            if (key === 'position') {
                const validPositions = ['ST', 'LW', 'RW', 'CDM', 'CAM', 'CM', 'RM', 'LM', 'CB', 'RB', 'LB', 'GK'];
                if (!validPositions.includes(input.value.toUpperCase())) {
                    return `Select a valid position.`;
                }
            }
            if (input.type === 'file' && !input.files.length) {
                return `Please upload a file for ${key}.`;
            }
            return null;
        };
        errorText = validateInputs();

        if (errorText) {
            const errorMsg = document.createElement('p');
            errorMsg.textContent = `Error: ${errorText}`;
            errorMsg.classList.add('text-red-500', 'error-msg');
            input.parentElement.appendChild(errorMsg);
            isValid = false;

            setTimeout(() => {
                errorMsg.remove();
            }, 7000);
        }
    });

    if (isValid) {
        isValid = false;
        const newPlayer = {};

        newPlayer.id = nextId++;

        for (const [key, input] of Object.entries(addInputs)) {
            if (input.type === 'file' && input.files.length > 0) {
                newPlayer[key] = await convertToBase64(input.files[0]);
            } else {
                newPlayer[key] = input.value;
            }
        }
        data.push(newPlayer);
        localStorage.setItem('players', JSON.stringify(data));
        await loadPlayers(data, allPlayers);

        const succedMsg = document.createElement('p');
        succedMsg.className = "text-lime-green text-center error-msg font-bold text-xl";
        succedMsg.textContent = 'Player Added Succesfully!';
        addForm.insertBefore(succedMsg, addForm.firstChild);
        setTimeout(() => { succedMsg.remove(); }, 5000);

        Object.values(addInputs).forEach((input) => { input.value = ''; });
    }
});

function convertToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};

const loadPlayers = (players, container) => {
    return new Promise((resolve) => {
        container.innerHTML = "";
        players.forEach(player => {
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

            container.innerHTML += `
                <!-- PLAYER CARD -->
                <div data-id="${player.id}" data-pos="${player.position}" class="player notSelected bg-gold-card m-0 text-black">
                    <div class="w-fit font-semibold absolute top-6 left-2">
                        <p>${player.rating}</p>
                        <p>${player.position}</p>
                    </div>
                    <img class="h-1/2 mt-7" src="${player.photo}" alt="">
                    <p>${player.name}</p>
                    <div class="flex text-xs gap-1">
                        ${stats} <!-- Dynamic stats block -->
                    </div>
                    <div class="flex items-center gap-1">
                        <img class="h-4" src="${player.flag}" alt="">
                        <img class="h-5 object-fill" src="${player.logo}" alt="">
                    </div>
                </div>
            `;
        });

        resolve();
    });
};

const posArray = [];
let selectedPlayer;
let targetCard;
let currentTarget;
let displayedPlr;
let displayedPlrDiv;

emptyCard.forEach((card) => {
    card.addEventListener('click', async (e) => {
        e.preventDefault();
        currentTarget = e.currentTarget;
        targetCard = e.target.dataset.pos;

        loading.classList.toggle('hidden');
        await fetchExistingPlayers(targetCard);
        await loadPlayers(posArray, insertContainer);

        setTimeout(() => {
            loading.classList.add('hidden');
            insertContainer.parentElement.parentElement.classList.remove('hidden');
        }, 100);

        const playerCards = insertContainer.querySelectorAll('.notSelected');

        playerCards.forEach((playerCard) => {
            playerCard.addEventListener('click', () => {
                playerCards.forEach((card) => card.classList.remove('selectedCard'));
                playerCard.classList.add('selectedCard');
                selectedPlayer = playerCard.dataset.id;
            });
        });

        const insertBtn = document.querySelector('#insertBtn');
        insertBtn.addEventListener('click', applyInsert);
    });
});

const fetchExistingPlayers = (targetPos) => {
    return new Promise((resolve) => {
        posArray.splice(0, posArray.length);
        console.log(targetPos);
        data.forEach((players) => {
            let existingCard = document.querySelector(`#plr${players.id}`);
            if (existingCard) {
                return;
            }
            if (players.position === targetPos) {
                posArray.push(players);
            }
        });

        resolve();
    });
}

let inTeam = document.querySelectorAll('.inTeam');

const applyInsert = (e) => {
    e.preventDefault();
    let playerData = posArray.find(plr => String(plr.id) === selectedPlayer);

    currentTarget.innerHTML = `
                <!-- PLAYER CARD -->
                <div id="plr${playerData.id}" data-id="${playerData.id}" data-pos="${playerData.position}" class="player inTeam bg-gold-card m-0 text-black">
                    <div class="w-fit font-semibold absolute top-6 left-2">
                        <p>${playerData.rating}</p>
                        <p>${playerData.position}</p>
                    </div>
                    <img class="h-1/2 mt-7" src="${playerData.photo}" alt="">
                    <p>${playerData.name}</p>
                    <div class="flex text-xs gap-1">
                        <p>PAC ${playerData.pace}</p>
                        <p>SHO ${playerData.shooting}</p>
                        <p>DRI ${playerData.dribbling}</p>
                        <p>PAS ${playerData.passing}</p>
                        <p>DEF ${playerData.defending}</p>
                        <p>PHY ${playerData.physical}</p>
                    </div>
                    <div class="flex items-center gap-1">
                        <img class="h-4" src="${playerData.flag}" alt="">
                        <img class="h-5 object-fill" src="${playerData.logo}" alt="">
                    </div>

                </div>
        `
    displayedPlrDiv = currentTarget;

    insertContainer.parentElement.parentElement.classList.toggle('hidden');

    inTeam = document.querySelectorAll('.inTeam');
    console.log(inTeam);
    inTeam.forEach((player) => {
        player.addEventListener('click', (event) => {
            event.stopPropagation();

            displayedPlr = data.find(plr => String(plr.id) === event.currentTarget.dataset.id);
            console.log(displayedPlr);

            const shortStat = {
                pace: 'PAC',
                shooting: 'SHO',
                dribbling: 'DRI',
                passing: 'PAS',
                defending: 'DEF',
                physical: 'PHY',
            };

            Object.keys(displayValues).forEach(key => {
                if (Object.keys(shortStat).includes(key)) {
                    displayValues[key].textContent = `${shortStat[key]} ${displayedPlr[key]}`;
                } else if (key === 'photo' || key === 'flag' || key === 'logo') {
                    displayValues[key].src = displayedPlr[key];
                } else {
                    displayValues[key].textContent = displayedPlr[key];
                }
            });

            plrDisplay.classList.remove('hidden');
        })
    })
};

removePlr.addEventListener('click', (e) => {
    e.stopPropagation();
    displayedPlrDiv.innerHTML = `<span class="icon-[gg--add] text-4xl text-lime-green ">
                                </span><p class="font-bold">${displayedPlr.position}</p>`;

    plrDisplay.classList.add('hidden');
});

changePlr.addEventListener('click', (e) => {
    e.stopPropagation();

    fetchExistingPlayers(displayedPlr.position);
    loadPlayers(posArray, insertContainer);
    plrDisplay.classList.add('hidden');

    const insertPlr = insertContainer.querySelectorAll('.notSelected');
    console.log(insertPlr);

    insertPlr.forEach((plr) => {
        console.log(plr);
        plr.addEventListener('click', () => {
            console.log('clicked');
            insertPlr.forEach((card) => card.classList.remove('selectedCard'));
            plr.classList.add('selectedCard');
            selectedPlayer = plr.dataset.id;
        });
    });

    insertContainer.parentElement.parentElement.classList.remove('hidden');
});

searchInput.addEventListener('keyup', (e) => {
    e.stopPropagation();

    if (e.target.value === "") {
        return
    } else {
        timeout = setTimeout(() => {
            const searchData = e.target.value.toLowerCase();

            const filtered = data.filter(o => o.name.toLowerCase().includes(searchData));

            loadPlayers(filtered, allPlayers);
        }, 250);
    }
});

document.addEventListener('DOMContentLoaded', fetchData)