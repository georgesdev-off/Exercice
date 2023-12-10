const motsList = [
    "javascript",
    "callback",
    "fonction",
    "recursive",
    "responsive",
    "serveur",
    "navigateur",
    "script",
    "index",
    "style",
    "document",
    "body",
    "boucle",
    "condition",
    "variable"
];

let motSecret;
let motCache = [];
let erreurs = 0;

function choisirMotSecret() {
    return motsList[Math.floor(Math.random() * motsList.length)];
}

function afficherMotsEtErreurs() {
    document.getElementById("word-display").textContent = motCache.join(' ');
    document.getElementById("error-count").textContent = erreurs;
}

function lettreCliquee(lettre) {
    lettre = lettre.toLowerCase();

    if (motSecret.includes(lettre)) {
        for (let i = 0; i < motSecret.length; i++) {
            if (motSecret[i] === lettre) {
                motCache[i] = lettre;
            }
        }
    } else {
        erreurs++;
    }

    afficherMotsEtErreurs();

    if (motCache.join('') === motSecret) {
        alert("Félicitations, vous avez deviné le mot secret : " + motSecret);
        resetJeu();
    } else if (erreurs >= 6) {
        alert("Désolé, vous avez atteint le nombre maximum d'erreurs. Le mot secret était : " + motSecret);
        resetJeu();
    }
}

function resetJeu() {
    motSecret = choisirMotSecret();
    motCache = Array(motSecret.length).fill('_');
    erreurs = 0;
    afficherMotsEtErreurs();
    const letters = document.querySelectorAll(".letter");
    letters.forEach(letter => {
        letter.disabled = false;
        letter.classList.remove("used");
    });
}

const letters = document.querySelectorAll(".letter");
letters.forEach(letter => {
    letter.addEventListener("click", () => {
        if (erreurs < 6 && motCache.join('') !== motSecret && !letter.disabled) {
            lettreCliquee(letter.textContent);
            letter.disabled = true;
            letter.classList.add("used");
        }
    });
});

document.addEventListener("keydown", (event) => {
    if (event.key.length === 1 && erreurs < 6 && motCache.join('') !== motSecret) {
        const lettrePressee = event.key.toLowerCase();
        if (lettrePressee.match(/[a-z]/)) {
            const boutons = document.querySelectorAll(".letter");
            for (let i = 0; i < boutons.length; i++) {
                if (!boutons[i].disabled && boutons[i].textContent.toLowerCase() === lettrePressee) {
                    lettreCliquee(boutons[i].textContent);
                    boutons[i].disabled = true;
                    boutons[i].classList.add("used");
                    break;
                }
            }
        }
    }
});

resetJeu();
