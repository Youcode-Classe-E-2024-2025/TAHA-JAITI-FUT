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
};

const addForm = document.getElementById('addForm');

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
    clubImage: document.querySelector('#clubImageInput'),
    flagImage: document.querySelector('#flagImageInput'),
    playerImage: document.querySelector('#photoInput'),
};

console.log(addInputs);

document.querySelector('#addBtn').addEventListener('click', (e) => {
    e.preventDefault();

    const oldMsg = document.querySelectorAll('.error-msg');
    oldMsg.forEach((error) => error.remove());

    let isValid = true;

    Object.entries(addInputs).forEach(([key, input]) => {
        const errorMsg = document.createElement('p');
        errorMsg.classList.add('text-red-500', 'error-msg');

        if (!input.value && input.type !== 'file') {
            errorMsg.textContent = `Error: ${key} cannot be empty.`;
            input.parentElement.appendChild(errorMsg);
            isValid = false;
        } else if (key === 'name' && !/^[a-zA-Z\s]+$/.test(input.value)) {
            errorMsg.textContent = 'Error: Enter a valid name (letters and spaces only).';
            input.parentElement.appendChild(errorMsg);
            isValid = false;
        } else if (key === 'pace' || key === 'shooting' || key === 'passing' ||
                   key === 'dribbling' || key === 'defending' || key === 'physical') {
            if (input.value < 0 || input.value > 100) {
                errorMsg.textContent = `Error: ${key} must be between 0 and 100.`;
                input.parentElement.appendChild(errorMsg);
                isValid = false;
            }
        } else if (input.type === 'file' && !input.files.length) {
            errorMsg.textContent = `Error: Please upload a file for ${key}.`;
            input.parentElement.appendChild(errorMsg);
            isValid = false;
        }

        setTimeout(() => {
            errorMsg.remove();
        },7000);
    });

    if (isValid) {
        console.log('Form submitted successfully!');
    }
    
});




document.addEventListener('DOMContentLoaded', fetchData)