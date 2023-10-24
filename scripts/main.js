import { showModalSearch } from "./showSearch.js";
import { getDataApi } from "./getData.js";
import { getDetailInfo } from "./showDetail.js";

const URL = "https://api.jikan.moe/v4/recommendations/anime";

async function main(url) {
    const postsData = await getDataApi(url);
    let currentPage = 1;
    const rows = 12;

    function displayList(arrData, rowPerPage, page) {
        const cards = document.querySelector(".cards");
        cards.innerHTML = "";
        page--;
        const start = rowPerPage * page;
        const end = start + rowPerPage;
        const pagiantedData = arrData.slice(start, end);

        pagiantedData.forEach((animeItem) => {
            const animeCard = document.createElement("div");
            animeItem["entry"].slice(0, 1).forEach((anime) => {
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
                animeCard.addEventListener("click", () =>
                    getDetailInfo(anime.mal_id)
                );
                cards.appendChild(animeCard);
            });
        });
    }

    function displayPagination(arrayData, rowPerPage) {
        const paginationEl = document.querySelector(".pagination");
        const pagesCount = Math.ceil(arrayData.length / rowPerPage);
        const ulEl = document.createElement("ul");

        ulEl.classList.add("pagination-list");

        for (let i = 0; i < pagesCount; i++) {
            const liEl = displayPaginationBtn(i + 1);
            ulEl.appendChild(liEl);
        }
        paginationEl.appendChild(ulEl);
    }

    function displayPaginationBtn(page) {
        const liEl = document.createElement("li");
        liEl.classList.add("pagination-item");
        liEl.innerText = page;

        if (currentPage === page) {
            liEl.classList.add("pagination-item-active");
        }

        liEl.addEventListener("click", () => {
            currentPage = page;
            displayList(postsData, rows, currentPage);

            let currentItemLi = document.querySelector(
                "li.pagination-item-active"
            );

            currentItemLi.classList.remove("pagination-item-active");
            liEl.classList.add("pagination-item-active");
        });

        return liEl;
    }

    displayList(postsData, rows, currentPage);
    displayPagination(postsData, rows);
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

function closeInputListeners() {
    window.addEventListener("click", (event) => {
        if (event.target === modalWindow) {
            closeModal();
        }
    });
}

main(URL);
closeInputListeners();
