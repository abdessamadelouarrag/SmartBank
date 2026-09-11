import {
    getCurrentUser,
    getData
} from "../Storage/storage.js";

import {
    initNavbar,
    initNavbarEvents
} from "../Components/navbar.js";


export function initDashboard() {
    const user = getCurrentUser();
    const data = getData();

    const simulationsCount = data.simulations.filter(
        simulation => simulation.userId === user.id
    ).length;

    const points = user.rewardPoints || 0;

    const activatedOffersCount =
        user.activatedOffers?.length || 0;

    const currentDate = new Intl.DateTimeFormat(
        "fr-FR",
        {
            weekday: "long",
            day: "numeric",
            month: "long"
        }
    ).format(new Date());

    return `
        ${initNavbar()}

        <main class="dashboard">
            <section class="main-section">
                <div class="banner">
                    <h1 class="text-bg">
                        Bonjour, ${user.name} 👋
                    </h1>

                    <h2>
                        Aperçu de votre activité -
                        ${currentDate}
                    </h2>
                </div>
            </section>

            <section class="section-stats">
                <div class="all-carts">

                    <div class="carts">
                        <div class="card-header">
                            <h3>Points de récompense</h3>
                            <span class="card-icon">↗</span>
                        </div>

                        <h4>${points}</h4>
                    </div>

                    <div class="carts">
                        <div class="card-header">
                            <h3>Simulations réalisées</h3>
                            <span class="card-icon">↗</span>
                        </div>

                        <h4>${simulationsCount}</h4>
                    </div>

                    <div class="carts">
                        <div class="card-header">
                            <h3>Offres activées</h3>
                            <span class="card-icon">↗</span>
                        </div>

                        <h4>${activatedOffersCount}</h4>
                    </div>

                </div>
            </section>
        </main>
    `;
}


export function initDashboardEvents() {
    const cleanupNavbar = initNavbarEvents();

    return function cleanupDashboard() {
        cleanupNavbar();
    };
}