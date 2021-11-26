const radioButtons = document.querySelectorAll(".radio-container input[type='radio']");
const customTipBtn = document.getElementById('custom-tip');
const billInput = document.getElementById('bill');
const noOfPeopleInput = document.getElementById('no-people');
const tipAmount = document.getElementById('tip-amount');
const totalAmount = document.getElementById('total-amount');
const resetBtn = document.getElementById('reset-btn');

customTipBtn.addEventListener('focus', () => {
    radioButtons.forEach(item => item.checked = false);
});

radioButtons.forEach(item => item.addEventListener('click', () => {
    customTipBtn.value = "";
    let selectedTip = item.value;
    if(Number(billInput.value) > 0 && selectedTip > 0 && Number(noOfPeopleInput.value) > 0){
        calculateTip(selectedTip);
    }
}));

billInput.addEventListener('blur', () => {
    let selectedTip;
    if(document.querySelectorAll(".radio-container input[type='radio']:checked").length > 0){
        selectedTip = Number(document.querySelector(".radio-container input[type='radio']:checked").value);
    } else if(customTipBtn.value > 0){
        selectedTip = Number(customTipBtn.value);
    }
    if(Number(billInput.value) > 0 && selectedTip > 0 && Number(noOfPeopleInput.value) > 0){
        calculateTip(selectedTip);
    }
});

customTipBtn.addEventListener('blur', () => {
    let selectedTip;
    if(customTipBtn.value > 0){
        selectedTip = Number(customTipBtn.value);
    }
    if(Number(billInput.value) > 0 && selectedTip > 0 && Number(noOfPeopleInput.value) > 0){
        calculateTip(selectedTip);
    }
});

noOfPeopleInput.addEventListener('blur', () => {
    let selectedTip;
    if(document.querySelectorAll(".radio-container input[type='radio']:checked").length > 0){
        selectedTip = Number(document.querySelector(".radio-container input[type='radio']:checked").value);
    } else if(customTipBtn.value > 0){
        selectedTip = Number(customTipBtn.value);
    }
    if(Number(billInput.value) > 0 && selectedTip > 0 && Number(noOfPeopleInput.value) > 0){
        document.getElementById("error-no-people").style.display = "none";
        document.getElementById("no-people").style.borderColor = "hsl(189, 41%, 97%)";
        calculateTip(selectedTip);
    } else if(Number(noOfPeopleInput.value) > 0) {
        document.getElementById("error-no-people").style.display = "none";
        document.getElementById("no-people").style.borderColor = "hsl(189, 41%, 97%)";
    } else if(Number(noOfPeopleInput.value) === 0) {
        document.getElementById("error-no-people").style.display = "block";
        document.getElementById("no-people").style.borderColor = "rgb(212, 89, 89)";
    }
});

resetBtn.addEventListener('click', () => {
    if(document.querySelectorAll(".radio-container input[type='radio']:checked").length > 0){
        document.querySelector(".radio-container input[type='radio']:checked").checked = false;
    } else if(customTipBtn.value > 0){
        customTipBtn.value = "";
    }
    billInput.value = "";
    noOfPeopleInput.value = "";
    tipAmount.innerHTML = `$0.00`;
    totalAmount.innerHTML = `$0.00`;
    resetBtn.classList= "reset-btn disabled";
    resetBtn.disabled = true;
})

function calculateTip(selectedTip){

    let tip = Number(billInput.value) * selectedTip / 100 / Number(noOfPeopleInput.value);
    let total = (Number(billInput.value) / Number(noOfPeopleInput.value)) + tip;
    tipAmount.innerHTML = `$${tip.toFixed(2)}`;
    totalAmount.innerHTML = `$${total.toFixed(2)}`;
    console.log("All 3 are selected correctly");

    resetBtn.classList= "reset-btn";
    resetBtn.disabled = false;
}