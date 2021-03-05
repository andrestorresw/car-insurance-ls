//Traer elementos HTML
const marca = document.getElementById('marca');//Select de marca
const year = document.getElementById('year');//Select de year
const basico = document.getElementById('basico');//Label basico/completo
const completo = document.getElementById('completo');//Label basico/completo
const btnCotizar = document.getElementById('cotizar-seguro');
const resultado = document.getElementById('resultado');//Donde se imprime la cotizacion


//Event Listeners
document.addEventListener('DOMContentLoaded', cargarApp);
marca.addEventListener('change', seleccionarMarca);
year.addEventListener('change', seleccionarYear);
basico.addEventListener('change', escogerCheck);
completo.addEventListener('change', escogerCheck);
btnCotizar.addEventListener('submit', cotizar);

function cargarApp(){
    const ui = new UI;
    ui.crearYears();
    year.value = null;
    marca.value = "";
    basico.checked = true;
}

//Constructor seguro
function Seguro(marca, year, tipo){
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
}

let cantidad;
let diferencia;
let seguro1 = new Seguro('','','basico');
//Iniciar objeto
let mostrar = [];

//Constructor UI
function UI(){};

//Proto de UI que crea los años en select
UI.prototype.crearYears = function() {
    const anio = document.createElement('option');
    anio.value = null;
    anio.textContent = "- Selecionar -";
    year.appendChild(anio);
    for(i = 2020; i >= 2001; i--){
        const anio = document.createElement('option');
        anio.value = i;
        anio.textContent = i;
        year.appendChild(anio);
    }
}


function limpiarHTML(){
    const proof = document.getElementById('someID');
    if(proof){
        proof.remove();
    }
}

//Escoger seguro basico o completo
function escogerCheck(e){
    if(completo.checked){
        seguro1.tipo = e.target.value;

    }else if(basico.checked){
        seguro1.tipo = e.target.value;
    }
}

//Detectar que marca desea cotizar
function seleccionarMarca(e){
    const options = e.target.value;
    switch (options) {
        case '1':
            seguro1.marca = 'Americano';
            break;
        case '2':
            seguro1.marca = 'Asiatico';
            break;
        case '3':
            seguro1.marca = 'Europeo';
        default:
            break;
    }
}

//Detectar que años desea cotizar
function seleccionarYear(e){
    seguro1.year = e.target.value;
    diferencia = 2020 - seguro1.year;
}

function cotizarSeguro(){
    const base = 2000;
    switch (seguro1.marca) {
        case 'Americano':
            cantidad = base * 1.15;
            break;
        case 'Asiatico':
            cantidad = base * 1.05;
            break;
                case 'Asiatico':
            cantidad = base * 1.05;
            break;
        case 'Europeo':
            cantidad = base * 1.35;
            break;
        default:
            break;
    }
    cantidad = cantidad - (cantidad * diferencia * 0.03);

    if(seguro1.tipo === 'basico'){
        cantidad *= 1.3;
    }else{
        cantidad *= 1.5;
    }
}

//Activa boton cotizar seguro
function cotizar(e){
    e.preventDefault();
    limpiarHTML();
    cotizarSeguro();
    const row = document.createElement('div');
    row.id = 'someID';

    if(seguro1.marca && seguro1.year){
        mostrar = [seguro1];
        mostrar.forEach(element => {
            const charging = document.createElement('div');
            charging.classList.add('correcto', 'mensaje', 'mt-10');
            charging.textContent = 'Cotizando...';
            btnCotizar.insertBefore(charging, resultado);

            row.innerHTML = `
                <p>Marca: ${element.marca}</p>
                <p>Año: ${element.year}</p>
                <p>Tipo: ${element.tipo}</p>
                <p>Precio: ${cantidad} </p>
            `;

            setTimeout(() => {
                charging.remove();
                btnCotizar.insertBefore(row, resultado);
            }, 3000);
        });
    }else{
        row.classList.add('error', 'mensaje', 'mt-10');
        row.textContent = 'Faltan datos';
        btnCotizar.insertBefore(row, resultado);
        setTimeout(() => {
            row.remove();
        }, 3000);
    }
}