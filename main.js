// Skapa användarnamn och visa välkomstmeddelande
document.getElementById("registreringsForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Förhindra formulärets standardbeteende
    
    const förnamn = document.getElementById("förnamn").value.trim();
    const efternamn = document.getElementById("efternamn").value.trim();

    // Kontrollera att båda fälten är ifyllda
    if (!förnamn || !efternamn) {
        alert("Fyll i både förnamn och efternamn!");
        return;
    }

    // Skapa användarnamn: efternamn i gemener + förnamn i gemener
    const användarnamn = efternamn.toLowerCase() + förnamn.charAt(0).toLowerCase();

    // Visa välkomstmeddelande
    const meddelande = `Välkommen ${förnamn}, ditt användarnamn är ${användarnamn}.`;
    document.getElementById("välkomstMeddelande").textContent = meddelande;

    // Visa nästa formulär (spelinformation)
    document.getElementById("spelinformation-sektion").style.display = "block"; // Näytä pelitiedot-lomake
});

// Spara spelinformation och visa meddelande
document.getElementById("spelinformationForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Förhindra formulärets standardbeteende
    
    const ålder = parseInt(document.getElementById("ålder").value, 10);
    let insats = document.getElementById("insats").value.trim();

    // Kontrollera att ålder är angiven och giltig
    if (isNaN(ålder)) {
        alert("Ange en giltig ålder!");
        return;
    }

    // Kontrollera minderårighet
    if (ålder < 18) {
        alert("Spel är inte tillåtet för minderåriga!");
        return;
    }

    // Ersätt decimaltecken från komma till punkt
    insats = insats.replace(",", ".");

    // Kontrollera att insatsen är ett giltigt tal och större än 0
    const insatsNummer = parseFloat(insats);

    if (isNaN(insatsNummer) || insatsNummer <= 0) {
        alert("Ange en giltig insats (t.ex. 10.5 eller 10,5)!");
        return;
    }

    // Om allt är korrekt, visa meddelande
    alert(`Information sparad: Du är ${ålder} år gammal och spelar med en insats på ${insatsNummer.toFixed(2)} €.`);

    // Visa "Gå till spel" knapp
    const nextButton = document.createElement("button");
    nextButton.textContent = "Gå till spel";
    nextButton.onclick = function () {
        // Om användaren har registrerat sig korrekt, går vi till spel-sidan.
        window.location.href = "games.html"; 
    };

    // Näytä painike pelisivulle siirtymistä varten
    document.getElementById("spelinformation-sektion").appendChild(nextButton);
});
