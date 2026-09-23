import {initData, seedOffers, seedFlashOffers} from "./Storage/storage.js";
import { initRouter, replaceIndexFile } from "./Router/router.js";

document.addEventListener('DOMContentLoaded', () => {
    initData();
    initRouter();
    seedOffers();
    seedFlashOffers();
    replaceIndexFile();
})