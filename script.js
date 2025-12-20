// Récupération du canvas
const canvas = document.getElementById("sheet");
const ctx = canvas.getContext("2d");

// Dessin simple (exemple)
function generate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Fond blanc
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    console.log("Génération lancée");
}

// Télécharger en PNG
function downloadPNG() {
    const link = document.createElement("a");
    link.download = "feuille.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
}

// Télécharger en PDF A4
function downloadPDF() {
    const { jsPDF } = window.jspdf;

    const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4"
    });

    const imgData = canvas.toDataURL("image/png");

    // Dimensions A4 utiles
    const margin = 10;
    const pdfWidth = 210 - margin * 2;
    const pdfHeight = 297 - margin * 2;

    pdf.addImage(imgData, "PNG", margin, margin, pdfWidth, pdfHeight);
    pdf.save("feuille_A4.pdf");

    console.log("PDF téléchargé");
}
