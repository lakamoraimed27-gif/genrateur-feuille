const canvas = document.getElementById("sheet");
const ctx = canvas.getContext("2d");

const MM_TO_PX = 3.78;

// Effacer le canvas
function clearCanvas() {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Grille quadrillée
function drawGrid(sizeMM, color) {
    const sizePX = sizeMM * MM_TO_PX;
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;

    for (let x = 0; x <= canvas.width; x += sizePX) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }

    for (let y = 0; y <= canvas.height; y += sizePX) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
}

// Grille pointillée
function drawDottedGrid(sizeMM, color) {
    const sizePX = sizeMM * MM_TO_PX;
    ctx.fillStyle = color;

    for (let x = 0; x <= canvas.width; x += sizePX) {
        for (let y = 0; y <= canvas.height; y += sizePX) {
            ctx.beginPath();
            ctx.arc(x, y, 1, 0, Math.PI * 2);
            ctx.fill();
        }
    }
}

// Génération
function generate() {
    clearCanvas();

    const type = document.getElementById("type").value;
    const color = document.getElementById("color").value;

    if (type === "quadrille5") drawGrid(5, color);
    if (type === "quadrille10") drawGrid(10, color);
    if (type === "pointille5") drawDottedGrid(5, color);
    if (type === "vierge") return;
}

// Télécharger PDF
function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF("portrait", "mm", "a4");

    const img = canvas.toDataURL("image/png");
    pdf.addImage(img, "PNG", 10, 10, 190, 277);
    pdf.save("feuille_A4.pdf");
}

// Télécharger PNG
function downloadPNG() {
    const link = document.createElement("a");
    link.download = "feuille.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
}

// Génération automatique au chargement
window.onload = () => {
    generate();
};
