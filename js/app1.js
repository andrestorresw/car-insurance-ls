function Seguro(marca, year, tipo){
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
}
Seguro.prototype.cotizarSeguro = function(){
    const precioBase = 2000;
    const diferencia  = new Date().getFullYear() - this.year;
    let actualPrice;
    switch(this.marca){
        case '1':
            actualPrice = precioBase * 1.15;
            break;
        case '2':
            actualPrice = precioBase * 1.05;
            break;
        case '3':
            actualPrice = precioBase * 1.35;
            break;
        default:
            break;
    }

    actualPrice -= (actualPrice * diferencia * 0.03);

    if(this.tipo === 'basico'){
        actualPrice *= 1.3;
    }else{
        actualPrice *= 1.5;
    }

    return actualPrice;
}

function UI(){};
UI.prototype.year = ()=>{
    const year = document.getElementById('year');

    const actualYear = new Date().getFullYear();
    const minYear = actualYear - 20;

    const options = document.createElement('option');
    options.value = '';
    options.textContent = '- Seleccionar -';
    year.appendChild(options); 

    for(i = actualYear; i >= minYear; i--){
        const options = document.createElement('option');
        options.value = i;
        options.textContent = i;

        year.appendChild(options);
    }

}
UI.prototype.mostrarMensaje = (mensaje, tipo)=>{
    const divMensaje = document.querySelector('#mensajeError');
    if(divMensaje){
        divMensaje.remove();
    }
    
    const div = document.createElement('div');
    if(tipo === 'error'){
        div.classList.add('error');
    }else{
        div.classList.add('correcto');
    }
    div.classList.add('mensaje', 'mt-10');
    div.id = 'mensajeError'
    div.textContent = mensaje;

    const formulario = document.getElementById('cotizar-seguro');
    formulario.insertBefore(div, document.getElementById('resultado'));

    setInterval(() => {
        div.remove();
    }, 3000);
    
}
UI.prototype.mostrarResultado = (seguro, total)=>{
    const {marca, year, tipo} = seguro;
    let textMarca;
    switch(marca){
        case '1':
            textMarca = 'Americano';
            break;
        case '2':
            textMarca = 'Asiatico';
            break;
        case '3':
            textMarca = 'Europeo';
            break;
        default:
            break;
    }
    
    const div = document.createElement('div');
    div.classList.add('mt-10');
    div.innerHTML = `
        <p class="header">Tu Resumen</p>
        <p class="font-bold">Marca: <span class="font-normal">${textMarca}</span></p>
        <p class="font-bold">Año: <span class="font-normal">${year}</span></p>
        <p class="font-bold">Tipo: <span class="font-normal capitalize">${tipo}</span></p>
        <p class="font-bold">Total: <span class="font-normal">$${total}</span></p>
    `;

    const resultado = document.getElementById('resultado');
    const spinner = document.getElementById('cargando');
    spinner.style.display = 'block';
    setTimeout(()=>{
        resultado.appendChild(div);
        spinner.style.display = 'none';
    },3000);

}

const ui = new UI();

document.addEventListener('DOMContentLoaded', ()=> {
    ui.year();
    eventListeners();
});

function eventListeners(){
    const formulario = document.getElementById('cotizar-seguro');
    formulario.addEventListener('submit',cotizarSeguro);
}

function cotizarSeguro(e){
    e.preventDefault();
    const marca = document.getElementById('marca').value;
    const year = document.getElementById('year').value;
    const tipo = document.querySelector('input[name = "tipo"]:checked').value;
    const divResultados = document.querySelector('#resultado div');
    const btnCotizar = document.getElementById('btnCotizar');
    
    if(divResultados){
        divResultados.remove();
    }

    if(marca !== '' && year !==''){
       ui.mostrarMensaje('Cargando', 'correcto');
    }else{
        ui.mostrarMensaje('Faltan datos', 'error');
        return;
    }

    const seguro = new Seguro(marca, year, tipo);
    const total = seguro.cotizarSeguro();

    btnCotizar.disabled = true;
    btnCotizar.classList.add('opacity-50', 'cursor-not-allowed');

    setTimeout(()=>{
        btnCotizar.disabled = false;
        btnCotizar.classList.remove('opacity-50', 'cursor-not-allowed');
    },3000)

    ui.mostrarResultado(seguro, total);
}

