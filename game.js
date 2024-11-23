window.onload = function () {
    updateClock();
    setInterval(updateClock, 1000); // Päivitä joka sekunti
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
