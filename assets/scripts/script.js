function action() {
    let userInput = document.getElementById("userInput"); //input type number
    let output = document.getElementById("output"); //output p tag
    let radios = document.getElementsByName("agent"); //radios for agent and priyo agent
    let table = document.getElementById("table"); //table 
    let withCharge = document.getElementById("with-charge"); //table td
    let withoutCharge = document.getElementById("without-charge"); //table td
    let selectedValue = null; //assigned the selected radio value

    for (let radio of radios) {
        if (radio.checked) {
            selectedValue = radio.value;
            break;
        } //this for of loop check every radios value
    }

    //alert logic for enter more than 50 and less than 25000
    if (userInput.value < 50) { 
        output.innerHTML = `<div class="alert">Please enter an amount that is equal or more than 50 BDT</div>`;
        table.style.display = "none"; //table hidden
        return;
    } else if(userInput.value > 25000 && selectedValue === "notPriyo") {
        output.innerHTML = `<div class="alert">Please enter an amount that is equal or less than 25,000 BDT</div>`;
        table.style.display = "none"; //table hidden
        return;
    } else if(userInput.value > 50000 && selectedValue === "priyo") {
        output.innerHTML = `<div class="alert">Please enter an amount that is equal or less than 50,000 BDT</div>`;
        table.style.display = "none"; //table hidden
        return;
    }

    //this logic calculate charge for normal agent and priyo agent and show it on the web page
    if (selectedValue === "notPriyo" && userInput.value >= 50 && userInput.value <= 25000) {

        let math = (userInput.value * 1.85) / 100; //1.85% charge for normal agent
        let roundedMath = math.toFixed(2); //get 2 dgit after decimal but it convert number to string
        let roundedMathAsNumber = parseFloat(roundedMath); //convert string to number
        let inputValueAsNumber = parseFloat(userInput.value); //convert user inputted value string to number
        let sum = inputValueAsNumber + roundedMathAsNumber; //sum of user inputted value and the calculate charge for withCharge
        let minus = inputValueAsNumber - roundedMathAsNumber; //Minus of user inputted value and the calculate charge for withoutCharge

        output.innerHTML = `Charge for ${inputValueAsNumber}TK <div class='charge-amount'> <i class="fa-solid fa-bangladeshi-taka-sign output-taka-icon"></i>${roundedMathAsNumber}</div>`; //output 

        table.style.display = "inline"; //table visible
        withCharge.innerText =`৳${sum}`; //show the sum on the html table td
        withoutCharge.innerText = `৳${minus}`; //show the minus value on the html table td

    } else if(selectedValue === "priyo" && userInput.value >= 50 && userInput.value <= 50000) {

        let math = (userInput.value * 1.49) / 100; //1.49% charge for priyo agent
        let delMath = (userInput.value * 1.85) / 100; //Normal agent Charge
        let delMath2digit = delMath.toFixed(2); //Normal agent 2 dgit after decimal
        let delMath2digitAsNumber = parseFloat(delMath2digit);//normal agent string to number
        let roundedMath = math.toFixed(2); //get 2 dgit after decimal but it convert number to string
        let roundedMathAsNumber = parseFloat(roundedMath); //convert string to number
        let inputValueAsNumber = parseFloat(userInput.value); //convert user inputted value string to number
        let sum = inputValueAsNumber + roundedMathAsNumber; //sum of user inputted value and the calculate charge for withCharge
        let minus = inputValueAsNumber - roundedMathAsNumber; //Minus of user inputted value and the calculate charge for withoutCharge
        let saveAmount = delMath2digitAsNumber - roundedMathAsNumber;
        
        output.innerHTML = `Charge for ${inputValueAsNumber}TK <div class="charge-amount" style="margin-top: 3rem;"> <div class="saved-amount">You Save ${saveAmount.toFixed(2)}TK</div>  <del class="del-agent-amount">৳${delMath.toFixed(2)}</del> <i class="fa-solid fa-bangladeshi-taka-sign output-taka-icon"></i>${roundedMathAsNumber}</div>`;

        table.style.display = "inline"; //table visible
        withCharge.innerText =`৳${sum}`; //show the sum on the html table td
        withoutCharge.innerText = `৳${minus}`; //show the minus value on the html table td
    }

};