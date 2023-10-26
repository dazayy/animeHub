const sourceSearch = "img/icons/search.svg";
const sourceClose = "img/icons/close.svg";
export function showModalSearch() {
    console.log("done");
    return `
        <div class="modal-content">
            <div class="modal-button search-button">
                <img src="${sourceSearch}" alt="#">
            </div>
            <div class="modal-input-wrapper">
                <input class="modal-input" type="text" placeholder="Search">
            </div>
            <div class="modal-button close-button">
                <img src="${sourceClose}" alt="#">
            </div>
        </div>
    `;
}
