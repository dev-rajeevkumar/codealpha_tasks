const currentDisplay = document.getElementById("current-display");
const previousDisplay = document.getElementById("previous-display");

let currentValue = "0";
let previousValue = "";
let operator = null;
let shouldResetDisplay = false;


// Update display
function updateDisplay() {
    currentDisplay.textContent = currentValue;
    previousDisplay.textContent = previousValue;
}


// Add number
function addNumber(number) {

    if (currentValue === "0" || shouldResetDisplay) {
        currentValue = number;
        shouldResetDisplay = false;
    } else {
        currentValue += number;
    }

    updateDisplay();
}


// Add decimal
function addDecimal() {

    if (shouldResetDisplay) {
        currentValue = "0.";
        shouldResetDisplay = false;
        updateDisplay();
        return;
    }

    if (!currentValue.includes(".")) {
        currentValue += ".";
    }

    updateDisplay();
}


// Choose operator
function chooseOperator(selectedOperator) {

    if (operator !== null && !shouldResetDisplay) {
        calculate();
    }

    previousValue = currentValue;
    operator = selectedOperator;

    shouldResetDisplay = true;

    updateDisplay();
}


// Calculate result
function calculate() {

    if (operator === null || previousValue === "") {
        return;
    }

    const firstNumber = parseFloat(previousValue);
    const secondNumber = parseFloat(currentValue);

    let result;

    if (operator === "+") {
        result = firstNumber + secondNumber;
    }
    else if (operator === "-") {
        result = firstNumber - secondNumber;
    }
    else if (operator === "*") {
        result = firstNumber * secondNumber;
    }
    else if (operator === "/") {

        if (secondNumber === 0) {
            currentValue = "Error";
            previousValue = "Cannot divide by zero";
            operator = null;

            updateDisplay();
            return;
        }

        result = firstNumber / secondNumber;
    }

    result = parseFloat(result.toFixed(10));

    currentValue = String(result);

    previousValue = "";
    operator = null;

    shouldResetDisplay = true;

    updateDisplay();
}


// Clear calculator
function clearCalculator() {

    currentValue = "0";
    previousValue = "";
    operator = null;
    shouldResetDisplay = false;

    updateDisplay();
}


// Delete last digit
function deleteNumber() {

    if (shouldResetDisplay) {
        return;
    }

    if (currentValue.length === 1) {
        currentValue = "0";
    }
    else {
        currentValue = currentValue.slice(0, -1);
    }

    updateDisplay();
}


// Percentage
function percentage() {

    const number = parseFloat(currentValue);

    currentValue = String(number / 100);

    updateDisplay();
}


// Positive / Negative
function changeSign() {

    if (currentValue === "0" || currentValue === "Error") {
        return;
    }

    if (currentValue.startsWith("-")) {
        currentValue = currentValue.substring(1);
    }
    else {
        currentValue = "-" + currentValue;
    }

    updateDisplay();
}


// Button click handling
document.querySelectorAll("[data-number]").forEach(button => {

    button.addEventListener("click", () => {

        addNumber(button.dataset.number);

    });

});


document.querySelectorAll("[data-operator]").forEach(button => {

    button.addEventListener("click", () => {

        chooseOperator(button.dataset.operator);

    });

});


document.querySelectorAll("[data-action]").forEach(button => {

    button.addEventListener("click", () => {

        const action = button.dataset.action;

        if (action === "clear") {
            clearCalculator();
        }

        else if (action === "delete") {
            deleteNumber();
        }

        else if (action === "percentage") {
            percentage();
        }

        else if (action === "sign") {
            changeSign();
        }

        else if (action === "decimal") {
            addDecimal();
        }

        else if (action === "calculate") {
            calculate();
        }

    });

});


// Keyboard support
document.addEventListener("keydown", event => {

    const key = event.key;

    if (key >= "0" && key <= "9") {
        addNumber(key);
    }

    else if (key === ".") {
        addDecimal();
    }

    else if (
        key === "+" ||
        key === "-" ||
        key === "*" ||
        key === "/"
    ) {
        chooseOperator(key);
    }

    else if (key === "Enter" || key === "=") {
        calculate();
    }

    else if (key === "Backspace") {
        deleteNumber();
    }

    else if (key === "Escape") {
        clearCalculator();
    }

    else if (key === "%") {
        percentage();
    }

});