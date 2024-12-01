import { createPlayerDiv } from "./createPlayerDiv.js";

//loadplayers into a container
export const loadPlayers = (players, container) => {
    container.innerHTML = "";
    if (players.length === 0) {
        container.innerHTML = '<p class="text-2xl">No players exist.</p>';
    } else {
        players.forEach(player => {
            const existingDiv = container.querySelector(`[data-id="${player.id}"]`);
            if (!existingDiv) {
                const newDiv = createPlayerDiv(player);
                container.appendChild(newDiv);
            }
        });
    }
};