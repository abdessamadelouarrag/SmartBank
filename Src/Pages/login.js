import { loginUser } from "../Security/security.js";

export function renderLogin() {
    return `
        <main class="auth-page auth-page--login">
            <a class="auth-brand" href="#/login" aria-label="SmartBank">
                <img src="images/logo-smartBank.png" alt="SmartBank">
            </a>

            <section class="auth-card" aria-labelledby="login-title">
                <h1 id="login-title" class="auth-title">Connexion</h1>

                <form class="auth-form" id="login-form">
                    <div class="form-group">
                        <label for="login-email">Votre email</label>
                        <input id="login-email" name="email" type="email" autocomplete="email" required>
                    </div>

                    <div class="form-group">
                        <label for="login-password">Mot de passe</label>
                        <input id="login-password" name="password" type="password" autocomplete="current-password" required>
                    </div>

                    <p id="login-message" class="auth-message" aria-live="polite"></p>
                    <button class="auth-submit" type="submit">Login</button>
                </form>

                <p class="auth-switch">Nouveau chez SmartBank ? <a href="#/register">Créer un compte</a></p>
            </section>
        </main>
    `;
}

export function initLoginEvents() {
    const form = document.querySelector("#login-form");
    const message = document.querySelector("#login-message");

    async function handleLogin(event) {
        event.preventDefault();

        const email =
            document.querySelector("#login-email").value;

        const password =
            document.querySelector("#login-password").value;

        const result = await loginUser(email, password);

        message.textContent = result.message;

        if (result.success) {
            message.className = "success-message";

            window.location.hash = "#/dashboard";
        } else {
            message.className = "error-message";
        }
    }

    form.addEventListener("submit", handleLogin);

    return function cleanupLogin() {
        form.removeEventListener("submit", handleLogin);
    };
}
