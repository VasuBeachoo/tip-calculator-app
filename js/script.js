const billContainer = document.querySelector("#bill-label-container");
const billInput = document.querySelector("#bill-amount-input");
const tipContainer = document.querySelector("#tip-label-container");
const tipBtns = Array.from(document.querySelectorAll(".input__btn--fixed"));
const customTipBtn = document.querySelector("#custom-tip-btn");
const peopleContainer = document.querySelector("#people-label-container");
const peopleInput = document.querySelector("#people-number-input");
const tipDisplay = document.querySelector("#tip-amount-display");
const totalDisplay = document.querySelector("#total-amount-display");
const resetBtn = document.querySelector("#reset-btn");

let billAmt = 0;
let numPeople = 1;
let tipPercent = 0;
let customCheck = true;
let tipAmt = 0;
let totalAmt = 0;
let tipPerson = 0;
let totalPerson = 0;

const billError = document.createElement("p");
billError.className = "input__error-msg";

const tipError = document.createElement("p");
tipError.className = "input__error-msg";

const peopleError = document.createElement("p");
peopleError.className = "input__error-msg";

function notifyView() {
  if (tipPerson <= 999999.99) tipDisplay.innerText = "$" + tipPerson.toFixed(2);
  else tipDisplay.innerText = ">$1M";
  if (totalPerson <= 999999.99)
    totalDisplay.innerText = "$" + totalPerson.toFixed(2);
  else totalDisplay.innerText = ">$1M";
}

function resetView() {
  tipDisplay.innerText = "$0.00";
  totalDisplay.innerText = "$0.00";
}

function displayError(errorType, errorMsg) {
  if (errorType === "bill") {
    billInput.className = "input__input input__input--invalid";
    billError.innerText = errorMsg;
    billContainer.append(billError);
  } else if (errorType === "custom") {
    customTipBtn.className = "input__btn input__btn--input input__btn--invalid";
    tipError.innerText = errorMsg;
    tipContainer.append(tipError);
  } else if (errorType === "people") {
    peopleInput.className = "input__input input__input--invalid";
    peopleError.innerText = errorMsg;
    peopleContainer.append(peopleError);
  }
}

function removeErrors() {
  const errorMsgs = Array.from(document.querySelectorAll(".input__error-msg"));
  errorMsgs.forEach((msg) => msg && msg.remove());
  billInput.className = "input__input input__input--valid";
  customTipBtn.className = "input__btn input__btn--input input__btn--valid";
  peopleInput.className = "input__input input__input--valid";
}

function checkErrors() {
  let errorPresent = false;
  if (billInput.value === "") removeErrors();
  if (customTipBtn.value === "") removeErrors();
  if (peopleInput.value === "") removeErrors();
  if (
    (peopleInput.value <= 0 || isNaN(parseFloat(peopleInput.value))) &&
    peopleInput.value != ""
  ) {
    resetView();
    displayError("people", "Must be positive");
    errorPresent = true;
  }
  if (customTipBtn.value < 0) {
    resetView();
    displayError("custom", "Cannot be negative");
    errorPresent = true;
  }
  if (customTipBtn.value !== "" && isNaN(parseFloat(customTipBtn.value))) {
    resetView();
    displayError("custom", "Must be a number");
    errorPresent = true;
  }
  if (billInput.value !== "" && isNaN(parseFloat(billInput.value))) {
    resetView();
    displayError("bill", "Must be a number");
    errorPresent = true;
  }
  if (parseFloat(billInput.value) < 0) {
    resetView();
    displayError("bill", "Cannot be negative");
    errorPresent = true;
  }
  return errorPresent;
}

function updateModel() {
  if (
    billInput.value === "" &&
    tipPercent === 0 &&
    customTipBtn.value === "" &&
    peopleInput.value === ""
  )
    resetBtn.className = "display__btn display__btn--unclickable";
  else resetBtn.className = "display__btn display__btn--clickable";
  if (checkErrors()) {
  } else {
    resetView();
    if (billInput.value === "") {
      billAmt = 0;
    } else {
      billAmt = parseFloat(billInput.value);
    }
    if (peopleInput.value === "") {
      numPeople = 1;
    } else {
      numPeople = parseFloat(peopleInput.value);
    }
    if (customCheck) {
      if (customTipBtn.value === "") {
        tipPercent = 0;
      } else {
        tipPercent = parseFloat(customTipBtn.value);
      }
    }
    tipAmt = billAmt * (tipPercent / 100);
    totalAmt = billAmt + tipAmt;
    tipPerson = tipAmt / numPeople;
    totalPerson = totalAmt / numPeople;
    notifyView();
  }
}

function resetTipBtns() {
  tipPercent = 0;
  tipBtns.forEach((tipBtn) => {
    tipBtn.className = "input__btn input__btn--fixed input__btn--unclicked";
  });
}

billInput.addEventListener("input", updateModel);
peopleInput.addEventListener("input", updateModel);
resetBtn.addEventListener("click", () => {
  resetView();
  removeErrors();
  resetTipBtns();
  resetBtn.className = "display__btn display__btn--unclickable";
  billInput.value = "";
  customTipBtn.value = "";
  peopleInput.value = "";
});
tipBtns.forEach((tipBtn) =>
  tipBtn.addEventListener("click", (e) => {
    resetTipBtns();
    customTipBtn.value = "";
    customCheck = false;
    e.target.className = "input__btn input__btn--fixed input__btn--clicked";
    if (e.target.id === "five-tip-btn") tipPercent = 5;
    else if (e.target.id === "ten-tip-btn") tipPercent = 10;
    else if (e.target.id === "fifteen-tip-btn") tipPercent = 15;
    else if (e.target.id === "twenty-five-tip-btn") tipPercent = 25;
    else if (e.target.id === "fifty-tip-btn") tipPercent = 50;
    updateModel();
  })
);
customTipBtn.addEventListener("click", () => {
  customCheck = true;
  resetTipBtns();
  updateModel();
});
customTipBtn.addEventListener("input", updateModel);
