document.addEventListener("DOMContentLoaded", () => {

    const canvas = document.getElementById("sheet");
    const ctx = canvas.getContext("2d");

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

    window.generate = function () {
        clearCanvas();

        const type = document.getElementById("type").value;
        const color = document.getElementById("color").value;

        if (type === "quadrille5") drawGrid(5, color);
        if (type === "quadrille10") drawGrid(10, color);
        if (type === "pointille5") drawDottedGrid(5, color);
        if (type === "vierge") return;
    };

    window.downloadPNG = function () {
        const link = document.createElement("a");
        link.download = "feuille.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
    };

    window.downloadPDF = function () {
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF("portrait", "mm", "a4");

        const img = canvas.toDataURL("image/png");
        pdf.addImage(img, "PNG", 10, 10, 190, 277);
        pdf.save("feuille_A4.pdf");
    };

    // Génération automatique
   function drawHexagonalGrid(sizeMM, color) {
    const size = sizeMM * MM_TO_PX;
    const hexHeight = Math.sqrt(3) * size;
    const hexWidth = 2 * size;
    const vertDist = hexHeight;
    const horizDist = 1.5 * size;

    ctx.strokeStyle = color;
    ctx.lineWidth = 1;

    for (let y = 0; y < canvas.height + hexHeight; y += vertDist) {
        for (let x = 0; x < canvas.width + hexWidth; x += horizDist) {

            const offsetY = (Math.round(x / horizDist) % 2) * (hexHeight / 2);

            drawHexagon(x, y + offsetY, size);
        }
    }
}

function drawHexagon(cx, cy, size) {
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
        const angle = Math.PI / 3 * i;
        const x = cx + size * Math.cos(angle);
        const y = cy + size * Math.sin(angle);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.stroke();
}

    window.generate = function () {
    clearCanvas();

    const type = document.getElementById("type").value;
    const color = document.getElementById("color").value;

    if (type === "quadrille5") drawGrid(5, color);
    if (type === "quadrille10") drawGrid(10, color);
    if (type === "pointille5") drawDottedGrid(5, color);
    if (type === "hexagonale") drawHexagonalGrid(5, color);
    if (type === "vierge") return;
};

});


