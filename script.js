const canvas = document.getElementById("sheet");
const ctx = canvas.getContext("2d");

// Conversion mm → pixels (approx écran)
const MM_TO_PX = 3.78;

function clearCanvas() {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

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

function generate() {
    clearCanvas();

    const type = document.getElementById("type").value;
    const size = parseInt(document.getElementById("size").value);
    const color = document.getElementById("color").value;

    if (type === "quadrille5") drawGrid(5, color);
    if (type === "quadrille10") drawGrid(10, color);
    if (type === "vierge") return;

    console.log("Feuille générée :", type);
}
function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF("portrait", "mm", "a4");

    const imgData = canvas.toDataURL("image/png");

    const margin = 10;
    const width = 210 - margin * 2;
    const height = 297 - margin * 2;

    pdf.addImage(imgData, "PNG", margin, margin, width, height);
    pdf.save("feuille_A4.pdf");
}
function previewPDF() {
    const img = canvas.toDataURL("image/png");
    const w = window.open("");
    w.document.write(`<img src="${img}" style="width:100%">`);
}
window.onload = () => {
    generate();
};


