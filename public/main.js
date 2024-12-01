import { fetchData } from "./componants/fetch.js";
import { createPlayerDiv } from "./componants/createPlayerDiv.js";
import { loadPlayers } from "./componants/loadPlayers.js";
import { displayMsg } from "./componants/displayMsg.js";
import { validateInputs } from "./componants/validateInputs.js";
import { fetchExistingPlayers, fetchPlayersInTeam } from "./componants/fetchExistingPlayers.js";
import { display } from "./componants/displayHandler.js";
import { changeFormation } from "./componants/changeFormation.js";

let data = JSON.parse(localStorage.getItem("players") || "[]");
let nextId = data.length > 0 ? data.length + 1 : 1;

fetchData().then(fetchedData => {
    data = fetchedData;
    nextId = data.length > 0 ? data.length + 1 : 1;
    console.log("Updated the data:", data);
});

const formationContainer = document.getElementById('formationContainer');
const insertContainer = document.getElementById('insertContainer');
const allPlayers = document.getElementById('allPlayersContainer');
const plrDisplay = document.getElementById('plrDisplay');
const addForm = document.getElementById('addForm');
const editForm = document.getElementById('editForm');

const closeAdd = addForm.querySelector('#closeAdd');
const openAdd = document.getElementById('openAdd');
const addBtn = document.getElementById('addBtn');
const closeAll = document.getElementById('closeAll');
const openAll = document.getElementById('openAll');
const closeDisplay = document.getElementById('closeDisplay');
const editBtn = document.getElementById('editBtn');
const closeEdit = document.getElementById('closeEdit');

const insertBtn = document.getElementById('insertBtn');
const closeInsert = document.getElementById("closeInsert");

const clearFormation = document.getElementById('clearFormation');
const searchInput = document.getElementById('playerSearch');

const removePlr = document.getElementById('removePlr');
const changePlr = document.getElementById('changePlr');
const editPlr = document.getElementById('editPlr');
const deletePlr = document.getElementById('deletePlr');

const formationSelect = document.getElementById('formationSelect');

let dataFilter = fetchPlayersInTeam();

//select formation
formationSelect.addEventListener('change', (e) => {
    changeFormation(e.target.value);
});

//clearing the formation
clearFormation.addEventListener('click', () => {
    displayMsg('This will clear the formation, Are you sure?', 'blue', true, (res) => {
        if (res === 'confirmed') {
            const cards = document.querySelectorAll('.centered');

            cards.forEach((card) => {
                card.classList.add('emptyCard', 'bg-card');
                card.innerHTML = `<span class="icon-[gg--add] text-4xl text-lime-green ">
                          </span><p class="font-bold">${card.dataset.pos}</p>`
            });
        } else {return;}
    })
});

let posArray = [];

//inputs for adding
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

    diving: document.querySelector('#paceInput'),
    handling: document.querySelector('#shootingInput'),
    kicking: document.querySelector('#passingInput'),
    reflexes: document.querySelector('#dribblingInput'),
    speed: document.querySelector('#defendingInput'),
    positioning: document.querySelector('#physicalInput'),

    logo: document.querySelector('#clubImageInput'),
    flag: document.querySelector('#flagImageInput'),
    photo: document.querySelector('#photoInput'),
    rating: document.querySelector('#ratingInput'),
};

//displaying normal player stats
const displayFieldStats = {
    pace: document.querySelector('.displayPAC'),
    shooting: document.querySelector('.displaySHO'),
    dribbling: document.querySelector('.displayDRI'),
    passing: document.querySelector('.displayPAS'),
    defending: document.querySelector('.displayDEF'),
    physical: document.querySelector('.displayPHY'),
};
//displaying gk player stats
const displayGkStats = {
    diving: document.querySelector('.displayPAC'),
    handling: document.querySelector('.displaySHO'),
    kicking: document.querySelector('.displayDRI'),
    reflexes: document.querySelector('.displayPAS'),
    speed: document.querySelector('.displayDEF'),
    positioning: document.querySelector('.displayPHY'),
};
//normal values like name etc
const displayNormalValues = {
    name: document.querySelector('.displayName'),
    position: document.querySelector('.displayPos'),
    logo: document.querySelector('.displayClub'),
    flag: document.querySelector('.displayFlag'),
    photo: document.querySelector('.displayPhoto'),
    rating: document.querySelector('.displayRating'),
};

