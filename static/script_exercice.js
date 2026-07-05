document.addEventListener("DOMContentLoaded", () => {
    const introductionText = document.getElementById("introduction-text");
    const name = localStorage.getItem("username") || "quelqu'un d'inconnu";

    if (introductionText && name) {
        introductionText.textContent = `Allez, ${name}, ne perdons pas de temps ! Commençons donc avec ce premier exercice.`;
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

    const btnContainers = document.querySelectorAll(".unityBtns");
    btnContainers.forEach(container => {
        const targetId = container.getAttribute("data-target");
        const textarea = document.getElementById(targetId);
        const buttons = container.querySelectorAll(".unityBtn, .unityBtn2, .unityBtn3, .unityBtn4, .unityBtn5, .unityBtn6, .unityBtn7, .unityBtn8, .unityBtn9, .unityBtn10, .unityBtn11, .unityBtn12");
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

    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].forEach(num => {
        const responseArea = document.getElementById(`response-${num}`);
        const checkBtn = document.querySelector(`.checkBtn[data-target="${num}"]`);
        
        if (responseArea) {
            responseArea.value = localStorage.getItem(`dev-response-${num}`) || "";
            if (checkBtn) checkBtn.disabled = (responseArea.value.length <= 9);

            responseArea.addEventListener('input', (e) => {
                const valeur = e.target.value;
                localStorage.setItem(`dev-response-${num}`, valeur);
                if (checkBtn) checkBtn.disabled = (valeur.length <= 9);
            });
        }
    });

    function checkresponse(valeur, exoNum) {
        const texteNettoye = valeur.toLowerCase().replace(/\s+/g, '');
        const texteStandardise = texteNettoye.replace(/𝑥/g, 'x');

        if (exoNum === 1) {
            return texteStandardise.includes("15x²-4x-32") || texteStandardise.includes("15x^2-4x-32");
        } else if (exoNum === 2) {
            return texteStandardise.includes("300x²-180x-480") || texteStandardise.includes("300x^2-180x-480");
        } else if (exoNum === 3) {
            return texteStandardise.includes("80x³+140x²-40x") || texteStandardise.includes("80x^3+140x^2-40x") || texteStandardise.includes("80x³+140x²−40x​");
        }

        return false;
    }

    const messageSucces = [
        `Hey ! Bien dit ${name}`, `Magnifique ${name}`, `C'est parfait ${name}`, `Excellent ${name}`,
        `Incroyable ${name} !`, `Wawww ${name} !`, `Tu as fait mouche ${name} !`,
        `Prochaine lumière de l'humanité ${name} ?`, `Tu as parfaitement compris ${name} !`,
        `Gg ${name} !`, `Presque aussi doué(e) que Pablo, ${name} !`
    ];

    const messageError = [
        `Dommage ${name} ! Même une IA se trompe pour progresser !`,
        `Ce n'est pas grave, ${name}, revoyons cela ensemble !`,
        `Seule l'intention compte ! Applaudis-toi pour avoir essayé !`,
        `Tkt pas ${name}, comme disait Sophocle : "Se tromper est le fait de tous les hommes."`,
        `Hey, ${name}, pas de panique, d'Edison : "Je n'ai pas échoué. J'ai simplement trouvé 10 000 solutions qui ne fonctionnent pas."`,
        `Hey ! Tu restes un génie au fond de toi, d'Einstein : "Quiconque n'a jamais commis d'erreur n'a jamais tenté d'innover."`,
        `Reste déterminé ${name}, 🏀 Jordan disait : "J'ai raté plus de 9000 tirs... C'est pourquoi j'ai réussi."`,
        `La prochaine fois tu seras plus expérimenté ${name} !`
    ];


    const continueBtn = document.getElementById("continueBtn");


    const checkButtons = document.querySelectorAll(".checkBtn");
    checkButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const exoNum = parseInt(btn.getAttribute("data-target"));
            const responseArea = document.getElementById(`response-${exoNum}`);
            const fast_response = document.getElementById(`fast-answer-${exoNum}`);
            const correction_container = document.getElementById(`correction-container-${exoNum}`);
            const correctionDev = document.getElementById(`correction-dev-${exoNum}`);
            
            if (!responseArea) return;
            
            const currentResponseValue = responseArea.value;
            const initialTextContent = btn.textContent;

            if (exoNum === 1 && correctionDev) {
                correctionDev.innerHTML = `
                    <strong>Étape 1 : Identifier l'expression</strong><br>
                    Nous cherchons à obtenir la forme développée : (3𝑥 + 4)(5𝑥 - 8):<br><br>
                    <strong>Étape 2 : La méthode de double distributivité</strong><br>
                    → <i>a × c + a × d + b × c + b × d</i><br><br>
                    <strong>Étape 3: L'application + la réduction et ordonnement de l'expression:</strong><br>
                    = <em>3𝑥 × 5x + 3𝑥 × -8 + 4 × 5𝑥 + 4 × -8</em><br>
                    = <em>15𝑥² - 24𝑥 + 20𝑥 - 32</em><br>
                    = <span style="text-decoration: underline dotted; text-decoration-color: #0d3b00;">15𝑥² - 4𝑥 - 32</span><br><br>
                `;

            } else if (exoNum === 2 && correctionDev) {
                correctionDev.innerHTML = `
                    <strong>Étape 1 : Identifier l'expression</strong><br>
                    Nous cherchons à obtenir la forme développée : (5 + 7)(5𝑥 - 8)(5𝑥 + 5):<br><br>
                    <strong>Étape 2 : Calculer la constante</strong><br>
                    (5 + 7) = 12<br><br>
                    <strong>Étape 3: L'application de double distributivité + la réduction et l'ordonnement de l'expression:</strong><br>
                    = 12 × (5𝑥 - 8)(5𝑥 + 5)<br>
                    = 12 × (25𝑥² + 25𝑥 - 40𝑥 - 40)<br>
                    = 12 × (25𝑥² - 15𝑥 - 40)<br>
                    = <span style="text-decoration: underline dotted; text-decoration-color: #0d3b00;">300𝑥² - 180𝑥 - 480</span>
                `;
            } else if (exoNum === 3 && correctionDev) {
                correctionDev.innerHTML = `
                    <strong>Étape 1 : Identifier l'expression</strong><br>
                    Nous cherchons à obtenir la forme développée : (2 + 𝑥)(8𝑥 - 2)(5𝑥 + 5𝑥)(4 + 2)<br><br>
                    
                    <strong>Étape 2 : Simplifier les blocs simples</strong><br>
                    •  (5𝑥 + 5𝑥) = 10𝑥<br>
                    •  (4 + 2) = 6<br>
                    →  Le produit de ces deux constantes donne : 10𝑥 × 6 = 60𝑥 !<br><br>
                    
                    <strong>Étape 3 : Double distributivité et réduction</strong><br>
                    = 60𝑥 × (2 + 𝑥)(8𝑥 - 2)<br>
                    = 60𝑥 × (16𝑥 - 4 + 8𝑥² - 2𝑥)<br>
                    = 60𝑥 × (8𝑥² + 14𝑥 - 4)<br>
                    = <span style="text-decoration: underline dotted; text-decoration-color: #0d3b00;">480𝑥³ + 840𝑥² - 240𝑥</span>
                `;
            } else if (exoNum === 4 && correctionDev) {
                correctionDev.innerHTML = `
                
                `
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
                btn.disabled = (responseArea.value.length <= 9);
            }, 500); 
        });
    });
});
