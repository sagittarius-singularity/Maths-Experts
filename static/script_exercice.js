/* © Maths Expert 2026 | All rights reserverd. */
/* This online mathematics learning site was created by Pablo Koussa Diaz and Noé T. */
/* This repository may not be copied; any copying will result in legal action. */
/* The website is actually intented for 8th to 9th Grade | Middle to hight school. */
/* Our goal is to offer free online mathematics revision, as well as advanced lessons covering the high school curriculum. */
/* The images used are not protected. */


document.addEventListener("DOMContentLoaded", () => {
    const introductionText = document.getElementById("introduction-text");
    const name = localStorage.getItem("username") || "";

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
        let texteStandardise = texteNettoye.replace(/𝑥/g, 'x');
        texteStandardise = texteStandardise.replace(/𝑦/g, 'y').replace(/−/g, '-');

        if (exoNum === 1) {
            return texteStandardise.includes("15x²-4x-32") || texteStandardise.includes("15x^2-4x-32");
        } else if (exoNum === 2) {
            return texteStandardise.includes("300x²-180x-480") || texteStandardise.includes("300x^2-180x-480");
        } else if (exoNum === 3) {
            return texteStandardise.includes("480x³+840x²-240x") || texteStandardise.includes("480x^3+840x^2-240x");
        } else if (exoNum === 4) {
            return texteStandardise.includes("5(3x+7)");
        } else if (exoNum === 5) {
            return texteStandardise.includes("(x+3)(x-3)") || texteStandardise.includes("(x-3)(x+3)");
        } else if (exoNum === 6) {
            return texteStandardise.includes("25x²+80x+64") || texteStandardise.includes("25x^2+80x+64");
        } else if (exoNum === 7) {
            return texteStandardise.includes("16x²-16x+4") || texteStandardise.includes("6x^2-16x+4");
        } else if (exoNum === 8) {
            return texteStandardise.includes("(2x+3)(3x-4)") || texteStandardise.includes("(3x-4)(2x+3)");
        } else if (exoNum === 9) {
            return texteStandardise.includes("(2x-3)(3x+5)") || texteStandardise.includes("(3x+5)(2x-3)");
        } else if (exoNum === 10) {
            return texteStandardise.includes("(x-3)(3x+8)") || texteStandardise.includes("(3x+8)(x-3)");
        } else if (exoNum === 11) {
            return texteStandardise.includes("(x-4)2(3x-1)") || texteStandardise.includes("2(3x-1)(x-4)");
        } else if (exoNum === 12) {
            return texteStandardise.includes("(2x+5)(x-13)") || texteStandardise.includes("(x-13)(2x+5)");
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
                    <strong>Étape 1 : Identifier et réduire l'expression</strong><br>
                    Nous cherchons à factoriser l'expression : 5𝑥 + 35 + 10𝑥<br>
                    En regroupant les termes en 𝑥, on obtient la forme réduite : 15𝑥 + 35<br><br>
                    
                    <strong>Étape 2 : Chercher le facteur commun</strong><br>
                    •  15𝑥 peut s'écrire : 5 × 3𝑥<br>
                    •  35 peut s'écrire : 5 × 7<br>
                    →  Le plus grand commun diviseur (facteur commun) est : 5<br><br>
                    
                    <strong>Étape 3 : Mettre en facteur et finaliser</strong><br>
                    = 5 × 3𝑥 + 5 × 7<br>
                    = 5 × (3𝑥 + 7)<br>
                    = <span style="text-decoration: underline dotted; text-decoration-color: #0d3b00;">5(3𝑥 + 7)</span>
                `;
            } else if (exoNum === 5 && correctionDev) {
                correctionDev.innerHTML = `
                    <strong>Étape 1 : Identifier l'expression</strong><br>
                    Nous cherchons à factoriser l'expression : 𝑥² - 9<br>
                    On remarque qu'il s'agit d'une différence de deux carrés de la forme 𝑎² - 𝑏².<br><br>
                    
                    <strong>Étape 2 : Reconnaître les carrés</strong><br>
                    •  Le premier terme est déjà au carré : 𝑥²<br>
                    •  Le deuxième terme est un carré parfait : 9 = 3²<br>
                    →  L'expression s'écrit donc : 𝑥² - 3² (avec 𝑎 = 𝑥 et 𝑏 = 3)<br><br>
                    
                    <strong>Étape 3 : Appliquer l'identité remarquable</strong><br>
                    = (𝑥 - 3)(𝑥 + 3)<br>
                    = <span style="text-decoration: underline dotted; text-decoration-color: #0d3b00;">(𝑥 - 3)(𝑥 + 3)</span>
                `;
            } else if (exoNum === 6 && correctionDev) {
                correctionDev.innerHTML = `
                    <strong>Étape 1 : Identifier l'identité remarquable</strong><br>
                    Nous cherchons à développer l'expression : (5𝑥 + 8)²<br>
                    Il s'agit d'une identité remarquable de la forme (𝑎 + 𝑏)² qui se développe en 𝑎² + 2𝑎𝑏 + 𝑏².<br><br>
                    
                    <strong>Étape 2 : Identifier 𝑎 et 𝑏</strong><br>
                    •  Le premier terme est 𝑎 = 5𝑥<br>
                    •  Le deuxième terme est 𝑏 = 8<br>
                    →  On applique la formule : (5𝑥)² + 2 × 5𝑥 × 8 + 8²<br><br>
                    
                    <strong>Étape 3 : Calculer et réduire</strong><br>
                    = 25𝑥² + 80𝑥 + 64<br>
                    = <span style="text-decoration: underline dotted; text-decoration-color: #0d3b00;">25𝑥² + 80𝑥 + 64</span>
                `;
            } else if (exoNum === 7 && correctionDev) {
                correctionDev.innerHTML = `
                    <strong>Étape 1 : Identifier l'expression</strong><br>
                    Nous étudions l'expression : (4𝑥 - 2)²<br>
                    Sous sa forme factorisée, elle s'écrit simplement comme le produit d'elle-même : (4𝑥 - 2)(4𝑥 - 2).<br><br>
                    
                    <strong>Étape 2 : Développer avec l'identité remarquable</strong><br>
                    Pour obtenir sa forme développée, on utilise la formule (𝑎 - 𝑏)² = 𝑎² - 2𝑎𝑏 + 𝑏² :<br>
                    •  𝑎 = 4𝑥  →  𝑎² = (4𝑥)² = 16𝑥²<br>
                    •  𝑏 = 2   →  𝑏² = 2² = 4<br>
                    •  Double produit : 2 × 4𝑥 × 2 = 16𝑥<br><br>
                    
                    <strong>Étape 3 : Réduire l'expression finale</strong><br>
                    = 16𝑥² - 16𝑥 + 4<br>
                    = <span style="text-decoration: underline dotted; text-decoration-color: #0d3b00;">16𝑥² - 16𝑥 + 4</span>
                `;
            } else if (exoNum === 8 && correctionDev) {
                correctionDev.innerHTML = `
                    <strong>Étape 1 : Identifier le facteur commun</strong><br>
                    Nous cherchons à factoriser l'expression : (2𝑥 + 3)(𝑥 - 5) + (2𝑥 + 3)(2𝑥 + 1)<br>
                    On remarque que le bloc (2𝑥 + 3) est présent dans les deux parties de l'addition.<br><br>
                    
                    <strong>Étape 2 : Mettre en facteur et regrouper le reste</strong><br>
                    On isole (2𝑥 + 3) et on place tout le reste dans de grands crochets :<br>
                    →  (2𝑥 + 3) [ (𝑥 - 5) + (2𝑥 + 1) ]<br><br>
                    
                    <strong>Étape 3 : Réduire l'intérieur des crochets</strong><br>
                    = (2𝑥 + 3)(𝑥 - 5 + 2𝑥 + 1)<br>
                    = (2𝑥 + 3)(3𝑥 - 4)<br>
                    = <span style="text-decoration: underline dotted; text-decoration-color: #0d3b00;">(2𝑥 + 3)(3𝑥 - 4)</span>
                `;
            } else if (exoNum === 9 && correctionDev) {
                correctionDev.innerHTML = `
                    <strong>Étape 1 : Faire apparaître le facteur commun</strong><br>
                    Nous cherchons à factoriser : (2𝑥 - 3)(𝑥 + 4) - (3 - 2𝑥)(2𝑥 + 1)<br>
                    On remarque que (3 - 2𝑥) est l'opposé de (2𝑥 - 3).<br>
                    En transformant le " - " central en " + ", on peut inverser les termes : -(3 - 2𝑥) = +(2𝑥 - 3)<br>
                    →  L'expression devient : (2𝑥 - 3)(𝑥 + 4) + (2𝑥 - 3)(2𝑥 + 1)<br><br>
                    
                    <strong>Étape 2 : Mettre en facteur et regrouper le reste</strong><br>
                    On isole le facteur commun (2𝑥 - 3) dans de grands crochets :<br>
                    →  (2𝑥 - 3) [ (𝑥 + 4) + (2𝑥 + 1) ]<br><br>
                    
                    <strong>Étape 3 : Réduire l'intérieur des crochets</strong><br>
                    = (2𝑥 - 3)(𝑥 + 4 + 2𝑥 + 1)<br>
                    = (2𝑥 - 3)(3𝑥 + 5)<br>
                    = <span style="text-decoration: underline dotted; text-decoration-color: #0d3b00;">(2𝑥 - 3)(3𝑥 + 5)</span>
                `;
            } else if (exoNum === 10 && correctionDev) {
                correctionDev.innerHTML = `
                    <strong>Étape 1 : Faire apparaître le facteur commun</strong><br>
                    Nous cherchons à factoriser : (𝑥 - 3)(2𝑥 + 5) + (𝑥² - 9)<br>
                    On remarque que (𝑥² - 9) est une différence de deux carrés qui se factorise en (𝑥 - 3)(𝑥 + 3).<br>
                    →  L'expression devient : (𝑥 - 3)(2𝑥 + 5) + (𝑥 - 3)(𝑥 + 3)<br><br>
                    
                    <strong>Étape 2 : Mettre en facteur et regrouper le reste</strong><br>
                    On isole le facteur commun (𝑥 - 3) dans de grands crochets :<br>
                    →  (𝑥 - 3) [ (2𝑥 + 5) + (𝑥 + 3) ]<br><br>
                    
                    <strong>Étape 3 : Réduire l'intérieur des crochets</strong><br>
                    = (𝑥 - 3)(2𝑥 + 5 + 𝑥 + 3)<br>
                    = (𝑥 - 3)(3𝑥 + 8)<br>
                    = <span style="text-decoration: underline dotted; text-decoration-color: #0d3b00;">(𝑥 - 3)(3𝑥 + 8)</span>
                `;
            } else if (exoNum === 11 && correctionDev) {
                correctionDev.innerHTML = `
                    <strong>Étape 1 : Identifier le facteur commun</strong><br>
                    Nous cherchons à factoriser : (3𝑥 - 1)² - (3𝑥 - 1)(𝑥 + 7)<br>
                    On sait que (3𝑥 - 1)² signifie (3𝑥 - 1)(3𝑥 - 1).<br>
                    Le bloc (3𝑥 - 1) est donc notre facteur commun.<br><br>
                    
                    <strong>Étape 2 : Mettre en facteur et regrouper le reste</strong><br>
                    On isole un bloc (3𝑥 - 1) et on place le reste dans de grands crochets en faisant attention au signe moins :<br>
                    →  (3𝑥 - 1) [ (3𝑥 - 1) - (𝑥 + 7) ]<br><br>
                    
                    <strong>Étape 3 : Réduire l'intérieur des crochets</strong><br>
                    Attention, le signe " - " devant la parenthèse change les signes à l'intérieur :<br>
                    = (3𝑥 - 1)(3𝑥 - 1 - 𝑥 - 7)<br>
                    = (3𝑥 - 1)(2𝑥 - 8)<br><br>
                    
                    <strong>Étape 4 : Factorisation maximale</strong><br>
                    On remarque que (2𝑥 - 8) peut encore se factoriser par 2, soit 2(𝑥 - 4) :<br>
                    = <span style="text-decoration: underline dotted; text-decoration-color: #0d3b00;">2(3𝑥 - 1)(𝑥 - 4)</span>
                `;                
            } else if (exoNum === 12 && correctionDev) {
                correctionDev.innerHTML = `
                    <strong>Étape 1 : Faire apparaître le facteur commun</strong><br>
                    Nous cherchons à factoriser : (4𝑥² - 25) + (2𝑥 + 5)(𝑥 - 3) - (2𝑥 + 5)²<br>
                    On remarque que (4𝑥² - 25) est une différence de deux carrés : (2𝑥)² - 5².<br>
                    Elle se factorise donc en : (2𝑥 - 5)(2𝑥 + 5)<br>
                    →  L'expression devient : (2𝑥 - 5)(2𝑥 + 5) + (2𝑥 + 5)(𝑥 - 3) - (2𝑥 + 5)(2𝑥 + 5)<br><br>
                    
                    <strong>Étape 2 : Mettre en facteur et regrouper le reste</strong><br>
                    Le bloc (2𝑥 + 5) est présent dans les trois termes. On l'isole dans de grands crochets :<br>
                    →  (2𝑥 + 5) [ (2𝑥 - 5) + (𝑥 - 3) - (2𝑥 + 5) ]<br><br>
                    
                    <strong>Étape 3 : Réduire l'intérieur des crochets</strong><br>
                    Attention au signe " - " devant la dernière parenthèse qui inverse les signes :<br>
                    = (2𝑥 + 5)(2𝑥 - 5 + 𝑥 - 3 - 2𝑥 - 5)<br>
                    = (2𝑥 + 5)(𝑥 - 13)<br>
                    = <span style="text-decoration: underline dotted; text-decoration-color: #0d3b00;">(2𝑥 + 5)(𝑥 - 13)</span>
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
                btn.disabled = (responseArea.value.length <= 9);
            }, 500); 
        });
    });
});
