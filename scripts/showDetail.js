import { getDataApi } from "./getData.js";

export async function getDetailInfo(id) {
    const url = `https://api.jikan.moe/v4/anime/${id}/full`;
    const data = await getDataApi(url);
    console.log(data);

    const modalWindow = document.querySelector(".modal");
    const detailDiv = document.createElement("div");

    modalWindow.innerHTML = "";

    modalWindow.classList.add("modal-show");
    document.body.classList.add("stop-scrolling");
    detailDiv.classList.add("more-detail");

    detailDiv.innerHTML = `
        <div class="more-detail-card">
            <div class="more-detail-inner">
                <img src="${data.images.jpg["image_url"]}">
               
            
            </div>
            
            
            <dvi class="more-detail-info">
                <h2 class="more-detail-title">Title: ${data.title}</h2>
                <p class="more-detail-episodes">Episodes: ${data.episodes}</p>
                <p class="more-detail-status">Status: ${data.status}</p>
                <p class="more-detail-rating">Rating: ${data.rating}</p>
                <a class="more-detail-studio">Studio: ${data.studios.name}</p>
                <p>Trailer: <a href="${data.trailer["embed_url"]}" class="more-detail-trailer" target="blank"> Show Trailer</a></p>
                

            </dvi>
        </div>
        `;
    modalWindow.appendChild(detailDiv);
}
