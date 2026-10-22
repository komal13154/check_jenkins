
const display = document.getElementById("display");
const message = document.getElementById("message");

let firstNumber = null;
let operator = null;
let startNewNumber = true;

function show(value) {
  display.value = String(value);
}

function calculate(a, op, b) {
  switch (op) {
    case "+": return a + b;
    case "-": return a - b;
    case "*": return a * b;
    case "/":
      if (b === 0) throw new Error("Cannot divide by zero");
      return a / b;
    default:
      throw new Error("Invalid operator");
  }
}

document.querySelectorAll("[data-value]").forEach((button) => {
  button.addEventListener("click", () => {
    message.textContent = "";
    const value = button.dataset.value;

    if (startNewNumber || display.value === "Error") {
      show(value);
      startNewNumber = false;
    } else {
      show(display.value === "0" ? value : display.value + value);
    }
  });
});

document.querySelectorAll("[data-op]").forEach((button) => {
  button.addEventListener("click", () => {
    const current = Number(display.value);

    if (!Number.isFinite(current)) return;

    firstNumber = current;
    operator = button.dataset.op;
    startNewNumber = true;
    message.textContent = "";
  });
});

document.getElementById("equals").addEventListener("click", () => {
  if (operator === null || firstNumber === null) return;

  try {
    const result = calculate(firstNumber, operator, Number(display.value));
    show(Number.isFinite(result) ? Number(result.toFixed(8)) : "Error");
    message.textContent = "";
  } catch (error) {
    show("Error");
    message.textContent = error.message;
  }

  firstNumber = null;
  operator = null;
  startNewNumber = true;
});

document.getElementById("clear").addEventListener("click", () => {
  firstNumber = null;
  operator = null;
  startNewNumber = true;
  show("0");
  message.textContent = "";
});
