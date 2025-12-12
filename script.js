function generate() {
const pxPerMm = 3.78;
const step = size * pxPerMm;


switch(type) {
case "vierge": break;
case "quadrille5": case "quadrille10": case "quadrille2.5":
case "pointille5": case "pointille10": case "ligneSimple": case "ligneDouble":
drawGrid(ctx, canvas, step, type); break;
case "isometrique": drawIsometric(ctx, canvas, step); break;
case "hexagonale": drawHex(ctx, canvas, step); break;
}
}


function drawGrid(ctx, canvas, step, type){
for(let x=0;x<=canvas.width;x+=step){ ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,canvas.height); ctx.stroke(); }
for(let y=0;y<=canvas.height;y+=step){ ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(canvas.width,y); ctx.stroke(); }
if(type==="ligneDouble"){
let halfStep = step/2;
for(let y=0;y<=canvas.height;y+=step){ ctx.beginPath(); ctx.moveTo(0,y+halfStep); ctx.lineTo(canvas.width,y+halfStep); ctx.stroke(); }
}
}


function drawIsometric(ctx, canvas, step){
let height = Math.sin(Math.PI/3)*step;
for(let y=0;y<=canvas.height+height;y+=height){
for(let x=0;x<=canvas.width+step;x+=step){
ctx.beginPath(); ctx.moveTo(x,y); ctx.lineTo(x+step/2,y-height); ctx.lineTo(x+step,y); ctx.stroke();
}
}
}


function drawHex(ctx, canvas, step){
const hexHeight = Math.sqrt(3)/2 * step;
for(let y=0;y<=canvas.height+hexHeight;y+=hexHeight){
for(let x=0;x<=canvas.width+step;x+=step*3/4){ drawSingleHex(ctx,x,y,step); }
}
}


function drawSingleHex(ctx, x, y, size){
const angle = Math.PI/3;
ctx.beginPath();
for(let i=0;i<6;i++){
let xi = x + size*Math.cos(angle*i);
let yi = y + size*Math.sin(angle*i);
if(i===0) ctx.moveTo(xi,yi); else ctx.lineTo(xi,yi);
}
ctx.closePath(); ctx.stroke();
}


function downloadPNG(){
let canvas = document.getElementById("sheet");
let link = document.createElement('a');
link.download = 'feuille.png';
link.href = canvas.toDataURL();
link.click();
}


function downloadPDF(){
let canvas = document.getElementById("sheet");
let imgData = canvas.toDataURL('image/png');
let pdf = new jspdf.jsPDF('p','pt',[canvas.width,canvas.height]);
pdf.addImage(imgData,'PNG',0,0,canvas.width,canvas.height);
pdf.save('feuille.pdf');