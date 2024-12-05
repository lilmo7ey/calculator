const display = document.querySelector('.current-input');
let currentInput = '0';
let firstOperand = null;
let secondOperand = null;
let currentOperator = null;
let shouldResetDisplay = false;

// Add event listeners to buttons
const numberButtons = document.querySelectorAll('[data-number]');
numberButtons.forEach(button => {
  button.addEventListener('click', () => appendNumber(button.dataset.number));
});

const operatorButtons = document.querySelectorAll('.operator');
operatorButtons.forEach(button => {
  button.addEventListener('click', () => handleOperator(button.dataset.operator));
});

document.querySelector('.clear').addEventListener('click', clear);

function appendNumber(number) {
  if (currentInput === '0' || shouldResetDisplay) {
    currentInput = number;
    shouldResetDisplay = false;
  } else {
    currentInput += number;
  }
  updateDisplay();
}

function handleOperator(operator) {
  if (operator === '=') {
    if (currentOperator && firstOperand !== null) {
      secondOperand = parseFloat(currentInput);
      currentInput = calculate(firstOperand, currentOperator, secondOperand).toString();
      firstOperand = null;
      secondOperand = null;
      currentOperator = null;
    }
  } else {
    if (currentOperator && firstOperand !== null) {
      secondOperand = parseFloat(currentInput);
      currentInput = calculate(firstOperand, currentOperator, secondOperand).toString();
    }
    firstOperand = parseFloat(currentInput);
    currentOperator = operator;
    shouldResetDisplay = true;
  }
  updateDisplay();
}

function calculate(a, operator, b) {
  switch (operator) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case '*':
      return a * b;
    case '/':
      return b !== 0 ? a / b : 'Error'; // Handle division by zero
    default:
      return b;
  }
}

function clear() {
  currentInput = '0';
  firstOperand = null;
  secondOperand = null;
  currentOperator = null;
  updateDisplay();
}

function updateDisplay() {
  display.textContent = currentInput;
}
