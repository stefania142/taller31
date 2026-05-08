console.log("Proyecto iniciado");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

console.log(canvas);
// dibujar pixel
function plot(x, y){

    ctx.fillRect(x, y, 2, 2);
}


// algoritmo DDA
function dibujarLinea(x1, y1, x2, y2){

    let dx = x2 - x1;
    let dy = y2 - y1;

    let pasos = Math.max(Math.abs(dx), Math.abs(dy));

    let xinc = dx / pasos;
    let yinc = dy / pasos;

    let x = x1;
    let y = y1;

    for(let i = 0; i <= pasos; i++){

        plot(Math.round(x), Math.round(y));

        x += xinc;
        y += yinc;
    }
}

// prueba
dibujarLinea(100, 100, 400, 300);