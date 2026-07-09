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
        introductionText.innerHTML = `<p>Re ${name} sur cette deuxième partie consacrée aux révisions de 3ème sur les équations et inéquations !</p><br>
        <p>Complète simplement ce qu'on va te demander un peu en dessous;</p>
        <p><span style="text-decoration: underline dotted; text-decoration-color: #ffffff; background-color: transparent; color: #850404dd; font-weight: bold; display: inline-block;">Attention</span> : Nous allons tester la présence de de la ligne <i>𝑥 = [...]</i> dans votre raisonnement. Incluez la donc bien !</p>`;
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
        const buttons = container.querySelectorAll(".unityBtn, .unityBtn-2, .unityBtn-3, .unityBtn-4, .unityBtn-5, .unityBtn-6, .unityBtn-7, .unityBtn-8, .unityBtn-9, .unityBtn-10, .unityBtn-11, .unityBtn-12");
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
        const responseArea = document.getElementById(`response-${num}`) || (num === 1 ? document.getElementById("response") : null);
        const checkBtn = document.querySelector(`.checkBtn[data-target="${num}"]`);
        
        if (responseArea) {
            responseArea.value = localStorage.getItem(`dev-response-exercice-2-${num}`) || "";
            if (checkBtn) checkBtn.disabled = (responseArea.value.length < 3);

            responseArea.addEventListener('input', (e) => {
                const valeur = e.target.value;
                localStorage.setItem(`dev-response-exercice-2-${num}`, valeur);
                if (checkBtn) checkBtn.disabled = (valeur.length < 3);
            });
        }
    });

    function checkresponse(valeur, exoNum) {
        const texteNettoye = valeur.toLowerCase().replace(/\s+/g, '');
        let texteStandardise = texteNettoye.replace(/𝑥/g, 'x');
        texteStandardise = texteStandardise.replace(/−/g, '-');

        if (exoNum === 1) {
            return texteStandardise.includes("x=-1/6") || texteStandardise.includes("x=-1÷6") || texteStandardise.includes("x=0.16") || texteStandardise.includes("x=0,16");
        } else if (exoNum === 2) {
            return texteStandardise.includes("x=0");
        } else if (exoNum === 3) {
            return texteStandardise.includes("∅");
        } else if (exoNum === 4) {
            return texteStandardise.includes("-1");
        } else if (exoNum === 5) {
            return texteStandardise.includes("x=3");
        } else if (exoNum === 6) {
            return texteStandardise.includes("x=3") || texteStandardise.includes("x=-4");
        } else if (exoNum === 7) {
            return texteStandardise.includes("x=0") || texteStandardise.includes("x=4/3") || texteStandardise.includes("x=4÷3") || texteStandardise.includes("x=1.3") || texteStandardise.includes("x=1,3");
        } else if (exoNum === 8) {
            return texteStandardise.includes("x=1") || texteStandardise.includes("x=-4");
        } else if (exoNum === 9) {
            return texteStandardise.includes("x=2/3") ||  texteStandardise.includes("x=2÷3") || texteStandardise.includes("x=0.66") || texteStandardise.includes("x=0,66");
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
        `Dommage ${name} ! Même une IA se trompe pour progresser !`,
        `Ce n'est pas grave, ${name}, revoyons cela ensemble !`,
        `Seule l'intention compte ! Applaudis-toi pour avoir essayé !`,
        `Tkt pas ${name}, comme disait Sophocle : "Se tromper est le fait de tous les hommes."`,
        `Hey, ${name}, pas de panique, d'Edison : "Je n'ai pas échoué. J'ai simplement trouvé 10 000 solutions qui ne fonctionnent pas."`,
        `Hey ! Tu restes un génie au fond de toi, d'Einstein : "Quiconque n'a jamais commis d'erreur n'a jamais tenté d'innover."`,
        `Reste déterminé ${name}, 🏀 Jordan disait : "J'ai raté plus de 9000 tirs... C'est pourquoi j'ai réussi."`,
        `La prochaine fois tu seras plus expérimenté ${name} !`
    ];

    continueBtn.addEventListener("click", () => {
        window.location.assign("/exercice/3")
    });

    github_logo.addEventListener("click", () => {
        window.location.assign("https://github.com/sagittarius-singularity/Maths-Experts");
    });

    const checkButtons = document.querySelectorAll(".checkBtn");
    checkButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const exoNum = parseInt(btn.getAttribute("data-target"));
            
            completedExercises.add(exoNum);

            if (completedExercises.size === 12 && continueBtn) {
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
                    <strong>Étape 1 : Isoler les termes en 𝑥 d'un côté et les nombres de l'autre</strong><br>
                    Nous cherchons à résoudre l'équation : 3𝑥 + 6 = 5 - 3𝑥 :<br><br>
                    <strong>Étape 2 : Regroupement des termes</strong><br>
                    → On ajoute 3𝑥 des deux côtés et on soustrait 6 des deux côtés.<br><br>
                    <strong>Étape 3 : Le calcul + la réduction et la résolution de l'équation :</strong><br>
                    = 3𝑥 + 3𝑥 = 5 - 6<br>
                    = 6𝑥 = -1</em><br>
                    = <span style="text-decoration: underline dotted; text-decoration-color: #0d3b00;">𝑥 = -1/6</span><br><br>
                `;
            } else if (exoNum === 2 && correctionDev) {
                correctionDev.innerHTML = `
                    <strong>Étape 1 : Isoler le terme en 𝑥 d'un côté et les nombres de l'autre</strong><br>
                    Nous cherchons à résoudre l'équation : 𝑥 - 3 = -3 :<br><br>
                    <strong>Étape 2 : Regroupement des termes</strong><br>
                    → On ajoute 3 des deux côtés de l'équation.<br><br>
                    <strong>Étape 3 : Le calcul + la réduction et la résolution de l'équation :</strong><br>
                    = 𝑥 = -3 + 3<br>
                    = <span style="text-decoration: underline dotted; text-decoration-color: #0d3b00;">𝑥 = 0</span><br><br>
                `;
            } else if (exoNum === 3 && correctionDev) {
                correctionDev.innerHTML = `
                    <strong>Étape 1 : Isoler les termes en 𝑥 d'un côté et les nombres de l'autre</strong><br>
                    Nous cherchons à résoudre l'équation : 6𝑥 - 1 = 4𝑥 + 2 + 2𝑥 :<br><br>
                    <strong>Étape 2 : Regroupement des termes</strong><br>
                    → On simplifie d'abord le côté droit : 4𝑥 + 2𝑥 = 6𝑥.<br>
                    L'équation devient : 6𝑥 - 1 = 6𝑥 + 2.<br>
                    On soustrait 6𝑥 des deux côtés et on ajoute 1 des deux côtés.<br><br>
                    <strong>Étape 3 : Le calcul + la réduction et la résolution de l'équation :</strong><br>
                    = 6𝑥 - 6𝑥 = 2 + 1<br>
                    = 0 = 3<br>
                    = ∅<p><span style="text-decoration: underline dotted; text-decoration-color: #0d3b00;">∅</span> →  Cette équation n'a pas de solution (0 est impossible)</p><br><br>
                `; 
            } else if (exoNum === 4 && correctionDev) {
                correctionDev.innerHTML = `
                    <strong>Étape 1 : Isoler les termes en 𝑥 d'un côté et les nombres de l'autre</strong><br>
                    Nous cherchons à résoudre l'équation : 2𝑥(2 + 3) = 4𝑥 - 6 :<br><br>
                    <strong>Étape 2 : Regroupement des termes</strong><br>
                    → On simplifie la parenthèse : 2 + 3 = 5, ce qui donne 2𝑥 × 5 = 10𝑥.<br>
                    L'équation devient : 10𝑥 = 4𝑥 - 6.<br>
                    On soustrait 4𝑥 des deux côtés.<br><br>
                    <strong>Étape 3 : Le calcul + la réduction et la résolution de l'équation :</strong><br>
                    = 10𝑥 - 4𝑥 = -6<br>
                    = 6𝑥 = -6<br>
                    = <span style="text-decoration: underline dotted; text-decoration-color: #0d3b00;">𝑥 = -1</span><br><br>
                `;
            } else if (exoNum === 5 && correctionDev) {
                correctionDev.innerHTML = `
                    <strong>Étape 1 : Isoler les termes en 𝑥 d'un côté et les nombres de l'autre</strong><br>
                    Nous cherchons à résoudre l'équation : 𝑥² + 5𝑥 = 𝑥² + 2𝑥 + 9 :<br><br>
                    <strong>Étape 2 : Regroupement des termes</strong><br>
                    → On soustrait 𝑥² des deux côtés. Les carrés s'annulent (𝑥² - 𝑥² = 0).<br>
                    L'équation devient un premier degré classique : 5𝑥 = 2𝑥 + 9.<br>
                    On soustrait ensuite 2𝑥 des deux côtés.<br><br>
                    <strong>Étape 3 : Le calcul + la réduction et la résolution de l'équation :</strong><br>
                    = 5𝑥 - 2𝑥 = 9<br>
                    = 3𝑥 = 9<br>
                    = <span style="text-decoration: underline dotted; text-decoration-color: #0d3b00;">𝑥 = 3</span><br><br>
                `;
            } else if (exoNum === 6 && correctionDev) {
                correctionDev.innerHTML = `
                    <strong>Étape 1 : Isoler les termes en 𝑥 d'un côté et les nombres de l'autre</strong><br>
                    Nous cherchons à résoudre l'équation produit nul : (𝑥 - 3)(2𝑥 + 8) = 0 :<br><br>
                    <strong>Étape 2 : Regroupement des termes</strong><br>
                    → Un produit est nul si l'un de ses facteurs est nul.<br>
                    On sépare l'équation en deux équations du premier degré :<br><br>
                    Soit 𝑥 - 3 = 0  │  Soit 2𝑥 + 8 = 0<br><br>
                    <strong>Étape 3 : Le calcul + la réduction et la résolution de l'équation :</strong><br>
                    D'une part : 𝑥 = 3<br>
                    D'autre part : 2𝑥 = -8  →  𝑥 = -8/2  →  𝑥 = -4<br>
                    = <span style="text-decoration: underline dotted; text-decoration-color: #0d3b00;">Les solutions sont 𝑥 = 3 et 𝑥 = -4</span><br><br>
                `;
            } else if (exoNum === 7 && correctionDev) {
                correctionDev.innerHTML = `
                    <strong>Étape 1 : Isoler les termes en 𝑥 d'un côté et les nombres de l'autre</strong><br>
                    Nous cherchons à résoudre l'équation : 3𝑥(2𝑥 - 5) + 3𝑥(𝑥 + 1) = 0 :<br><br>
                    <strong>Étape 2 : Regroupement des termes</strong><br>
                    → On repère le facteur commun 3𝑥 pour factoriser l'expression :<br>
                    3𝑥 [ (2𝑥 - 5) + (𝑥 + 1) ] = 0<br>
                    3𝑥 (2𝑥 - 5 + 𝑥 + 1) = 0  →  3𝑥(3𝑥 - 4) = 0.<br>
                    On sépare maintenant en deux équations du premier degré :<br><br>
                    Soit 3𝑥 = 0  │  Soit 3𝑥 - 4 = 0<br><br>
                    <strong>Étape 3 : Le calcul + la réduction et la résolution de l'équation :</strong><br>
                    D'une part : 𝑥 = 0/3  →  𝑥 = 0<br>
                    D'autre part : 3𝑥 = 4  →  𝑥 = 4/3<br>
                    = <span style="text-decoration: underline dotted; text-decoration-color: #0d3b00;">Les solutions sont 𝑥 = 0 et 𝑥 = 4/3</span><br><br>
                `;
            } else if (exoNum === 8 && correctionDev) {
                correctionDev.innerHTML = `
                    <strong>Étape 1 : Isoler les termes en 𝑥 d'un côté et les nombres de l'autre</strong><br>
                    Nous cherchons à résoudre l'équation : (2𝑥 + 3)² - 25 = 0 :<br><br>
                    <strong>Étape 2 : Regroupement des termes</strong><br>
                    → On reconnaît l'identité remarquable 𝑎² - 𝑏² avec 𝑎 = (2𝑥 + 3) et 𝑏 = 5 (car 5² = 25).<br>
                    On factorise : [ (2𝑥 + 3) - 5 ] [ (2𝑥 + 3) + 5 ] = 0<br>
                    On réduit : (2𝑥 - 2)(2𝑥 + 8) = 0.<br>
                    On sépare en deux équations du premier degré :<br><br>
                    Soit 2𝑥 - 2 = 0  │  Soit 2𝑥 + 8 = 0<br><br>
                    <strong>Étape 3 : Le calcul + la réduction et la résolution de l'équation :</strong><br>
                    D'une part : 2𝑥 = 2  →  𝑥 = 1<br>
                    D'autre part : 2𝑥 = -8  →  𝑥 = -4<br>
                    = <span style="text-decoration: underline dotted; text-decoration-color: #0d3b00;">Les solutions sont 𝑥 = 1 et 𝑥 = -4</span><br><br>
                `;
            } else if (exoNum === 9 && correctionDev) {
                correctionDev.innerHTML = `
                    <strong>Étape 1 : Isoler les termes en 𝑥 d'un côté et les nombres de l'autre</strong><br>
                    Nous cherchons à résoudre l'équation : 9𝑥² - 12𝑥 + 4 = 0 :<br><br>
                    <strong>Étape 2 : Regroupement des termes</strong><br>
                    → On reconnaît l'identité remarquable 𝑎² - 2𝑎𝑏 + 𝑏² avec 𝑎 = 3𝑥 (car (3𝑥)² = 9𝑥²) et 𝑏 = 2 (car 2² = 4).<br>
                    On factorise sous la forme (𝑎 - 𝑏)² : (3𝑥 - 2)² = 0.<br>
                    Un carré est nul si et seulement si le nombre à l'intérieur est nul :<br>
                    3𝑥 - 2 = 0<br><br>
                    <strong>Étape 3 : Le calcul + la réduction et la résolution de l'équation :</strong><br>
                    = 3𝑥 = 2<br>
                    = <span style="text-decoration: underline dotted; text-decoration-color: #0d3b00;">𝑥 = 2/3</span><br><br>
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
                btn.disabled = (responseArea.value.length < 3);
            }, 500); 
        });
    });
});
