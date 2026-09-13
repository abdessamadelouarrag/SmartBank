import {
    getCurrentUser,
    saveReward
} from "../Storage/storage.js";

import {
    initNavbar,
    initNavbarEvents
} from "../Components/navbar.js";


const possibleRewards = [
    { label: "10 points", points: 10 },
    { label: "20 points", points: 20 },
    { label: "50 points", points: 50 },
    { label: "Aucun gain", points: 0 }
];


function getToday() {
    const date = new Date();

    const year = date.getFullYear();

    const month = String(
        date.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
        date.getDate()
    ).padStart(2, "0");

    return `${year}-${month}-${day}`;
}


export function initRecompenses() {
    const user = getCurrentUser();

    const alreadyPlayed =
        user.lastSpinDate === getToday();

    return `
        ${initNavbar()}

        <main class="rewards-page">
            <section class="rewards-header">
                <h1>Récompenses</h1>

                <p>
                    Tournez la roue et gagnez des points.
                </p>

                <h2>
                    Mes points :
                    <span id="points-value">
                        ${user.rewardPoints || 0}
                    </span>
                </h2>
            </section>

            <section class="spinner-container">
                <div class="spinner-pointer">▼</div>

                <div id="spinner-wheel" class="spinner-wheel">
                    <span>10</span>
                    <span>20</span>
                    <span>50</span>
                    <span>0</span>
                </div>

                <button
                    id="spin-button"
                    type="button"
                    ${alreadyPlayed ? "disabled" : ""}
                >
                    ${
                        alreadyPlayed
                            ? "Tentative utilisée"
                            : "Tourner la roue"
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
    const spinButton =
        document.querySelector("#spin-button");

    const wheel =
        document.querySelector("#spinner-wheel");

    const message =
        document.querySelector("#reward-message");

    const pointsElement =
        document.querySelector("#points-value");

    const cleanupNavbar = initNavbarEvents();

    let spinTimer = null;


    function handleSpin() {
        const user = getCurrentUser();
        const today = getToday();

        if (user.lastSpinDate === today) {
            message.textContent =
                "Vous avez déjà utilisé votre tentative.";

            spinButton.disabled = true;
            return;
        }

        spinButton.disabled = true;
        spinButton.textContent = "La roue tourne...";

        const randomIndex = Math.floor(
            Math.random() * possibleRewards.length
        );

        const selectedReward =
            possibleRewards[randomIndex];

        const rotation =
            1440 + Math.floor(Math.random() * 360);

        wheel.style.transform =
            `rotate(${rotation}deg)`;

        spinTimer = setTimeout(() => {
            const reward = {
                id: crypto.randomUUID(),
                userId: user.id,
                label: selectedReward.label,
                points: selectedReward.points,
                date: today,
                createdAt: new Date().toISOString()
            };

            saveReward(reward);

            pointsElement.textContent =
                (user.rewardPoints || 0) +
                selectedReward.points;

            if (selectedReward.points > 0) {
                message.textContent =
                    `Félicitations ! Vous avez gagné ${selectedReward.points} points.`;
            } else {
                message.textContent =
                    "Aucun gain cette fois. Revenez demain.";
            }

            spinButton.textContent =
                "Tentative utilisée";
        }, 2000);
    }


    spinButton.addEventListener("click", handleSpin);


    return function cleanupRecompenses() {
        spinButton.removeEventListener(
            "click",
            handleSpin
        );

        if (spinTimer) {
            clearTimeout(spinTimer);
        }

        cleanupNavbar();
    };
}