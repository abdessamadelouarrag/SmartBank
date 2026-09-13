import { registerUser } from "../Security/security.js";

export function renderRegister() {
    return `
        <main class="auth-page auth-page--register">
            <div class="auth-shell">
                <a class="auth-brand" href="#/login" aria-label="SmartBank">
                    <img src="images/logo-smartBank.png" alt="SmartBank">
                </a>

                <section class="auth-card auth-card--register" aria-labelledby="register-title">
                    <header class="auth-card-header">
                        <p class="auth-eyebrow">Rejoignez SmartBank</p>
                        <h1 id="register-title">Créer un compte</h1>
                        <p class="auth-description">Créez votre espace personnel en quelques instants.</p>
                    </header>

                    <form class="auth-form" id="register-form">
                        <div class="form-group">
                            <label for="name">Nom complet</label>
                            <input id="name" name="name" type="text" autocomplete="name" placeholder="Votre nom complet" required>
                        </div>

                        <div class="form-group">
                            <label for="email">Adresse email</label>
                            <input id="email" name="email" type="email" autocomplete="email" placeholder="exemple@email.com" required>
                        </div>

                        <div class="form-group">
                            <label for="phone">Téléphone</label>
                            <input id="phone" name="phone" type="tel" autocomplete="tel" placeholder="0612345678" required>
                        </div>

                        <div class="form-group">
                            <label for="password">Mot de passe</label>
                            <input id="password" name="password" type="password" autocomplete="new-password" placeholder="Minimum 8 caractères" required>
                        </div>

                        <div class="form-group auth-confirm-field">
                            <label for="confirm-password">Confirmer le mot de passe</label>
                            <input id="confirm-password" name="confirmPassword" type="password" autocomplete="new-password" placeholder="Répétez le mot de passe" required>
                        </div>

                        <p id="register-message" class="auth-message" aria-live="polite"></p>
                        <button class="auth-submit" id="register-button" type="submit">Créer mon compte</button>
                    </form>

                    <p class="auth-switch">Vous avez déjà un compte ? <a href="#/login">Se connecter</a></p>
                </section>
            </div>
        </main>
    `;
}

export function initRegisterEvents() {
    const form = document.querySelector("#register-form");
    const message = document.querySelector("#register-message");

    async function handleRegister(event) {
        event.preventDefault();

        const name = document.querySelector("#name").value;
        const email = document.querySelector("#email").value;
        const phone = document.querySelector("#phone").value;
        const password = document.querySelector("#password").value;
        const confirmPassword = document.querySelector("#confirm-password").value;
        const result = await registerUser({ name, email, phone, password, confirmPassword });

        message.textContent = result.message;

        if (result.success) {
            message.className = "success-message";
            form.reset();
            window.location.hash = "#/login";
        } else {
            message.className = "error-message";
        }
    }

    form.addEventListener("submit", handleRegister);

    return function cleanupRegister() {
        form.removeEventListener("submit", handleRegister);
    };
}