//inputs for editing
const editInputs = {
    name: editForm.querySelector('#nameEdit'),
    nationality: editForm.querySelector('#natioEdit'),
    club: editForm.querySelector('#clubEdit'),
    position: editForm.querySelector('#positionEdit'),

    diving: editForm.querySelector('#paceEdit'),
    handling: editForm.querySelector('#shootingEdit'),
    kicking: editForm.querySelector('#passingEdit'),
    reflexes: editForm.querySelector('#dribblingEdit'),
    speed: editForm.querySelector('#defendingEdit'),
    positioning: editForm.querySelector('#physicalEdit'),

    pace: editForm.querySelector('#paceEdit'),
    shooting: editForm.querySelector('#shootingEdit'),
    passing: editForm.querySelector('#passingEdit'),
    dribbling: editForm.querySelector('#dribblingEdit'),
    defending: editForm.querySelector('#defendingEdit'),
    physical: editForm.querySelector('#physicalEdit'),

    rating: editForm.querySelector('#ratingEdit'),
};

// CLOSE DISPLAY
display('close', closeDisplay.parentElement.parentElement, closeDisplay);

// CLOSE ADD
display('close', addForm.parentElement, closeAdd);

// OPEN ADD
display('open', addForm.parentElement, openAdd);

// CLOSE ALL PLAYERS
display('close', allPlayers.parentElement.parentElement, closeAll, () => { allPlayers.innerHTML = ''; });

// OPEN ALL PLAYERS
display('open', allPlayers.parentElement.parentElement, openAll, () => {
    dataFilter = fetchPlayersInTeam();
    loadPlayers(dataFilter, allPlayers);
});

// CLOSE INSERT
display('close', insertContainer.parentElement.parentElement, closeInsert);

// CLOSE EDIT
display('close', editForm.parentElement, closeEdit);

//accomodating for gk inputs
addInputs.position.addEventListener('change', (e) => {
    const value = e.target.value
    addInputs.pace.previousElementSibling.textContent = value === 'GK' ? 'Diving' : 'Pace';
    addInputs.shooting.previousElementSibling.textContent = value === 'GK' ? 'Handling' : 'Shooting';
    addInputs.passing.previousElementSibling.textContent = value === 'GK' ? 'Kicking' : 'Passing';
    addInputs.dribbling.previousElementSibling.textContent = value === 'GK' ? 'Reflexes' : 'Dribbling';
    addInputs.defending.previousElementSibling.textContent = value === 'GK' ? 'Speed' : 'Defending';
    addInputs.physical.previousElementSibling.textContent = value === 'GK' ? 'Positioning' : 'Physical';
});
editInputs.position.addEventListener('change', (e) => {
    const value = e.target.value
    editInputs.pace.previousElementSibling.textContent = value === 'GK' ? 'Diving' : 'Pace';
    editInputs.shooting.previousElementSibling.textContent = value === 'GK' ? 'Handling' : 'Shooting';
    editInputs.passing.previousElementSibling.textContent = value === 'GK' ? 'Kicking' : 'Passing';
    editInputs.dribbling.previousElementSibling.textContent = value === 'GK' ? 'Reflexes' : 'Dribbling';
    editInputs.defending.previousElementSibling.textContent = value === 'GK' ? 'Speed' : 'Defending';
    editInputs.physical.previousElementSibling.textContent = value === 'GK' ? 'Positioning' : 'Physical';
});

