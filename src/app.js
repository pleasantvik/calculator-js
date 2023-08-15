// SELECTING THE HTML ELEMENT
const previousOperandTextEl = document.querySelector(".previous-number");
const currentOperandTextEl = document.querySelector(".current-number");
const container = document.querySelector(".calculator-grid");

class Calculator {
  constructor(previousText, currentText) {
    this.previousFigureTextEl = previousText;
    this.currentFigureTextEl = currentText;
    this.currentNumber = "";
    this.prevNumber = "";
    this.operation = undefined;
  }

  clear() {
    this.currentNumber = "";
    this.prevNumber = "";
    this.operation = undefined;
  }
  delete() {
    this.currentNumber = this.currentNumber.slice(0, -1);
    // if (this.currentOperand === "" && this.operation === "") {
    //   this.prevOperand = this.prevOperand.slice(0, -1);
    // }
    // if (this.currentOperand === "" && this.operation !== "") {
    //   //   this.operation = this.prevOperand.slice(0, -1);
    //   this.operation = "";
    // }
  }
  appendNumber(number) {
    if (this.currentNumber.includes(".") && number === ".") return;
    if (
      this.currentNumber.startsWith("0") &&
      this.currentNumber.length === 1 &&
      number !== "."
    )
      return;
    this.currentNumber = this.currentNumber + number;
  }

  chooseOperation(operation) {
    if (this.currentNumber === "") return;
    if (this.prevNumber !== "") {
      this.compute();
      // let answer;

      // answer = +this.prevNumber + +this.currentNumber;

      // this.currentNumber = answer;
    }
    this.operation = operation;
    this.prevNumber = `${this.currentNumber} `;
    this.currentNumber = "";
    // this.operation = operation;
    // if (this.operation !== undefined) {
    //   this.prevNumber = this.currentNumber;
    //   this.currentNumber = "";
    // }
  }

  compute() {
    let computation;
    let current = +this.currentNumber;
    let previous = +this.prevNumber;
    switch (this.operation) {
      case "+":
        computation = current + previous;

        break;
      case "-":
        computation = previous - current;

        break;
      case "*":
        computation = previous * current;

        break;
      case "/":
        computation = previous / current;

        break;

      default:
        break;
    }
    this.currentNumber = computation;
    this.operation = undefined;
    this.prevNumber = "";
  }

  //   getDisplayNumber(number) {
  //     const strNumber = number.toString();
  //     const intDigits = parseFloat(strNumber.split(".")[0]);
  //     const decimalDigits = parseFloat(strNumber.split(".")[1]);
  //     console.log(decimalDigits === NaN);
  //     console.log(isNaN(decimalDigits));

  //     let integerDisplay;

  //     if (isNaN(intDigits)) {
  //       integerDisplay = "";
  //     } else {
  //       integerDisplay = intDigits.toLocaleString("en");
  //     }

  //     if (decimalDigits != null) {
  //       return `${integerDisplay}.${decimalDigits}`;
  //     } else {
  //       return integerDisplay;
  //     }
  //   }

  updateDisplay() {
    this.currentFigureTextEl.innerText = this.currentNumber;
    // this.previousFigureTextEl.innerText = this.prevNumber;

    if (this.operation != undefined) {
      this.previousFigureTextEl.innerText = `
        ${this.prevNumber} ${this.operation}`;
    } else {
      this.previousFigureTextEl.innerText = "";
    }
  }
}

const calculator = new Calculator(previousOperandTextEl, currentOperandTextEl);
calculator.updateDisplay();
console.log(calculator);

container.addEventListener("click", (e) => {
  if (e.target.classList.contains("num-btn")) {
    const btnClick = e.target.innerText;
    calculator.appendNumber(btnClick);
    calculator.updateDisplay();
    // console.log(btnClick);
  }
  if (e.target.classList.contains("operation-btn")) {
    const btnClick = e.target.innerText;
    calculator.chooseOperation(btnClick);
    calculator.updateDisplay();
    // console.log(btnClick);
  }
  if (e.target.classList.contains("equal-btn")) {
    calculator.compute();
    calculator.updateDisplay();
    // console.log(btnClick);
  }
  if (e.target.classList.contains("del-btn")) {
    calculator.delete();
    calculator.updateDisplay();
    // console.log(btnClick);
  }
  if (e.target.classList.contains("all-clear-btn")) {
    calculator.clear();
    calculator.updateDisplay();
    // console.log(btnClick);
  }
});
