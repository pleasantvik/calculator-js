// SELECTING THE HTML ELEMENT
const numberBtn = document.querySelectorAll("[data-number]");
const operationBtn = document.querySelectorAll("[data-operation]");
const equalBtn = document.querySelector("[data-equal]");
const clearBtn = document.querySelector("[data-clear]");
const deleteBtn = document.querySelector("[data-delete]");
const previousOperandTextEl = document.querySelector("[data-prev-operand]");
const currentOperandTextEl = document.querySelector("[data-current-operand]");
const container = document.querySelector(".calculator-grid");

class Calculator {
  constructor(previousText, currentText) {
    this.previousOperandTextEl = previousText;
    this.currentOperandTextEl = currentText;
    this.clear();
  }

  clear() {
    this.currentOperand = "";
    this.prevOperand = "";
    this.operation = undefined;
  }
  delete() {
    this.currentOperand = this.currentOperand.slice(0, -1);
    // if (this.currentOperand === "" && this.operation === "") {
    //   this.prevOperand = this.prevOperand.slice(0, -1);
    // }
    // if (this.currentOperand === "" && this.operation !== "") {
    //   //   this.operation = this.prevOperand.slice(0, -1);
    //   this.operation = "";
    // }
  }
  appendNumber(number) {
    if (this.currentOperand.includes(".") && number === ".") return;

    this.currentOperand = `${this.currentOperand}${number}`;
  }

  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.prevOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.prevOperand = `${this.currentOperand} `;
    this.currentOperand = "";
  }

  compute() {
    let computation;
    let prev = parseFloat(this.prevOperand);
    const current = parseFloat(this.currentOperand);

    if (!prev || !current) return;

    switch (this.operation) {
      case "+":
        computation = prev + current;

        break;

      case "-":
        computation = prev - current;

        break;

      case "*":
        computation = prev * current;

        break;
      case "/":
        computation = prev / current;

        break;

      default:
        break;
    }
    this.currentOperand = computation;
    this.prevOperand = "";
    this.operation = undefined;
    // return computation;
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
    this.currentOperandTextEl.innerText = this.currentOperand;

    if (this.operation != null) {
      this.previousOperandTextEl.innerText = `
        ${this.prevOperand} ${this.operation}`;
    } else {
      this.previousOperandTextEl.innerText = "";
    }
  }
}

const calculator = new Calculator(previousOperandTextEl, currentOperandTextEl);

// numberBtn.forEach((btn) => {
//   btn.addEventListener("click", () => {
//     calculator.appendNumber(btn.textContent);
//     calculator.updateDisplay();
//   });
// });
// operationBtn.forEach((btn) => {
//   btn.addEventListener("click", () => {
//     calculator.chooseOperation(btn.textContent);
//     calculator.updateDisplay();
//   });
// });

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
});

equalBtn.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
});

clearBtn.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});
deleteBtn.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});
