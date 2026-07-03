const input_name = document.getElementById("input-name");
const checkicon = document.getElementById("check");
const continueBtn = document.getElementById("continueBtn");


const namesaved = localStorage.getItem("username");

if (namesaved) {
    input_name.value = namesaved;

    if (namesaved.length >= 3) {
        checkicon.classList.remove("hidden");
        continueBtn.disabled = false;
    }
}


input_name.addEventListener('input', (e) => {
    let auth = false;
    const valeur = e.target.value;
    if (e.target.value.length >= 3) {
        checkicon.classList.remove("hidden");
        auth = true;
    } else {
        checkicon.classList.add("hidden");
        auth = false;
    }
    localStorage.setItem("username", valeur);

    continueBtn.disabled = !auth;
});

continueBtn.addEventListener('click', () => {
    window.location.assign("/control/basic-logic")
});
