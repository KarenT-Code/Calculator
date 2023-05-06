const display = document.querySelector(".display");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const equal = document.querySelector(".equal");
const clearAll = document.querySelector(".clearAll");
const clearLast = document.querySelector(".clearLast");
let displayNumber= "";
let result = null;
let lastOperator = "";
let haveDot = false;
let tempResult = "";

numbers.forEach((number) => {
  number.addEventListener("click", function(e) {
    if (e.target.innerText === "." && !haveDot) {
      haveDot = true;
      if(!displayNumber){
        displayNumber = 0; 
      }
    } else if (e.target.innerText === "." && haveDot) {
      return
    }

    if (tempResult == "") {
        displayNumber += e.target.innerText;
        display.innerText = displayNumber;
    } 
    else{
        displayNumber += e.target.innerText;
        display.innerText = tempResult + displayNumber;
    }
  });
});

operators.forEach((operator) => {
operator.addEventListener("click", (e) => {
  if (!displayNumber || displayNumber <= 0) return; 
  haveDot = false;

  const operatorName = e.target.innerText;
  
  if (displayNumber && lastOperator) {
    operation();
    tempResult = `${result}${operatorName}`
  } else {
    result = parseFloat(displayNumber);
    tempResult = displayNumber += operatorName;
    display.innerHTML = tempResult;
  }
  
  lastOperator = operatorName;
  displayNumber = '';
});
});


function operation() {
  if (lastOperator === "x") {
    result = parseFloat(result) * parseFloat(displayNumber);
    display.innerHTML = (result);
  } else if (lastOperator === "+") {
    result = parseFloat(result) + parseFloat(displayNumber);
    display.innerHTML = (result);
  } else if (lastOperator === "-") {
    result = parseFloat(result) - parseFloat(displayNumber);
    display.innerHTML = (result);
  } else if (lastOperator === "/") {
    result = parseFloat(result) / parseFloat(displayNumber);
    if (parseFloat(result) === 0 || parseFloat(displayNumber) === 0) {
      clear();
      return;
    }
    display.innerHTML = (result);
  } else if (lastOperator === "%") {
    result = parseFloat(result) % parseFloat(displayNumber);
    display.innerHTML = Math.round(result);
  }
}

equal.addEventListener("click", () => {
  if (!displayNumber || !result) return;
  displayNumber = operation().toString();
  display.innerHTML = operation();
  lastOperator = "";
});

clearAll.addEventListener("click", () => {
  clear();
});

function clear() {
  display.innerText = "0";
  displayNumber= "";
  result = null;
  lastOperator = "";
  haveDot = false;
  tempResult = "";
}

clearLast.addEventListener("click", () => {
  let len = displayNumber.length;
  displayNumber = displayNumber.slice(0,len-1);
  display.innerText = displayNumber;
});