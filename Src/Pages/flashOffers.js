import { getData } from "../Storage/storage.js";
import { initNavbar, initNavbarEvents } from "../Components/navbar.js";


function createFlashOffers(flashOffers){
    if(flashOffers.length === 0){
        return `<p class="empty-message"> Aucun Flash Offers !</p>`;
    }

    return flashOffers.map(flashOffer => {
        return `<article class="offer-card">
                <span class="offer-badge">
                    ${flashOffer.offerName}
                </span>

                <h2></h2>

                <p>${flashOffer.description}</p>

                <div class="offer-information">


                    <p>
                        Durée maximum :
                        <strong>${flashOffer.dateEnd}</strong>
                    </p>
                </div>

                <a
                    href="#/credit"
                    class="offer-button"
                >
                    Simuler cette offre
                </a>
            </article>`
    }).join("");
}

export function initFlashOffers(){
    const data = getData();

    const dateNow = new Date().toISOString().slice(0, 10);
    const activeFlashOffers = data.flashOffers.filter(flashOffer => flashOffer.dateEnd >= dateNow);

    return `
            ${initNavbar()}
    
            <main class="offers-page">
                <section class="offers-header">
                    <h1>Nos flash offres financières</h1>
    
                    <p>
                        Découvrez les offres disponibles
                        sur SmartBank.
                    </p>
    
                </section>
    
                <section class="offers-list">
                    ${createFlashOffers(activeFlashOffers)}
                </section>
            </main>
        `;
}