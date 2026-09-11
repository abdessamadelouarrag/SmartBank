import {addUser, findUserByEmail, setCurrentUser} from "../Storage/storage.js";

export async function hashPassword(password){
    const encoder = new TextEncoder();

    const passwordData = encoder.encode(password);

    const hashBuffer = await crypto.subtle.digest("SHA-256", passwordData);

    const hashArray = Array.from(new Uint8Array(hashBuffer));

    const passwordHash = hashArray.map(byte => byte.toString(16).padStart(2, "0")).join("");

    return passwordHash;
}

function isValideEmail(email){
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(email);
}

function isStrongPassword(password){
    const hasMinlength = password.length >= 8;

    return hasMinlength;
}

export async function registerUser(formData) {
    const name = formData.name.trim();
    const email = formData.email.trim().toLowerCase();
    const phone = formData.phone.trim();
    const password = formData.password;
    const confirmPassword = formData.confirmPassword;

    if(!name || !email || !phone || !password || !confirmPassword){
        return {
            message : "Veuillez remplir tout les champs !"
        }
    }

    if(!isValideEmail(email)){
        return{
            success : false,
            message : "email Invalide !"
        };
    }

    if(!isStrongPassword(password)){
        return{
            success : false,
            message : "le mot de passe doit contenir 8 caracteres"
        }
    }

    if(password !== confirmPassword){
        return {
            success : false,
            message : "les mots de passe ne correspondent pas"
        };
    }

    const exUser = findUserByEmail(email);

    if(exUser){
        return{
            success : false,
            message : "catte email deja utilisee"
        }
    }

    const passwordHash = await hashPassword(password);

    //create new user
    const newUser = {
        id : crypto.randomUUID(),
        name : name,
        email : email,
        phone : phone,
        passwordHash : passwordHash,
        rewardPoints : 0,
        createdAt : new Date().toISOString()
    }

    addUser(newUser);

    return{
        success: true,
        message : "compte cree avec succes"
    }
}

export async function loginUser(email, password) {
    email = email.trim().toLowerCase();

    if (!email || !password) {
        return {
            success: false,
            message: "Veuillez remplir tous les champs."
        };
    }

    const user = findUserByEmail(email);

    if (!user) {
        return {
            success: false,
            message: "Email ou mot de passe incorrect."
        };
    }

    const passwordHash = await hashPassword(password);

    if (passwordHash !== user.passwordHash) {
        return {
            success: false,
            message: "Email ou mot de passe incorrect."
        };
    }

    setCurrentUser(user.id);

    return {
        success: true,
        message: "Connexion réussie."
    };
}