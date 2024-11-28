// Tuo tallennettu väriteema käyttöön sivun latauksen yhteydessä
document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("background-color");
    const savedTextColor = localStorage.getItem("text-color");

    if (savedTheme) {
        document.body.style.backgroundColor = savedTheme;
    }
    if (savedTextColor) {
        document.body.style.color = savedTextColor;
        document.getElementById("text-color").value = savedTextColor;
    }
});

// Pudotusvalikko: vaihda taustaväri
document.getElementById("theme-select").addEventListener("change", (event) => {
    const selectedColor = event.target.value;
    document.body.style.backgroundColor = selectedColor;

    // Tallenna valinta localStorageen
    localStorage.setItem("background-color", selectedColor);
});

// Liukusäätimet: yhdistä värit ja vaihda taustaväri
const redSlider = document.getElementById("red-slider");
const greenSlider = document.getElementById("green-slider");
const blueSlider = document.getElementById("blue-slider");

const updateBackgroundColor = () => {
    const red = redSlider.value;
    const green = greenSlider.value;
    const blue = blueSlider.value;

    const rgbColor = `rgb(${red}, ${green}, ${blue})`;
    document.body.style.backgroundColor = rgbColor;

    // Tallenna localStorageen
    localStorage.setItem("background-color", rgbColor);
};

// Liitä liukusäätimiin tapahtumakuuntelijat
redSlider.addEventListener("input", updateBackgroundColor);
greenSlider.addEventListener("input", updateBackgroundColor);
blueSlider.addEventListener("input", updateBackgroundColor);

// Tekstin värin muuttaminen
document.getElementById("text-color").addEventListener("input", (event) => {
    const selectedTextColor = event.target.value;
    document.body.style.color = selectedTextColor;

    // Tallenna tekstiväri localStorageen
    localStorage.setItem("text-color", selectedTextColor);
});
