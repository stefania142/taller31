console.log("Proyecto iniciado");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

console.log(canvas);

const escenas = [

    {x1:150, y1:150, x2:350, y2:250},
    {x1:20, y1:20, x2:80, y2:60},
    {x1:50, y1:200, x2:250, y2:220}

];

let escenaActual = 0;

function convertirY(y){
    return y;
}


function plot(x, y){

    ctx.fillRect(x, convertirY(y), 2, 2);
}

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
function dibujarViewport(){

    dibujarLinea(100,100,400,100);
    dibujarLinea(400,100,400,300);
    dibujarLinea(400,300,100,300);
    dibujarLinea(100,300,100,100);
}


dibujarViewport();

const linea = escenas[escenaActual];

dibujarLinea(linea.x1, linea.y1, linea.x2, linea.y2);

