document.addEventListener("DOMContentLoaded", () => {

    const canvas = document.getElementById("sheet");
    const ctx = canvas.getContext("2d");

    const MM_TO_PX = 3.78;

    // Nettoyage
    function clearCanvas() {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // Grille carrée
    function drawGrid(sizeMM, color) {
        const step = sizeMM * MM_TO_PX;
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;

        for (let x = 0; x <= canvas.width; x += step) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
        }
        for (let y = 0; y <= canvas.height; y += step) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }
    }

    // Grille pointillée
    function drawDottedGrid(sizeMM, color) {
        const step = sizeMM * MM_TO_PX;
        ctx.fillStyle = color;

        for (let x = 0; x <= canvas.width; x += step) {
            for (let y = 0; y <= canvas.height; y += step) {
                ctx.beginPath();
                ctx.arc(x, y, 1, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    }

    // 🔷 Grille hexagonale
    function drawHexagonalGrid(sizeMM, color) {
        const size = sizeMM * MM_TO_PX;
        const hexHeight = Math.sqrt(3) * size;
        const horiz = 1.5 * size;

        ctx.strokeStyle = color;
        ctx.lineWidth = 1;

        for (let y = 0; y < canvas.height + hexHeight; y += hexHeight) {
            for (let x = 0; x < canvas.width + size; x += horiz) {

                const offsetY = (Math.round(x / horiz) % 2) * (hexHeight / 2);
                drawHexagon(x, y + offsetY, size);
            }
        }
    }

    function drawHexagon(cx, cy, r) {
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
            const angle = Math.PI / 3 * i;
            const x = cx + r * Math.cos(angle);
            const y = cy + r * Math.sin(angle);
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.stroke();
    }

    // Génération
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

    // Téléchargements
    window.downloadPNG = function () {
        const a = document.createElement("a");
        a.download = "feuille.png";
        a.href = canvas.toDataURL("image/png");
        a.click();
    };

    window.downloadPDF = function () {
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF("portrait", "mm", "a4");
        const img = canvas.toDataURL("image/png");
        pdf.addImage(img, "PNG", 10, 10, 190, 277);
        pdf.save("feuille_A4.pdf");
    };

    // Auto
    generate();
});