//add button
addBtn.addEventListener('click', async (e) => {
    e.preventDefault();

    const oldMsg = document.querySelectorAll('.error-msg');
    oldMsg.forEach((error) => error.remove());

    let isValid = true;

    //input validation
    Object.entries(addInputs).forEach(([key, input]) => {
        let errorText = null;
        errorText = validateInputs(key, input);

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
        const newPlayer = {
            id: nextId++,
            name: addInputs.name.value,
            position: addInputs.position.value,
            rating: addInputs.rating.value,
            nationality: addInputs.nationality.value,
            club: addInputs.club.value,
            photo: await convertToBase64(addInputs.photo.files[0]),
            logo: await convertToBase64(addInputs.logo.files[0]),
            flag: await convertToBase64(addInputs.flag.files[0]),
        };

        if (addInputs.position === "GK") {
            newPlayer.diving = addInputs.diving.value;
            newPlayer.handling = addInputs.handling.value;
            newPlayer.kicking = addInputs.kicking.value;
            newPlayer.reflexes = addInputs.reflexes.value;
            newPlayer.speed = addInputs.speed.value;
            newPlayer.positioning = addInputs.positioning.value;
        } else {
            newPlayer.pace = addInputs.pace.value;
            newPlayer.shooting = addInputs.shooting.value;
            newPlayer.passing = addInputs.passing.value;
            newPlayer.dribbling = addInputs.dribbling.value;
            newPlayer.defending = addInputs.defending.value;
            newPlayer.physical = addInputs.physical.value;
        };


        data.push(newPlayer);
        localStorage.setItem('players', JSON.stringify(data));
        loadPlayers(data, allPlayers);
        displayMsg('Player added successfuly.', 'green', false);

        Object.values(addInputs).forEach((input) => { input.value = ''; });
    }
});

//converting images to base64
function convertToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};

let selectedPlayer; //which player is selected
let currTarget; //the card container that holds position data
let displayedPlr; //which player is displayed

//applying the insertion
insertBtn.addEventListener('click', (e) => {
    let playerData = posArray.find(plr => String(plr.id) === selectedPlayer);
    currTarget.innerHTML = "";

    //fill the container target html
    currTarget.classList.remove('bg-card', 'emptyCard');
    const plrDiv = createPlayerDiv(playerData);
    plrDiv.classList.add('inTeam');
    currTarget.appendChild(plrDiv);

    insertContainer.parentElement.parentElement.classList.toggle('hidden');
    displayEvents();
});

//event listeners for players that are in team so we can display data
const displayEvents = () => {
    formationContainer.addEventListener('click', (e) => {
        const playerElement = e.target.closest('.inTeam');
        if (!playerElement) return;
        e.stopPropagation();

        const playerId = playerElement.dataset.id;
        displayedPlr = data.find(plr => String(plr.id) === playerId);

        currTarget = playerElement.parentElement;

        //short names for stats
        const gkStats = {
            diving: "DIV",
            handling: "HAN",
            kicking: "KIC",
            reflexes: "REF",
            speed: "SPE",
            positioning: "POS",
        };
        const stats = {
            pace: "PAC",
            shooting: "SHO",
            passing: "PAS",
            dribbling: "DRI",
            defending: "DEF",
            physical: "PHY",
        };

        //getting the short stat if the player is a GK or not
        const shortStat = displayedPlr.position === "GK" ? gkStats : stats;
        //getting the right input for the player so it can be displayed
        const statInputs = displayedPlr.position === "GK" ? displayGkStats : displayFieldStats;

        //displaying normalvalues
        Object.entries(displayNormalValues).forEach(([key, element]) => {
            if (["photo", "flag", "logo"].includes(key)) {
                element.src = displayedPlr[key];
            } else {
                element.textContent = displayedPlr[key];
            }
        });

        // displaying right stats
        Object.entries(statInputs).forEach(([key, element]) => {
            element.textContent = `${shortStat[key]} ${displayedPlr[key]}`;
        });

        // show the player display modal
        display('open', plrDisplay);
    });
}

//insert a player to an emptycard
formationContainer.addEventListener('click', (e) => {
    const card = e.target.closest('.emptyCard');
    if (!card) return;

    currTarget = card;
    const targetCard = card.dataset.pos;

    posArray = fetchExistingPlayers(targetCard);


    loadPlayers(posArray, insertContainer);
    display('open', insertContainer.parentElement.parentElement);

    // selection of player cards
    const playerCards = insertContainer.querySelectorAll('.notSelected');
    playerCards.forEach((playerCard) => {
        playerCard.addEventListener('click', () => {
            playerCards.forEach((card) => card.classList.remove('selectedCard'));
            playerCard.classList.add('selectedCard');
            selectedPlayer = playerCard.dataset.id;
        });
    });
});

//remove plr
removePlr.addEventListener('click', (e) => {
    e.stopPropagation();
    currTarget.classList.add('bg-card', 'emptyCard');
    currTarget.innerHTML = `<span class="icon-[gg--add] text-4xl text-lime-green ">
                                </span><p class="font-bold">${displayedPlr.position}</p>`;
    display('close', plrDisplay);
});

