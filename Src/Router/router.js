import { renderLogin, initLoginEvents } from "../Pages/login.js";
import { renderRegister, initRegisterEvents } from "../Pages/register.js";
import { initDashboard, initDashboardEvents } from "../Pages/dashboard.js";
import { initOffers, initOffersEvents} from "../Pages/offers.js";
import { initCredit, initCreditEvents} from "../Pages/credit.js";
import { initHistorique, initHistoriqueEvents} from "../Pages/historique.js";
import { initRecompenses,initRecompensesEvents} from "../Pages/recompenses.js";
import { initFlashOffers } from "../Pages/flashOffers.js";
const routes = {
    "/login": { 
        render: renderLogin,
        initEvents: initLoginEvents
    },
    "/register": {
        render: renderRegister,
        initEvents: initRegisterEvents,
    },
    "/dashboard": {
        render: initDashboard,
        initEvents: initDashboardEvents
    },
    "/offers": {
        render: initOffers,
        initEvents: initOffersEvents
    },
    "/credit": {
        render: initCredit,
        initEvents: initCreditEvents
    },
    "/historique": {
        render: initHistorique,
        initEvents: initHistoriqueEvents
    },
    "/recompenses": {
        render: initRecompenses,
        initEvents: initRecompensesEvents
    },
    "/flashoffers" : {
        render : initFlashOffers,
    }
};

let cleanupCurrentPage = null;

function getCurrentPath() {
    return window.location.hash.replace("#", "") || "/login";
}

export function replaceIndexFile(){
    if(window.location.pathname.endsWith("/index.html")){
        const replacePath = window.location.pathname.replace("index.html", "");
        window.history.replaceState(null, "", replacePath + window.location.search + window.location.hash)
    }
}

function renderRoute() {
    const root = document.querySelector("#root");
    const route = routes[getCurrentPath()];

    cleanupCurrentPage?.();

    if (!route) {
        root.innerHTML = `
            <main class="auth-page">
                <section class="auth-card auth-card--not-found">
                    <h1>404</h1>
                    <p>Page introuvable</p>
                    <a href="#/dashboard">Retour a la page de Dashboard</a>
                </section>
            </main>`;
        cleanupCurrentPage = null;
        return;
    }

    root.innerHTML = route.render();
    cleanupCurrentPage = route.initEvents?.() || null;
}

export function initRouter() {
    window.addEventListener("hashchange", renderRoute);
    renderRoute();
}
