class Calculator {
  constructor(previousOperandElement, currentOperandElement) {
    this.previousOperandElement = previousOperandElement;
    this.currentOperandElement = currentOperandElement;
    this.reset();
  }

  reset() {
    this.previousOperand = '';
    this.currentOperand = '0';
    this.operator = null;
  }

  append(number) {
    if (this.currentOperand.length > 12) return;
    if (this.currentOperand === '0' && number === '0') return;
    if (number === '.' && this.currentOperand.includes('.')) return;
    if (!(number === '0' || number === '.') && this.currentOperand === '0')
      this.currentOperand = '';
    this.currentOperand += number;
  }

  delete() {
    this.currentOperand =
      this.currentOperand.length > 1 ? this.currentOperand.slice(0, -1) : '0';
  }

  chooseOperator(operator) {
    if (this.operator && this.currentOperand === '0') {
      this.operator = operator;
      return;
    }

    if (this.currentOperand === '0') return;

    if (this.previousOperand) this.calculate();
    this.operator = operator;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '0';
  }

  calculate() {
    if (!this.previousOperand) return;

    let previousOperand = parseFloat(this.previousOperand);
    let currentOperand = parseFloat(this.currentOperand);

    switch (this.operator) {
      case '+':
        previousOperand += currentOperand;
        break;
      case '-':
        previousOperand -= currentOperand;
        break;
      case 'x':
        previousOperand *= currentOperand;
        break;
      case '/':
        previousOperand /= currentOperand;
    }

    this.reset();
    this.currentOperand = String(previousOperand);
  }

  render() {
    this.previousOperandElement.innerText = this.operator
      ? `${this.previousOperand} ${this.operator}`
      : this.previousOperand;

    this.currentOperandElement.innerText = this.currentOperand || 0;
  }
}

const previousOperandElement = document.querySelector('.previous');
const currentOperandElement = document.querySelector('.current');
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const deleteButton = document.querySelector('.delete');
const equalButton = document.querySelector('.equal');
const allClearButton = document.querySelector('.all-clear');

const calculator = new Calculator(
  previousOperandElement,
  currentOperandElement
);

document.addEventListener('DOMContentLoaded', () => {
  calculator.reset();
  calculator.render();
});

numbers.forEach((number) => {
  number.addEventListener('click', (event) => {
    calculator.append(event.target.innerText);
    calculator.render();
  });
});

operators.forEach((operator) => {
  operator.addEventListener('click', (event) => {
    calculator.chooseOperator(event.target.innerText);
    calculator.render();
  });
});

deleteButton.addEventListener('click', () => {
  calculator.delete();
  calculator.render();
});

equalButton.addEventListener('click', () => {
  calculator.calculate();
  calculator.render();
});

allClearButton.addEventListener('click', () => {
  calculator.reset();
  calculator.render();
});

window.addEventListener('keydown', (event) => {
  if ('0123456789.'.includes(event.key)) {
    calculator.append(event.key);
    calculator.render();
  }

  if ('+-*/'.includes(event.key)) {
    calculator.chooseOperator(event.key);
    calculator.render();
  }

  if (event.key === 'Enter') {
    calculator.calculate();
    calculator.render();
  }

  if (event.key === 'Backspace') {
    calculator.delete();
    calculator.render();
  }

  if (event.key === 'Escape') {
    calculator.reset();
    calculator.render();
  }
});
