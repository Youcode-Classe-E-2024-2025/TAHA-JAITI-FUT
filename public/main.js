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
    loadPlayers(data);
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

const addForm = document.getElementById('addForm');
const closeAdd = addForm.querySelector('#closeAdd');
const openAdd = document.getElementById('openAdd');
const allPlayers = document.getElementById('allPlayersContainer');
const closeAll = document.querySelector('#closeAll');
const openAll = document.getElementById('openAll');

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

closeAdd.addEventListener('click', () => {
    addForm.parentElement.classList.toggle('hidden');
});

openAdd.addEventListener('click', () => {
    addForm.parentElement.classList.toggle('hidden');
})

closeAll.addEventListener('click', () => {
    allPlayers.parentElement.parentElement.classList.toggle('hidden');
});

openAll.addEventListener('click', () => {
    allPlayers.parentElement.parentElement.classList.toggle('hidden');
})

console.log(addInputs);

document.querySelector('#addBtn').addEventListener('click', async (e) => {
    e.preventDefault();

    const oldMsg = document.querySelectorAll('.error-msg');
    oldMsg.forEach((error) => error.remove());

    let isValid = true;

    Object.entries(addInputs).forEach(([key, input]) => {
        let errorText = null;
        const validateField = () => {
            if (!input.value && input.type !== 'file') {
                return `${key} can't be empty.`;
            }
            if (key === 'name' && !/^[a-zA-Z\s]+$/.test(input.value)) {
                return 'Enter a valid name.';
            }
            if (['pace', 'shooting', 'passing', 'dribbling', 'defending', 'physical','rating'].includes(key)) {
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
        errorText = validateField();

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
        const newPlayer = {};

        for (const [key, input] of Object.entries(addInputs)) {
            if (input.type === 'file' && input.files.length > 0) {
                newPlayer[key] = await convertToWebp(input.files[0]);
            } else {
                newPlayer[key] = input.value;
            }
        }
        data.push(newPlayer);
        localStorage.setItem('players', JSON.stringify(data));
        loadPlayers(data);

        const succedMsg = document.createElement('p');
        succedMsg.className = "text-lime-green text-center error-msg font-bold text-xl";
        succedMsg.textContent = 'Player Added Succesfully!';
        addForm.insertBefore(succedMsg, addForm.firstChild);
        setTimeout(() => { succedMsg.remove(); }, 10000);

        Object.values(addInputs).forEach((input) => { input.value = ''; });
    }
});

function convertToWebp(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                const webpDataUrl = canvas.toDataURL('image/webp');
                resolve(webpDataUrl);
            };
            img.onerror = reject;
            img.src = reader.result;
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

const loadPlayers = (players) => {
    allPlayers.innerHTML = "";
    players.forEach((player) => {
        if (player.position === 'GK'){
            allPlayers.innerHTML += `
                    <!-- PLAYER CARD -->
                    <div data-pos="${player.position}" class="player bg-gold-card m-0 text-black">
                        <div class="w-fit font-semibold absolute top-6 left-2">
                            <p>${player.rating}</p>
                            <p>${player.position}</p>
                        </div>
                        <img class="h-1/2 mt-7" src="${player.photo}" alt="">
                        <p>${player.name}</p>
                        <div class="flex text-xs gap-1">
                            <p>DIV ${player.diving}</p>
                            <p>HAN ${player.handling}</p>
                            <p>KIC ${player.kicking}</p>
                            <p>REF ${player.reflexes}</p>
                            <p>SPE ${player.speed}</p>
                            <p>POS ${player.positioning}</p>
                        </div>
                        <div class="flex items-center gap-1">
                            <img class="h-4" src="${player.flag}" alt="">
                            <img class="h-5 object-fill" src="${player.logo}" alt="">
                        </div>

                    </div>
        `
        } else {
            allPlayers.innerHTML += `
                    <!-- PLAYER CARD -->
                    <div data-pos="${player.position}" class="player bg-gold-card m-0 text-black">
                        <div class="w-fit font-semibold absolute top-6 left-2">
                            <p>${player.rating}</p>
                            <p>${player.position}</p>
                        </div>
                        <img class="h-1/2 mt-7" src="${player.photo}" alt="">
                        <p>${player.name}</p>
                        <div class="flex text-xs gap-1">
                            <p>PAC ${player.pace}</p>
                            <p>SHO ${player.shooting}</p>
                            <p>DRI ${player.dribbling}</p>
                            <p>PAS ${player.passing}</p>
                            <p>DEF ${player.defending}</p>
                            <p>PHY ${player.physical}</p>
                        </div>
                        <div class="flex items-center gap-1">
                            <img class="h-4" src="${player.flag}" alt="">
                            <img class="h-5 object-fill" src="${player.logo}" alt="">
                        </div>

                    </div>
        `
        }
    })
}

document.addEventListener('DOMContentLoaded', fetchData)