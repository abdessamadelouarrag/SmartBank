import {
    getCurrentUser,
    addSimulation
} from "../Storage/storage.js";

import {
    initNavbar,
    initNavbarEvents
} from "../Components/navbar.js";


export function initCredit() {
    return `
        ${initNavbar()}

        <main class="credit-page">
            <section class="credit-header">
                <h1>Simulation de crédit</h1>

                <p>
                    Estimez votre mensualité selon le montant,
                    la durée et le taux.
                </p>
            </section>

            <section class="credit-container">
                <form id="credit-form">
                    <div class="form-group">
                        <label for="credit-type">
                            Type de crédit
                        </label>

                        <select id="credit-type">
                            <option value="Personnel">
                                Crédit personnel
                            </option>

                            <option value="Automobile">
                                Crédit automobile
                            </option>

                            <option value="Logement">
                                Crédit logement
                            </option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="credit-amount">
                            Montant souhaité (DH)
                        </label>

                        <input
                            id="credit-amount"
                            type="number"
                            min="1000"
                            placeholder="Exemple : 100000"
                        >
                    </div>

                    <div class="form-group">
                        <label for="credit-duration">
                            Durée en mois
                        </label>

                        <input
                            id="credit-duration"
                            type="number"
                            min="1"
                            placeholder="Exemple : 60"
                        >
                    </div>

                    <div class="form-group">
                        <label for="credit-rate">
                            Taux annuel (%)
                        </label>

                        <input
                            id="credit-rate"
                            type="number"
                            min="0"
                            step="0.1"
                            placeholder="Exemple : 5"
                        >
                    </div>

                    <p id="credit-message"></p>

                    <button type="submit">
                        Calculer
                    </button>
                </form>

                <section
                    id="credit-result"
                    class="credit-result"
                ></section>
            </section>

            <p class="credit-warning">
                Cette simulation est uniquement indicative
                et ne constitue pas une offre bancaire réelle.
            </p>
        </main>
    `;
}

function calculateCredit(amount, duration, annualRate) {
    const monthlyRate = annualRate / 100 / 12;

    let monthlyPayment;

    if (monthlyRate === 0) {
        monthlyPayment = amount / duration;
    } else {
        monthlyPayment =
            amount * monthlyRate /
            (
                1 -
                Math.pow(
                    1 + monthlyRate,
                    -duration
                )
            );
    }

    const totalPayment =
        monthlyPayment * duration;

    const totalInterest =
        totalPayment - amount;

    return {
        monthlyPayment:
            Number(monthlyPayment.toFixed(2)),

        totalPayment:
            Number(totalPayment.toFixed(2)),

        totalInterest:
            Number(totalInterest.toFixed(2))
    };
}


export function initCreditEvents() {
    const form =
        document.querySelector("#credit-form");

    const message =
        document.querySelector("#credit-message");

    const resultElement =
        document.querySelector("#credit-result");

    const cleanupNavbar = initNavbarEvents();


    function handleCreditSimulation(event) {
        event.preventDefault();

        const creditType =
            document.querySelector("#credit-type").value;

        const amount = Number(
            document.querySelector("#credit-amount").value
        );

        const duration = Number(
            document.querySelector("#credit-duration").value
        );

        const annualRate = Number(
            document.querySelector("#credit-rate").value
        );

        if (
            amount <= 0 ||
            duration <= 0 ||
            annualRate < 0
        ) {
            message.textContent =
                "Veuillez saisir des valeurs valides.";

            message.className = "error-message";

            resultElement.innerHTML = "";

            return;
        }

        const result = calculateCredit(
            amount,
            duration,
            annualRate
        );

        const currentUser = getCurrentUser();

        const newSimulation = {
            id: crypto.randomUUID(),
            userId: currentUser.id,
            creditType: creditType,
            amount: amount,
            duration: duration,
            annualRate: annualRate,
            monthlyPayment: result.monthlyPayment,
            totalPayment: result.totalPayment,
            totalInterest: result.totalInterest,
            createdAt: new Date().toISOString()
        };

        addSimulation(newSimulation);

        message.textContent =
            "Simulation réalisée et enregistrée.";

        message.className = "success-message";

        resultElement.innerHTML = `
            <h2>Résultat de la simulation</h2>

            <div class="result-line">
                <span>Type de crédit</span>
                <strong>${creditType}</strong>
            </div>

            <div class="result-line">
                <span>Montant demandé</span>
                <strong>
                    ${amount.toFixed(2)} DH
                </strong>
            </div>

            <div class="result-line">
                <span>Mensualité estimée</span>
                <strong>
                    ${result.monthlyPayment.toFixed(2)} DH
                </strong>
            </div>

            <div class="result-line">
                <span>Total à rembourser</span>
                <strong>
                    ${result.totalPayment.toFixed(2)} DH
                </strong>
            </div>

            <div class="result-line">
                <span>Total des intérêts</span>
                <strong>
                    ${result.totalInterest.toFixed(2)} DH
                </strong>
            </div>

            <div class="result-line">
                <span>Durée</span>
                <strong>${duration} mois</strong>
            </div>

            <div class="result-line">
                <span>Taux annuel</span>
                <strong>${annualRate}%</strong>
            </div>
        `;
    }


    form.addEventListener(
        "submit",
        handleCreditSimulation
    );


    return function cleanupCredit() {
        form.removeEventListener(
            "submit",
            handleCreditSimulation
        );

        cleanupNavbar();
    };
}