window.onload = function () {
    // Päivitä kello ja päivämäärä
    updateClock();
    setInterval(updateClock, 1000); // Päivitä joka sekunti

    // Peliajan ajastin
    const startButton = document.getElementById("start-timer");
    if (startButton) {
        startButton.addEventListener("click", startGameTimer);
    }

    // Luo responsiivinen navigointivalikko
    createNavbar();
    setupHamburgerMenu(); // Hampurilaisvalikon toiminta
};

function updateClock() {
    const timeElement = document.getElementById("time");
    const dateElement = document.getElementById("date");
    const statusElement = document.getElementById("status");
    const countdownSection = document.getElementById("countdown");
    const countdownTimer = document.getElementById("countdown-timer");

    if (timeElement && dateElement && statusElement && countdownSection && countdownTimer) {
        const now = new Date();

        // Päivitä kello ja päivämäärä
        timeElement.textContent = now.toLocaleTimeString();
        dateElement.textContent = now.toLocaleDateString();

        const currentDay = now.getDay(); // 0 = sunnuntai, 1 = maanantai, ..., 6 = lauantai
        const isWeekend = currentDay === 6 || currentDay === 0; // Lauantai tai sunnuntai

        if (isWeekend) {
            // Viikonloppu: näytä "Casino är stängt" ja countdown
            statusElement.textContent = "Casino är stängt för tillfället";
            countdownSection.style.display = "block";

            // Laske countdown maanantaihin klo 00:00
            const nextMonday = new Date(now);
            if (currentDay === 0) {
                nextMonday.setDate(now.getDate() + 1); // Sunnuntaina -> seuraava päivä on maanantai
            } else if (currentDay === 6) {
                nextMonday.setDate(now.getDate() + 2); // Lauantaina -> lisätään 2 päivää
            }
            nextMonday.setHours(0, 0, 0, 0); // Maanantai klo 00:00

            const timeDiff = nextMonday - now;
            const hours = Math.floor(timeDiff / (1000 * 60 * 60));
            const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

            countdownTimer.textContent = `Casino öppnar om ${hours} timmar, ${minutes} minuter och ${seconds} sekunder.`;
        } else {
            // Arkipäivä: näytä "Casino är öppet" ja piilota countdown
            statusElement.textContent = "Casino är öppet!";
            countdownSection.style.display = "none";
        }
    }
}

// Peliajan ajastimen toiminta
function startGameTimer() {
    const playtimeSelect = document.getElementById("playtime");
    const selectedTime = parseInt(playtimeSelect.value, 10);
    const endTime = new Date(Date.now() + selectedTime * 60 * 1000);

    document.getElementById("end-time").textContent = `Pelisessiosi päättyy klo ${endTime.toLocaleTimeString()}`;

    const timerElement = document.getElementById("timer-remaining");
    const interval = setInterval(() => {
        const now = new Date();
        const timeDiff = endTime - now;

        if (timeDiff <= 0) {
            clearInterval(interval);
            timerElement.textContent = "Pelisessio päättyi!";
            alert("Pelisessiosi on päättynyt!");
        } else {
            const minutes = Math.floor(timeDiff / 1000 / 60);
            const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
            timerElement.textContent = `Jäljellä: ${minutes} minuuttia, ${seconds} sekuntia.`;
        }
    }, 1000);
}

// Navigointivalikon luominen
function createNavbar() {
    const menuItems = [
        { text: "Etusivu", link: "index.html" },
        { text: "Muistipeli", link: "memory.html" },
        { text: "Kivi, sakset, paperi", link: "rps.html" },
        { text: "Kuvagalleria", link: "gallery.html" },
        { text: "Vaihda väriteema", link: "theme.html" }
    ];

    const menu = document.getElementById("menu");
    if (menu) {
        menuItems.forEach(item => {
            const li = document.createElement("li");
            const a = document.createElement("a");
            a.textContent = item.text;
            a.href = item.link;
            li.appendChild(a);
            menu.appendChild(li);
        });
    }
}

// Hampurilaisvalikon toiminta
function setupHamburgerMenu() {
    const hamburger = document.getElementById("hamburger");
    const menu = document.getElementById("menu");

    if (hamburger && menu) {
        hamburger.addEventListener("click", () => {
            menu.classList.toggle("hidden"); // Näytä/piilota menu
        });
    }
}
