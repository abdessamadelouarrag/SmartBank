import {
    getCurrentUser,
    getData
} from "../Storage/storage.js";

import {
    initNavbar,
    initNavbarEvents
} from "../Components/navbar.js";


function formatDate(date) {
    return new Date(date).toLocaleString(
        "fr-FR",
        {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        }
    );
}


function createActivitiesHTML(activities) {
    if (activities.length === 0) {
        return `
            <div class="empty-history">
                <h2>Aucune activité</h2>

                <p>
                    Vos prochaines activités apparaîtront ici.
                </p>
            </div>
        `;
    }

    return activities.map(activity => {
        return `
            <article class="history-card">
                <div>
                    <span class="history-type">
                        ${activity.type}
                    </span>

                    <h2>${activity.title}</h2>

                    <p>${activity.description}</p>
                </div>

                <time>
                    ${formatDate(activity.createdAt)}
                </time>
            </article>
        `;
    }).join("");
}


export function initHistorique() {
    const user = getCurrentUser();
    const data = getData();

    const userActivities = data.activities
        .filter(
            activity => activity.userId === user.id
        )
        .sort(
            (firstActivity, secondActivity) =>
                new Date(secondActivity.createdAt) -
                new Date(firstActivity.createdAt)
        );

    return `
        ${initNavbar()}

        <main class="history-page">
            <section class="history-header">
                <h1>Historique</h1>

                <p>
                    Consultez vos dernières activités.
                </p>
            </section>

            <section class="history-list">
                ${createActivitiesHTML(userActivities)}
            </section>
        </main>
    `;
}


export function initHistoriqueEvents() {
    const cleanupNavbar = initNavbarEvents();

    return function cleanupHistorique() {
        cleanupNavbar();
    };
}