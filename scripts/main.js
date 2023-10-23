import { showModalSearch } from "./showSearch.js";

const URL = "https://api.jikan.moe/v4/recommendations/anime";

async function getDataApi(url) {
    const request = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await request.json();
    return data;

    // console.log(data);
    // console.log(data.data["0"]["entry"]);
}

async function main(url) {
    const postsData = await getDataApi(url);
    let currentPage = 1;
    let rows = 10;

    function displayList(arrData, rowPerPage, page) {
        const cards = document.querySelector(".cards");
        data.data.forEach((animeItem) => {
            const animeCard = document.createElement("div");
            animeItem["entry"].forEach((anime) => {
                animeCard.classList.add("card");

                animeCard.innerHTML = `
                    <div class="card__cover-inner">
                        <img class="card__cover-inner-img" src="${anime.images.jpg["image_url"]}" alt="" class="card-img">
                        <div class="card-darked"></div>
                    </div>
                    <div class="card-info">
                        <h2 class="card-title">${anime.title}</h2>
                    </div>
                `;
                cards.appendChild(animeCard);
            });
        });
    }
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

window.addEventListener("click", (event) => {
    if (event.target === modalWindow) {
        closeModal();
    }
});
