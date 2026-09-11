import {initData, seedOffers} from "./Storage/storage.js";
import { initRouter } from "./Router/router.js";

document.addEventListener('DOMContentLoaded', () => {
    initData();
    initRouter();
    seedOffers();
})