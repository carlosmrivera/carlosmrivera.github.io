window.addEventListener('DOMContentLoaded', function () {
    //put input into variables
    amountInput = document.getElementById("loan-amount")
    yearsInput = document.getElementById("loan-years")
    rateInput = document.getElementById("loan-rate")
    monthlyPayment = document.getElementById('monthly-payment')

    const form = document.getElementById("calc-form");
    if (form) {
        setupInitialValues();
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            update();
        });
    }
});

let amountInput = null
let yearsInput = null
let rateInput = null
let monthlyPayment = null

function getCurrentUIValues() {
    return {
        amount: parseFloat(Math.abs(amountInput.value)),
        years: parseFloat(Math.abs(yearsInput.value)),
        rate: parseFloat(Math.abs(rateInput.value)),
    }
}

// Get the inputs from the DOM.
// Put some default values in the inputs
// Call a function to calculate the current monthly payment
function setupInitialValues() {
    amountInput.value = Math.ceil(Math.random() * 100000)
    yearsInput.value = Math.ceil(Math.random() * 20)
    rateInput.value = Math.ceil(Math.random() * 3)

    update()
}

// Get the current values from the UI
// Update the monthly payment
function update() {
    const values = getCurrentUIValues()
    updateMonthly(calculateMonthlyPayment(values))
}

// Given an object of values (a value has amount, years and rate ),
// calculate the monthly payment.  The output should be a string
// that always has 2 decimal places.
function calculateMonthlyPayment(values) {
    const {amount, years, rate} = values
    const i = calculateMonthlyRate(rate)
    const result = ((amount * i) / (1 - Math.pow((1 + i), years * 12 * -1))).toFixed(2)

    return result == 'NaN' ? 'Invalid parameters' : result
}

const calculateMonthlyRate = (rate) => {
    return rate / 12
}

// Given a string representing the monthly payment value,
// update the UI to show the value.
function updateMonthly(monthly) {
    monthlyPayment.innerText = monthly
}