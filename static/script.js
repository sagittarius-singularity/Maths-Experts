/* © Maths Expert 2026 | All rights reserverd. */
/* This online mathematics learning site was created by Pablo Koussa Diaz and Noé T.. */
/* This repository may not be copied; any copying will result in legal action. */
/* The website is actually intented for 8th to 9th Grade | Middle to hight school. */
/* Our goal is to offer free online mathematics revision, as well as advanced lessons covering the high school curriculum. */
/* The images used are not protected. */


const input_name = document.getElementById("input-name");
const checkicon = document.getElementById("check");
const continueBtn = document.getElementById("continueBtn");

const redirect_github_rep = "https://github.com/sagittarius-singularity/Maths-Experts";
const github_logo = document.getElementById("github-logo");
const youtube_logo = document.getElementById("youtube-logo");
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

continueBtn.addEventListener('click', (e) => {
    e.preventDefault(); 

    const data = new URLSearchParams();
    data.append('action', 'continueBtn');

    fetch('/', {
        method: 'POST',
        body: data
    })
    .then(response => {
        if (response.ok) {
            window.location.href = "/control/basic-logic";
        }
    });
});


github_logo.addEventListener("click", () => {
    window.location.assign("https://github.com/sagittarius-singularity/Maths-Experts");
});

youtube_logo.addEventListener("click", () => {
    window.location.assign("https://youtube.com/@Noe-u2i");
});