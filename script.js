const display = document.getElementById('display');
const buttons = document.querySelectorAll('.buttons button');
const historyList = document.getElementById('historyList');

const operaciones = {
    '+': sumar,
    '-': restar,
    'x': multiplicar,
    '/': dividir,
    '^': potencia,
}
let currentInput = '';
let operator = '';
let firstNumber = null;

for (const button of buttons) {
    button.addEventListener('click', manejarClick);
}

function sumar(a, b) {
    return a + b;
}
function restar(a, b) {
    return a - b;
}
function multiplicar(a, b) {
    return a * b;
}
function dividir(a, b) {
    return a / b;
}
function potencia(a, b) {
    return Math.pow(a, b);
}
function raiz(a) {
    return Math.sqrt(a);
}

function actualizarDisplay(valor) {
    display.value = valor;
}

function agregarAHistorial(texto) {
    const li = document.createElement('li');
    li.textContent = texto;
    historyList.appendChild(li);
}

function manejarClick(evento) {
    let value = evento.target.textContent;

    if (value === '.') {
        currentInput += value;
        actualizarDisplay(currentInput);
    }
    else if (value in operaciones) {
        operator = value;
        firstNumber = parseFloat(currentInput);
        currentInput = '';
    }
    else if (value === '√') {
        let result = raiz(parseFloat(currentInput));
        actualizarDisplay(result);
        agregarAHistorial('√' + currentInput + ' = ' + result);
        currentInput = result.toString();
    }
    else if (value === '⌫') {
        currentInput = currentInput.slice(0, -1);
        actualizarDisplay(currentInput || '0');
    }

    else if (value === 'CE') {
        currentInput = '';
        firstNumber = null;
        operator = '';
        actualizarDisplay('0');
    }

    else if (value === '=') {
        if (firstNumber !== null && currentInput !== '') {
            let secondNumber = parseFloat(currentInput);
            let operacion = operaciones[operator];
            let resultado = operacion ? operacion(firstNumber, secondNumber) : 'Error';

            actualizarDisplay(resultado);
            agregarAHistorial(firstNumber + ' ' + operator + ' ' + secondNumber + ' = ' + resultado);

            currentInput = resultado.toString();
            firstNumber = null;
            operator = '';
        }
    }
}