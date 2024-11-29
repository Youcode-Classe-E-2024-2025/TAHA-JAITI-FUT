let data = JSON.parse(localStorage.getItem("players") || "[]");
const loading = document.getElementById('loadingScreen');

export const fetchData = async () => {
    if (data.length === 0 && !localStorage.getItem("players_loaded")) {
        try {
            const response = await axios.get('./players.json');
            if (response.data && response.data.players) {
                const players = response.data.players;
                localStorage.setItem("players", JSON.stringify(players));
                localStorage.setItem("players_loaded", "true");
                loading.classList.add('hidden');
                return players;
            } else {
                console.error("Invalid data");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            loading.classList.add('hidden');
        }
    } else {
        loading.classList.add('hidden');
        return JSON.parse(localStorage.getItem("players") || "[]");
    }
};
