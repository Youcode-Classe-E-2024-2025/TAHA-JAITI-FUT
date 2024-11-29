import { createPlayerDiv } from "./createPlayerDiv.js";

//loadplayers into a container
export const loadPlayers = (players, container) => {
    players.forEach(player => {
        const existingDiv = container.querySelector(`[data-id="${player.id}"]`);
        if (!existingDiv) {
            const newDiv = createPlayerDiv(player);
            container.appendChild(newDiv);
        }
    });

    if (players.length === 0 && container.childNodes.length === 0) {
        container.innerHTML = '<p class="text-2xl">No players exist.</p>';
    }
};