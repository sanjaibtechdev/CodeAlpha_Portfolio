const expressionEl = document.getElementById("expression");
const resultEl = document.getElementById("result");
const keypad = document.querySelector(".keypad");

let expression = "";
let lastEvaluated = "";

const operatorSet = new Set(["+", "-", "*", "/"]);

function formatDisplay(expr) {
    return expr
        .replaceAll("*", "×")
        .replaceAll("/", "÷")
        .replace(/-/g, "−");
}

function sanitizeExpression(raw) {
    return raw.replace(/[^0-9+\-*/.]/g, "");
}

function isOperator(value) {
    return operatorSet.has(value);
}

function canAppendDecimal() {
    const parts = expression.split(/[+\-*/]/);
    const lastPart = parts[parts.length - 1];
    return !lastPart.includes(".");
}

function appendValue(value) {
    if (!value) {
        return;
    }

    if (expression === "" && (value === "+" || value === "*" || value === "/")) {
        return;
    }

    if (isOperator(value)) {
        if (expression === "" && value !== "-") {
            return;
        }

        if (isOperator(expression.slice(-1))) {
            expression = expression.slice(0, -1) + value;
        } else {
            expression += value;
        }
    } else if (value === ".") {
        if (canAppendDecimal()) {
            expression += value;
        }
    } else {
        if (lastEvaluated && expression === lastEvaluated) {
            expression = value;
        } else {
            expression += value;
        }
    }

    updateDisplays();
}

function clearAll() {
    expression = "";
    lastEvaluated = "";
    updateDisplays();
}

function backspace() {
    if (!expression) {
        return;
    }
    expression = expression.slice(0, -1);
    updateDisplays();
}

function evaluateExpression() {
    if (!expression) {
        return;
    }

    if (isOperator(expression.slice(-1))) {
        expression = expression.slice(0, -1);
    }

    const sanitized = sanitizeExpression(expression);
    if (!sanitized) {
        return;
    }

    try {
        const result = Function(`"use strict"; return (${sanitized});`)();
        if (Number.isFinite(result)) {
            lastEvaluated = String(result);
            expression = lastEvaluated;
            updateDisplays(true);
        }
    } catch (error) {
        resultEl.textContent = "Error";
    }
}

function updateDisplays(isFinal = false) {
    const prettyExpression = expression ? formatDisplay(expression) : "0";
    expressionEl.textContent = prettyExpression;

    if (isFinal) {
        resultEl.textContent = formatResult(expression);
        return;
    }

    const sanitized = sanitizeExpression(expression);
    if (!sanitized || isOperator(expression.slice(-1))) {
        resultEl.textContent = "0";
        return;
    }

    try {
        const interim = Function(`"use strict"; return (${sanitized});`)();
        resultEl.textContent = formatResult(interim);
    } catch (error) {
        resultEl.textContent = "0";
    }
}

function formatResult(value) {
    const num = Number(value);
    if (!Number.isFinite(num)) {
        return "0";
    }
    return Number.isInteger(num) ? String(num) : num.toFixed(6).replace(/\.0+$/, "").replace(/(\.\d*?)0+$/, "$1");
}

function handleButton(event) {
    const target = event.target.closest(".key");
    if (!target) {
        return;
    }

    const { action, value } = target.dataset;

    if (action === "clear") {
        clearAll();
        return;
    }
    if (action === "backspace") {
        backspace();
        return;
    }
    if (action === "equals") {
        evaluateExpression();
        return;
    }

    appendValue(value);
}

function handleKeydown(event) {
    const key = event.key;

    if (/^[0-9]$/.test(key)) {
        appendValue(key);
        return;
    }

    if (key === ".") {
        appendValue(key);
        return;
    }

    if (["+", "-", "*", "/"].includes(key)) {
        appendValue(key);
        event.preventDefault();
        return;
    }

    if (key === "Enter" || key === "=") {
        evaluateExpression();
        event.preventDefault();
        return;
    }

    if (key === "Backspace") {
        backspace();
        event.preventDefault();
        return;
    }

    if (key === "Escape" || key === "Delete") {
        clearAll();
        event.preventDefault();
    }
}

keypad.addEventListener("click", handleButton);
document.addEventListener("keydown", handleKeydown);

updateDisplays();