//switch plr
changePlr.addEventListener('click', (e) => {
    e.stopPropagation();

    //fetch for players based on the position of the displayed plr
    posArray = fetchExistingPlayers(displayedPlr.position);
    loadPlayers(posArray, insertContainer);
    display('close', plrDisplay);

    const insertPlr = insertContainer.querySelectorAll('.notSelected');

    insertPlr.forEach((plr) => {
        plr.addEventListener('click', () => {
            console.log('clicked');
            insertPlr.forEach((card) => card.classList.remove('selectedCard'));
            plr.classList.add('selectedCard');
            selectedPlayer = plr.dataset.id;
        });
    });

    insertContainer.parentElement.parentElement.classList.remove('hidden');
});

//delete plr
deletePlr.addEventListener('click', (e) => {
    e.stopPropagation();
    displayMsg('This will delete the player completely. Are you sure?', 'red', true, (res) => {
        if (currTarget && res === 'confirmed') {

            currTarget.classList.add('bg-card', 'emptyCard');
            currTarget.innerHTML = `<span class="icon-[gg--add] text-4xl text-lime-green ">
                                    </span><p class="font-bold">${displayedPlr.position}</p>`;

            const delIndex = data.findIndex((plr) => displayedPlr.id === plr.id);

            if (delIndex > -1) {
                data.splice(delIndex, 1);
                localStorage.setItem('players', JSON.stringify(data));
                displayMsg('Player deleted successfuly!', 'green', false);
            }

            display('close', plrDisplay);
        } else {
            return;
        }
    });
});

//edit plr
editPlr.addEventListener('click', (e) => {
    e.stopPropagation();

    const idx = data.findIndex((plr) => displayedPlr.id === plr.id);

    //displaying the player data into the form
    Object.entries(editInputs).forEach(([key, input]) => {
        input.value = displayedPlr[key];
    });

    // editInputs.passing.setAttribute('value', 29);

    //applying the edit
    editBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        const oldMsg = document.querySelectorAll('.error-msg');
        oldMsg.forEach((error) => error.remove());

        let isValid = true;

        //input validation
        Object.entries(editInputs).forEach(([key, input]) => {
            let errorText = null;
            errorText = validateInputs(key, input);

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

        //if is valid proceed
        if (isValid) {
            currTarget.classList.add('bg-card', 'emptyCard');
            currTarget.innerHTML = `<span class="icon-[gg--add] text-4xl text-lime-green ">
                                </span><p class="font-bold">${displayedPlr.position}</p>`;

            insertContainer.innerHTML = "";

            const normal = ["name", "position", "nationality", "club", "rating"];
            const gkStats = ["diving", "handling", "kicking", "reflexes", "speed", "positioning"];
            const stats = ["pace", "shooting", "passing", "dribbling", "defending", "physical"];

            normal.forEach(key => {
                displayedPlr[key] = editInputs[key].value;
            });

            // know which stat to update and delete
            const statsUpdate = editInputs.position.value === 'GK' ? gkStats : stats;
            const statsDelete = editInputs.position.value === 'GK' ? stats : gkStats;

            //updating stats based on the statsupdate
            statsUpdate.forEach(stat => {
                displayedPlr[stat] = editInputs[stat].value;
            });

            //deleting stats based on the statsdelete
            statsDelete.forEach(stat => {
                delete displayedPlr[stat];
            });

            displayMsg('Player edited successfully', 'blue', false);

            //updating the change in localstorage
            data[idx] = displayedPlr;
            localStorage.setItem('players', JSON.stringify(data));

            //emptying out the edit form
            Object.values(editInputs).forEach((input) => { input.value = ''; });
            display('close', editForm.parentElement);
            display('close', plrDisplay);
        }
    });

    display('open', editForm.parentElement);
});

//search playerlist
searchInput.addEventListener('keyup', (e) => {
    e.stopPropagation();
    if (e.target.value === "") {
        return
    } else {
        setTimeout(() => {
            dataFilter = fetchPlayersInTeam();
            const searchData = e.target.value.toLowerCase();
            

            const filtered = dataFilter.filter(o => o.name.toLowerCase().includes(searchData));

            loadPlayers(filtered, allPlayers);
        }, 500);
    }

});