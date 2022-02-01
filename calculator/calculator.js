window.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById("calc-form");
  if (form) {
    setupIntialValues();
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      update();
    });
  }
});

function getCurrentUIValues() {
  return {
    amount: +(document.getElementById("loan-amount").value),
    years: +(document.getElementById("loan-years").value),
    rate: +(document.getElementById("loan-rate").value),
  }
}

// Get the inputs from the DOM.
// Put some default values in the inputs
// Call a function to calculate the current monthly payment
function setupIntialValues() {
  const value = {
    amount: 10000,
    years: 10,
    rate: 5
  }
  let amount = document.getElementById("loan-amount");
  amount.value = value.amount;
  let years = document.getElementById("loan-years");
  years.value = value.years;
  let rate = document.getElementById("loan-rate");
  rate.value = value.rate;
  update();
}

// Get the current values from the UI
// Update the monthly payment
function update() {
  let payment = document.getElementById("monthly-payment");
  updateMonthly(payment);
}

// Given an object of values (a value has amount, years and rate ),
// calculate the monthly payment.  The output should be a string
// that always has 2 decimal places.
// function calculateMonthlyPayment(values) {
//   const montlyPayment = (values.amount * values.rate / 100 / 12) / (1 - (1 + values.rate / 100 / 12) ** (0 - values.years * 12))
//   return montlyPayment.toFixed(2);
// }

function calculateMonthlyPayment(values) {
  const monthlyRate = (values.rate / 100) / 12;
  const n = Math.floor(values.years * 12);
  return (
    (monthlyRate * values.amount) /
    (1 - Math.pow((1 + monthlyRate), -n))
  ).toFixed(2);
}



// Given a string representing the monthly payment value,
// update the UI to show the value.
function updateMonthly(monthly) {
  monthly.innerText = '$' + calculateMonthlyPayment(getCurrentUIValues());
}
