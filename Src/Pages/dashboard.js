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
                        Bonjour, ${user.name} 
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

            <section class="quick-actions" aria-labelledby="quick-actions-title">
                <h2 id="quick-actions-title">Actions rapides</h2>

                <div class="quick-actions-list">
                    <a href="#/offers" class="quick-action">
                        <span class="quick-action-icon" aria-hidden="true">
                            <svg viewBox="0 0 24 24">
                                <path d="M5 5.5h14v13H5z"></path>
                                <path d="M8 9h8M8 13h5"></path>
                            </svg>
                        </span>
                        <span>
                            <strong>Voir les offres</strong>
                            <small>Découvrir les offres disponibles</small>
                        </span>
                        <span class="quick-action-arrow" aria-hidden="true">→</span>
                    </a>

                    <a href="#/credit" class="quick-action">
                        <span class="quick-action-icon" aria-hidden="true">
                            <svg viewBox="0 0 24 24">
                                <path d="M4.5 7.5h15v10h-15z"></path>
                                <path d="M7.5 5v2.5M16.5 5v2.5M8 12h3M8 15h6"></path>
                            </svg>
                        </span>
                        <span>
                            <strong>Simuler un crédit</strong>
                            <small>Calculer votre mensualité</small>
                        </span>
                        <span class="quick-action-arrow" aria-hidden="true">→</span>
                    </a>
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
