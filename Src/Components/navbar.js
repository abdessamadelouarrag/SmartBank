import { logoutUser } from "../Storage/storage.js";


export function initNavbar() {
    return `
        <nav>
            <div class="allNav">
                <div class="logo">
                    <img
                        src="./images/logo-smartBank.png"
                        alt="Logo SmartBank"
                    >
                </div>

                <div class="right-Side">
                    <div class="links">
                        <a
                            href="#/dashboard"
                            data-page="/dashboard"
                        >
                            Dashboard
                        </a>

                        <a
                            href="#/offers"
                            data-page="/offers"
                        >
                            Offers
                        </a>

                        <a
                            href="#/credit"
                            data-page="/credit"
                        >
                            Credit
                        </a>

                        <a
                            href="#/recompenses"
                            data-page="/recompenses"
                        >
                            Récompenses
                        </a>

                        <a
                            href="#/flashoffers"
                            data-page="/flashoffers"
                        >
                            Flash Offers
                        </a>

                        <a
                            href="#/historique"
                            data-page="/historique"
                        >
                            Historique
                        </a>
                    </div>

                    <div class="btn-logout">
                        <button
                            id="logout-button"
                            type="button"
                        >
                            LogOut
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    `;
}

export function initNavbarEvents() {
    const logoutButton =
        document.querySelector("#logout-button");

    const links =
        document.querySelectorAll("[data-page]");

    const currentPage =
        window.location.hash.replace("#", "") ||
        "/dashboard";


    // Mettre le lien actuel en active
    links.forEach(link => {
        link.classList.remove("active");

        if (link.dataset.page === currentPage) {
            link.classList.add("active");
        }
    });


    // Déconnexion
    function handleLogout() {
        logoutUser();

        window.location.hash = "#/login";
    }

    logoutButton.addEventListener(
        "click",
        handleLogout
    );


    // Nettoyage de l’événement
    return function cleanupNavbar() {
        logoutButton.removeEventListener(
            "click",
            handleLogout
        );
    };
}