console.log("Proyecto iniciado");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

console.log(canvas);

const escenas = [

    {x1:150, y1:150, x2:320, y2:250}, // dentro del viewport
    {x1:200, y1:20, x2:80, y2:60}, // fuera del viewport
    {x1:50, y1:200, x2:250, y2:220}, // parcialmente dentro del viewport
    {x1:50, y1:50, x2:100, y2:100}, //tocando una sola punta del viewport
    {x1:250, y1:50, x2:250, y2:400}, // vertical sobre le view port
    
];

const INSIDE = 0;
const LEFT = 1;
const RIGHT = 2;
const BOTTOM = 4;
const TOP = 8;

let escenaActual = 0;

const botonSiguiente = document.querySelectorAll("button")[0];
const botonAnterior = document.querySelectorAll("button")[1];

botonSiguiente.addEventListener("click", siguienteEscena);
botonAnterior.addEventListener("click", anteriorEscena);

function convertirY(y){
    return canvas.height - y;
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

function obtenerCodigo(x, y, xmin, ymin, xmax, ymax){

    let codigo = INSIDE;

    if(x < xmin){
        codigo |= LEFT;
    }

    else if(x > xmax){
        codigo |= RIGHT;
    }

    if(y < ymin){
        codigo |= BOTTOM;
    }

    else if(y > ymax){
        codigo |= TOP;
    }

    return codigo;
}
function cohenSutherland(x1,y1,x2,y2,xmin,ymin,xmax,ymax){


    let codigo1 = obtenerCodigo(x1,y1,x2,y2,xmin,ymin,xmax,ymax);
    let codigo2 = obtenerCodigo(x2,y2,x2,y2,xmin,ymin,xmax,ymax);

    let aceptar = false;

    while(true){

        if((codigo1 | codigo2) === 0){

            aceptar = true;
            break;
        }

        else if((codigo1 & codigo2) !== 0){

            break;
        }

        else{

            let x, y;

            let codigoFuera = codigo1 !== 0 ? codigo1 : codigo2;

            if(codigoFuera & TOP){

                x = x1 + (x2 - x1) * (ymax - y1) / (y2 - y1);
                y = ymax;
            }

            else if(codigoFuera & BOTTOM){

                x = x1 + (x2 - x1) * (ymin - y1) / (y2 - y1);
                y = ymin;
            }

            else if(codigoFuera & RIGHT){

                y = y1 + (y2 - y1) * (xmax - x1) / (x2 - x1);
                x = xmax;
            }

            else if(codigoFuera & LEFT){

                y = y1 + (y2 - y1) * (xmin - x1) / (x2 - x1);
                x = xmin;
            }

            if(codigoFuera === codigo1){

                x1 = x;
                y1 = y;

                codigo1 = obtenerCodigo(x1,y1,xmin,ymin,xmax,ymax);
            }

            else{

                x2 = x;
                y2 = y;

                codigo2 = obtenerCodigo(x2,y2,xmin,ymin,xmax,ymax);
            }
        }
    }

    if(aceptar){

        dibujarLinea(x1,y1,x2,y2);
    }
}

const linea = escenas[escenaActual];

dibujarLinea(linea.x1, linea.y1, linea.x2, linea.y2);

function renderizar(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    dibujarViewport(xmin, ymin, xmax, ymax);

    const linea = escenas[escenaActual];

    dibujarLinea(linea.x1, linea.y1, linea.x2, linea.y2);
}


function siguienteEscena(){

    escenaActual++;

    if(escenaActual >= escenas.length){
        escenaActual = 0;
    }

    renderizar();
}

function anteriorEscena(){

    escenaActual--;

    if(escenaActual < 0){
        escenaActual = escenas.length - 1;
    }

    renderizar();
}

renderizar();

//dibujarLinea(linea.x1, linea.y1, linea.x2, linea.y2);
cohenSutherland(
    linea.x1,
    linea.y1,
    linea.x2,
    linea.y2,
);