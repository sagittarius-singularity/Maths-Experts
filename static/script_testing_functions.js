/* © Maths Expert 2026 | All rights reserverd. */
/* This online mathematics learning site was created by Pablo Koussa Diaz and Noé T.. */
/* This repository may not be copied; any copying will result in legal action. */
/* The website is actually intented for 8th to 9th Grade | Middle to hight school. */
/* Our goal is to offer free online mathematics revision, as well as advanced lessons covering the high school curriculum. */
/* The images used are not protected. */

document.addEventListener("DOMContentLoaded", () => {
    const introductionText = document.querySelector(".introduction-text");
    const name = localStorage.getItem("username") || "l'ami";
    const completedExercises = new Set();
    const redirect_github_rep = "https://github.com/sagittarius-singularity/Maths-Experts";
    const github_logo = document.getElementById("github-logo");

    if (introductionText && name) {
        introductionText.innerHTML = `<p>Nous allons tout d'abord te tester sur les fonctionnalités basiques du site, ${name},</p>
        <p>C'est la partie la plus facile ne t'inquiète pas ! </p><br>
        <p>Complète tout simplement ce qu'on va te demander un peu en dessous;</p>`;
    }

    const unicodeExponents = {
        '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', 
        '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹',
        'a': 'ᵃ', 'b': 'ᵇ', 'c': 'ᶜ', 'd': 'ᵈ', 'e': 'ᵉ', 
        'f': 'ᶠ', 'g': 'ᵍ', 'h': 'ʰ', 'i': 'ⁱ', 'j': 'ʲ', 
        'k': 'ᵏ', 'l': 'ˡ', 'm': 'ᵐ', 'n': 'ⁿ', 'o': 'ᵒ', 
        'p': 'ᵖ', 'r': 'ʳ', 's': 'ˢ', 't': 'ᵗ', 'u': 'ᵘ', 
        'v': 'ᵛ', 'w': 'ʷ', 'x': 'ˣ', 'y': 'ʸ', 'z': 'ᶻ',
        '+': '⁺', '-': '⁻', '=': '⁼', '(': '⁽', ')': '⁾'
    };

    const continueBtn = document.getElementById("continueBtn");
    const btnContainers = document.querySelectorAll(".unityBtns");

    btnContainers.forEach(container => {
        const targetId = container.getAttribute("data-target");
        const textarea = document.getElementById(targetId);
        const buttons = container.querySelectorAll(".unityBtn, .unityBtn-2");
        const customInput = container.querySelector(".custom-input");

        let lastCursorStart = textarea ? textarea.value.length : 0;
        let lastCursorEnd = textarea ? textarea.value.length : 0;

        if (textarea) {
            ['click', 'keyup', 'input', 'focus'].forEach(eventType => {
                textarea.addEventListener(eventType, () => {
                    lastCursorStart = textarea.selectionStart;
                    lastCursorEnd = textarea.selectionEnd;
                });
            });
        }

        buttons.forEach(button => {
            button.addEventListener("click", () => {
                if (textarea) {
                    const textToInsert = button.textContent;

                    textarea.value = textarea.value.substring(0, lastCursorStart) + 
                                     textToInsert + 
                                     textarea.value.substring(lastCursorEnd);

                    lastCursorStart = lastCursorStart + textToInsert.length;
                    lastCursorEnd = lastCursorStart;

                    textarea.setSelectionRange(lastCursorStart, lastCursorEnd);
                    textarea.focus();
                    textarea.dispatchEvent(new Event('input'));
                }
            });
        });

        if (customInput) {
            customInput.addEventListener("input", () => {
                const text = customInput.value.toLowerCase();
                let converted = "";
                for (let char of text) {
                    converted += unicodeExponents[char] || char;
                }
                customInput.value = converted;
            });

            customInput.addEventListener("keydown", (e) => {
                if (e.key === "Enter") {
                    e.preventDefault();
                    if (customInput.value !== "" && textarea) {
                        const textToInsert = customInput.value;

                        textarea.value = textarea.value.substring(0, lastCursorStart) + 
                                         textToInsert + 
                                         textarea.value.substring(lastCursorEnd);

                        lastCursorStart = lastCursorStart + textToInsert.length;
                        lastCursorEnd = lastCursorStart;

                        customInput.value = "";
                        textarea.setSelectionRange(lastCursorStart, lastCursorEnd);
                        textarea.focus();
                        textarea.dispatchEvent(new Event('input'));
                    }
                }
            });
        }
    });

    [1, 2].forEach(num => {
        const responseArea = document.getElementById(`response-${num}`) || (num === 1 ? document.getElementById("response") : null);
        const checkBtn = document.querySelector(`.checkBtn[data-target="${num}"]`);
        
        if (responseArea) {
            responseArea.value = localStorage.getItem(`dev-response-testing-${num}`) || "";
            if (checkBtn) checkBtn.disabled = (responseArea.value.length < 2);

            responseArea.addEventListener('input', (e) => {
                const valeur = e.target.value;
                localStorage.setItem(`dev-response-testing-${num}`, valeur);
                if (checkBtn) checkBtn.disabled = (valeur.length < 2);
            });
        }
    });

    function checkresponse(valeur, exoNum) {
        if (exoNum === 1) {
            return valeur === "𝑥²";
        } else if (exoNum === 2) {
            return valeur === "𝑦⁹⁹";
        }
        return false;
    }

    const messageSucces = [
        `Hey ! Bien dit ${name} !`, `Magnifique ${name}`, `C'est parfait ${name} !`, `Excellent ${name} !`,
        `Incroyable ${name} !`, `Tu as fait mouche ${name} !`,
        `Tu as parfaitement compris ${name} !`,
        `Gg ${name} !`
    ];

    const messageError = [
        `Les bases maitrisées, tu excelleras ${name} !`
    ];

    continueBtn.addEventListener("click", () => {
        window.location.assign("/exercice/1")
    });

    github_logo.addEventListener("click", () => {
        window.location.assign("https://github.com/sagittarius-singularity/Maths-Experts");
    });

    const checkButtons = document.querySelectorAll(".checkBtn");
    checkButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const exoNum = parseInt(btn.getAttribute("data-target"));
            
            completedExercises.add(exoNum);

            if (completedExercises.size === 2 && continueBtn) {
                continueBtn.disabled = false;
            }

            const responseArea = document.getElementById(`response-${exoNum}`) || (exoNum === 1 ? document.getElementById("response") : null);
            const fast_response = document.getElementById(`fast-answer-${exoNum}`) || (exoNum === 1 ? document.getElementById("fast-answer") : null);
            const correction_container = document.getElementById(`correction-container-${exoNum}`) || (exoNum === 1 ? document.getElementById("correction-container") : null);
            const correctionDev = document.getElementById(`correction-dev-${exoNum}`) || (exoNum === 1 ? document.getElementById("correction-dev") : null);
            
            if (!responseArea) return;
            
            const currentResponseValue = responseArea.value;
            const initialTextContent = btn.textContent;

            if (exoNum === 1 && correctionDev) {
                correctionDev.innerHTML = `
                    <p>Ici nous te demandions tout simplement de réécrire le terme 𝑥² en utilisant les boutons un peu au dessus !</p><br>
                    <p>Il suffisait de cliquer sur le bouton 𝑥 puis de cliquer sur le bouton ².</p><br>
                    <p>→  <span style="text-decoration: underline dotted; text-decoration-color: #0d3b00;">  𝑥²</span></p><br><br>
                `;
            } else if (exoNum === 2 && correctionDev) {
                correctionDev.innerHTML = `
                    <p>Et encore là, nous te demandions tout simplement de réécrire la chaine de caractères : 𝑦⁹⁹ en utilisant les boutons un peu au dessus !</p><br>
                    <p>La tâche était légèrement plus dure mais pas impossible non plus, il suffisait de :</p><br>
                    <p>•  Cliquer sur le bouton 𝑦</p>
                    <p>•  Et cliquer sur le bouton de saisi et d'y écrire : 99 puis d'appuyer sur la touche "entrée".</p><br>
                    <p>→  <span style="text-decoration: underline dotted; text-decoration-color: #0d3b00;">  𝑦⁹⁹</span></p><br><br>
                `;
            }

            const loading_icon = document.createElement("img");
            loading_icon.src = "https://media.tenor.com/Pq1cZiuhlEEAAAAi/rajinikanth.gif";
            loading_icon.style.width = "12px";
            loading_icon.style.height = "12px";
            
            btn.innerHTML = "";
            btn.appendChild(loading_icon);
            btn.disabled = true;

            setTimeout(() => {
                if (checkresponse(currentResponseValue, exoNum)) {
                    const randomIndex = Math.floor(Math.random() * messageSucces.length);
                    if (fast_response) {
                        fast_response.textContent = messageSucces[randomIndex];
                        fast_response.style.color = "green";
                    }
                } else {
                    const randomIndex = Math.floor(Math.random() * messageError.length);
                    if (fast_response) {
                        fast_response.textContent = messageError[randomIndex];
                        fast_response.style.color = "red";
                    }
                }

                if (correction_container) {
                    correction_container.classList.remove("hidden");
                }

                btn.innerHTML = initialTextContent;
                btn.disabled = (responseArea.value.length < 2);
            }, 500); 
        });
    });
});
