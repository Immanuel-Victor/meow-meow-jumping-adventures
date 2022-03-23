const modal = document.querySelector(".modal");
const scoreInput = document.querySelector("#score_input");
const scoreIndicator = document.querySelector("#score");

let score = 20;

document.addEventListener("keydown", (e) => {
    if(e.key == '>') {
        toggleModal()
    }
});

function toggleModal() {

    scoreInput.value = score;
    scoreIndicator.textContent = score;

    modal.classList.toggle("visible_modal");
}