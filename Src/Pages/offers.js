import {
    getData
} from "../Storage/storage.js";

import {
    initNavbar,
    initNavbarEvents
} from "../Components/navbar.js";


function createOfferCards(offers) {
    if (offers.length === 0) {
        return `
            <p class="empty-message">
                Aucune offre disponible.
            </p>
        `;
    }

    return offers.map(offer => {
        return `
            <article class="offer-card">
                <span class="offer-badge">
                    ${offer.badge}
                </span>

                <h2>${offer.title}</h2>

                <p>${offer.description}</p>

                <div class="offer-information">
                    <p>
                        Taux :
                        <strong>${offer.rate}%</strong>
                    </p>

                    <p>
                        Montant maximum :
                        <strong>${offer.maxAmount} DH</strong>
                    </p>

                    <p>
                        Durée maximum :
                        <strong>${offer.duration} mois</strong>
                    </p>
                </div>

                <a
                    href="#/credit"
                    class="offer-button"
                >
                    Simuler cette offre
                </a>
            </article>
        `;
    }).join("");
}


export function initOffers() {
    const data = getData();

    const activeOffers = data.offers.filter(
        offer => offer.isActive === true
    );

    return `
        ${initNavbar()}

        <main class="offers-page">
            <section class="offers-header">
                <h1>Nos offres financières</h1>

                <p>
                    Découvrez les offres disponibles
                    sur SmartBank.
                </p>

            </section>

            <section class="offers-list">
                ${createOfferCards(activeOffers)}
            </section>
        </main>
    `;
}


export function initOffersEvents() {
    const cleanupNavbar = initNavbarEvents();

    return function cleanupOffers() {
        cleanupNavbar();
    };
}
