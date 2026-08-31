const previousOperandEl = document.getElementById('previous-operand');
const currentOperandEl = document.getElementById('current-operand');
const buttons = document.querySelectorAll('button');

let currentOperand = '0';
let previousOperand = '';
let operator = null;
let shouldResetCurrent = false;

function updateDisplay() {
  currentOperandEl.textContent = currentOperand;
  previousOperandEl.textContent = operator
    ? `${previousOperand} ${operatorSymbol(operator)}`
    : '';
}

function operatorSymbol(op) {
  return { '+': '+', '-': '−', '*': '×', '/': '÷' }[op] || '';
}

function appendNumber(number) {
  if (currentOperand === '0' || shouldResetCurrent) {
    currentOperand = '';
    shouldResetCurrent = false;
  }
  if (number === '.' && currentOperand.includes('.')) return;
  currentOperand += number;
}

function chooseOperator(op) {
  if (currentOperand === '' && previousOperand === '') return;

  if (previousOperand !== '' && !shouldResetCurrent) {
    compute();
  }

  operator = op;
  previousOperand = currentOperand;
  shouldResetCurrent = true;
}

function compute() {
  const prev = parseFloat(previousOperand);
  const curr = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(curr)) return;

  let result;
  switch (operator) {
    case '+':
      result = prev + curr;
      break;
    case '-':
      result = prev - curr;
      break;
    case '*':
      result = prev * curr;
      break;
    case '/':
      result = curr === 0 ? 'Error' : prev / curr;
      break;
    default:
      return;
  }

  currentOperand = result.toString();
  operator = null;
  previousOperand = '';
  shouldResetCurrent = true;
}

function clearAll() {
  currentOperand = '0';
  previousOperand = '';
  operator = null;
  shouldResetCurrent = false;
}

function deleteLast() {
  if (shouldResetCurrent) return;
  currentOperand = currentOperand.slice(0, -1);
  if (currentOperand === '') currentOperand = '0';
}

buttons.forEach((button) => {
  if (button.hasAttribute('data-number')) {
    button.addEventListener('click', () => {
      appendNumber(button.textContent);
      updateDisplay();
    });
  } else if (button.dataset.action === 'operator') {
    button.addEventListener('click', () => {
      chooseOperator(button.dataset.operator);
      updateDisplay();
    });
  } else if (button.dataset.action === 'equals') {
    button.addEventListener('click', () => {
      compute();
      updateDisplay();
    });
  } else if (button.dataset.action === 'clear') {
    button.addEventListener('click', () => {
      clearAll();
      updateDisplay();
    });
  } else if (button.dataset.action === 'delete') {
    button.addEventListener('click', () => {
      deleteLast();
      updateDisplay();
    });
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key >= '0' && e.key <= '9') {
    appendNumber(e.key);
    updateDisplay();
  } else if (e.key === '.') {
    appendNumber('.');
    updateDisplay();
  } else if (['+', '-', '*', '/'].includes(e.key)) {
    chooseOperator(e.key);
    updateDisplay();
  } else if (e.key === 'Enter' || e.key === '=') {
    compute();
    updateDisplay();
  } else if (e.key === 'Backspace') {
    deleteLast();
    updateDisplay();
  } else if (e.key === 'Escape') {
    clearAll();
    updateDisplay();
  }
});

updateDisplay();
