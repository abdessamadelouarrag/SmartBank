import {getCurrentUser,saveReward} from "../Storage/storage.js";

import {initNavbar,initNavbarEvents} from "../Components/navbar.js";


const possibleRewards = [
    { label: "10 points", points: 10 },
    { label: "20 points", points: 20 },
    { label: "50 points", points: 50 },
    { label: "Aucun gain", points: 0 }
];


function getToday() {
    return new Date().toISOString().slice(0, 10);
}


export function initRecompenses() {
    const user = getCurrentUser();

    const alreadyPlayed = user.lastSpinDate === getToday();

    return `
        ${initNavbar()}

        <main class="rewards-page">

            <section class="rewards-header">
                <h1>Récompenses</h1>

                <p>
                    Cliquez sur le bouton pour gagner
                    des points aléatoires.
                </p>

                <h2>
                    Mes points :
                    <span id="points-value">
                        ${user.rewardPoints || 0}
                    </span>
                </h2>
            </section>

            <section class="reward-container">

                <div class="reward-icon"></div>

                <button
                    id="reward-button"
                    type="button"
                    ${alreadyPlayed ? "disabled" : ""}
                >
                    ${
                        alreadyPlayed
                            ? "Tentative utilisée"
                            : "Tenter ma chance"
                    }
                </button>

                <p id="reward-message">
                    ${
                        alreadyPlayed
                            ? "Revenez demain pour une nouvelle tentative."
                            : ""
                    }
                </p>

            </section>

        </main>
    `;
}


export function initRecompensesEvents() {
    const rewardButton = document.querySelector("#reward-button");

    const rewardMessage = document.querySelector("#reward-message");

    const pointsElement = document.querySelector("#points-value");

    const cleanupNavbar = initNavbarEvents();


    function handleReward() {
        const user = getCurrentUser();
        const today = getToday();

        // verifier si l'utilisateur a deja jou
        if (user.lastSpinDate === today) {
            rewardMessage.textContent =
                "Vous avez déjà utilisé votre tentative.";

            rewardButton.disabled = true;
            return;
        }

        // Choisir une recompense aleatoire
        const randomIndex = Math.floor(
            Math.random() * possibleRewards.length
        );

        const selectedReward = possibleRewards[randomIndex];

        const reward = {
            id: crypto.randomUUID(),
            userId: user.id,
            label: selectedReward.label,
            points: selectedReward.points,
            date: today,
            createdAt: new Date().toISOString()
        };

        // Enregistrer dans LocalStorage
        saveReward(reward);

        // Récupérer les informations actualisées
        const updatedUser = getCurrentUser();

        pointsElement.textContent =
            updatedUser.rewardPoints || 0;

        if (selectedReward.points > 0) {
            rewardMessage.textContent =
                `Félicitations ! Vous avez gagné ${selectedReward.points} points 🎉`;
        } else {
            rewardMessage.textContent =
                "Aucun gain cette fois. Revenez demain.";
        }

        rewardButton.disabled = true;
        rewardButton.textContent = "Tentative utilisée";
    }


    rewardButton?.addEventListener(
        "click",
        handleReward
    );


    return function cleanupRecompenses() {
        rewardButton?.removeEventListener(
            "click",
            handleReward
        );

        cleanupNavbar();
    };
}