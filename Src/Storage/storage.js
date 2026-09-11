const STORAGE_DATA = "smartbank-data";

const initialData = {
    users : [],
    currentUserId : null,
    offers : [],
    simulations : [],
    rewards : [],
    flashOffers : [],
    activities : []
}

export function initData(){
    const existingStorage = localStorage.getItem(STORAGE_DATA);

    if(!existingStorage){
        localStorage.setItem(STORAGE_DATA, JSON.stringify(initialData));
    }
}

export function getData(){
    const storedData = localStorage.getItem(STORAGE_DATA);
    if(!storedData){
        initData();

        return JSON.parse(localStorage.getItem(STORAGE_DATA));
    }

    return JSON.parse(storedData);
}

//function pour save data chaque foit change

export function saveData(data){
    localStorage.setItem(STORAGE_DATA, JSON.stringify(data));
}

//function pour resett data test

export function resetStorage(){
    localStorage.removeItem(STORAGE_DATA);

    initData();
}

export function findUserByEmail(email){
    const data = getData();

    return data.users.find( user => user.email.toLowerCase() === email.trim().toLowerCase());
}

export function addUser(user){
    const data = getData();

    const tableUsers = data.users;

    tableUsers.push(user);

    saveData(data);
}

export function setCurrentUser(userId) {
    const data = getData();

    data.currentUserId = userId;

    saveData(data);
}

export function getCurrentUser() {
    const data = getData();

    const currentUser = data.users.find(
        user => user.id === data.currentUserId
    );

    return currentUser || null;
}

export function logoutUser() {
    const data = getData();

    data.currentUserId = null;

    saveData(data);
}

export function clearCurrentUser() {
    const data = getData();

    data.currentUserId = null;

    saveData(data);
}

//fake data pour le test 

const defaultOffers = [
    {
        id: "offer-1",
        title: "Credit personnel",
        type: "personnel",
        description: "Financez vos projets personnels simplement.",
        rate: 5.5,
        maxAmount: 200000,
        duration: 60,
        badge: "Populaire",
        isActive: true
    },
    {
        id: "offer-2",
        title: "Credit automobile",
        type: "automobile",
        description: "Une solution pour financer votre voiture.",
        rate: 4.8,
        maxAmount: 300000,
        duration: 84,
        badge: "Nouveau",
        isActive: true
    },
    {
        id: "offer-3",
        title: "Credit logement",
        type: "logement",
        description: "Réalisez votre projet immobilier.",
        rate: 4.2,
        maxAmount: 1000000,
        duration: 240,
        badge: "Recommandé",
        isActive: true
    }
];

//add fake data

export function seedOffers(){
    const data = getData();

    if(data.offers.length == 0){
        data.offers = defaultOffers;

        saveData(data);
    }
}

//save sumlation
export function addSimulation(simulation) {
    const data = getData();

    data.simulations.push(simulation);

    saveData(data);
}