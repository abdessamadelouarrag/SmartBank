import { renderLogin, initLoginEvents } from "../Pages/login.js";
import { renderRegister, initRegisterEvents } from "../Pages/register.js";
import { initDashboard, initDashboardEvents } from "../Pages/dashboard.js";
import { initOffers, initOffersEvents} from "../Pages/offers.js";
import { initCredit, initCreditEvents} from "../Pages/credit.js";
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
}
};

let cleanupCurrentPage = null;

function getCurrentPath() {
    return window.location.hash.replace("#", "") || "/login";
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
