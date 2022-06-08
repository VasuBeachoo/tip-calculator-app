const billInput = document.querySelector("#bill-amount-input");
const tipBtns = Array.from(document.querySelectorAll(".input__btn--fixed"));
const customTipBtn = document.querySelector("#custom-tip-btn");
const peopleInput = document.querySelector("#people-number-input");
const tipDisplay = document.querySelector("#tip-amount-display");
const totalDisplay = document.querySelector("#total-amount-display");
const resetBtn = document.querySelector("#reset-btn");

let billAmt = 0;
let numPeople = 0;
let tipPercent = 0;
let tipAmt = 0;
let totalAmt = 0;
let tipPerson = 0;
let totalPerson = 0;

function notifyView() {
  tipDisplay.innerText = "$" + tipPerson.toFixed(2);
  totalDisplay.innerText = "$" + totalPerson.toFixed(2);
}

function resetView() {
  tipDisplay.innerText = "$0.00";
  totalDisplay.innerText = "$0.00";
}

function updateModel() {
  if (peopleInput.value <= 0) {
    resetView();
  } else if (billInput.value === "") {
    resetView();
  } else if (customTipBtn.value < 0) {
    resetView();
  } else {
    billAmt = parseFloat(billInput.value);
    numPeople = parseFloat(peopleInput.value);
    if (customTipBtn.value === "") {
      tipPercent = 0;
    } else {
      tipPercent = parseFloat(customTipBtn.value);
    }
    tipAmt = billAmt * (tipPercent / 100);
    totalAmt = billAmt + tipAmt;
    tipPerson = tipAmt / numPeople;
    totalPerson = totalAmt / numPeople;
    notifyView();
  }
}

function resetTipBtns() {
  tipBtns.forEach((tipBtn) => {
    tipBtn.className = "input__btn input__btn--fixed input__btn--unclicked";
  });
}

billInput.addEventListener("input", updateModel);
peopleInput.addEventListener("input", updateModel);
resetBtn.addEventListener("click", () => {
  resetView();
  resetTipBtns();
  billInput.value = "";
  customTipBtn.value = "";
  peopleInput.value = "";
});
tipBtns.forEach((tipBtn) =>
  tipBtn.addEventListener("click", (e) => {
    resetTipBtns();
    customTipBtn.value = "";
    e.target.className = "input__btn input__btn--fixed input__btn--clicked";
  })
);
customTipBtn.addEventListener("click", resetTipBtns);
customTipBtn.addEventListener("input", updateModel);
