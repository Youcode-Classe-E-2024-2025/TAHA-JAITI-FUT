const loading = document.getElementById('loadingScreen');
let data = JSON.parse(localStorage.getItem("players") || "[]");

const fetch = async () => {
    if (data.length === 0 && !localStorage.getItem("players_loaded")) {
        try {
            const response = await axios.get('../players.json');
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

export default fetch;