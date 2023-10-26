import { showModalSearch } from "./showSearch.js";
import { getDataApi } from "./getData.js";
import { displayItems } from "./displayItems.js";

let typeContent = "anime";

const URL_ANIME = "https://api.jikan.moe/v4/anime";
const URL_MANGA = "https://api.jikan.moe/v4/manga";

async function main(url, typeContent) {
    let data = "";
    switch (typeContent) {
        case "anime": {
            data = (await getDataApi(url)).data;
            console.log(data);
            break;
        }
        case "manga": {
            data = (await getDataApi(url)).data;
            console.log(data);
            break;
        }
    }

    displayItems(typeContent, data);
}

function closeModal() {
    modalWindow.classList.remove("modal-show");
    document.body.classList.remove("stop-scrolling");
}

const searchElement = document.querySelector(".search");
const modalWindow = document.querySelector(".modal");

searchElement.addEventListener("click", () => {
    const htmlModal = showModalSearch();

    modalWindow.classList.add("modal-show");
    document.body.classList.add("stop-scrolling");

    modalWindow.innerHTML = htmlModal;

    document
        .querySelector(".close-button")
        .addEventListener("click", closeModal);
});

function closeListeners() {
    window.addEventListener("click", (event) => {
        if (event.target === modalWindow) {
            closeModal();
        }
    });
}

<<<<<<< HEAD
closeListeners();
main(URL_ANIME, typeContent);
=======
main(URL);
closeListeners();
>>>>>>> d790862e753e313b5af51dcc51353b9a5b881ccb
