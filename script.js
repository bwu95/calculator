let total = null; 
let num2 = null; 
let operator = ''; 
let userInput = ''; 
let decimalClicked = false; 

let operatorButtons = document.querySelectorAll('.operation'); 
let numberButton = document.querySelectorAll('.num');           //nodelist of all numbers  
let clearButton = document.getElementById('clr-btn');           

function add(num1, num2) {
    return num1 + num2; 
}

function subtract(num1, num2) {
    return num1 - num2; 
}

function multiply(num1, num2) {
    return num1 * num2; 
}

function divide(num1, num2) {
    if(num2 !== 0) {
        return num1 / num2; 
    }
    else {
        console.error('cannot divide by 0');    
        return NaN; 
    }
}

function operate(num1, num2, operator) {
    switch (operator) {
        case '+':
            return add(num1, num2); 
            break; 
        case '-':
            return subtract(num1, num2); 
            break; 
        case '*': 
            return multiply(num1, num2); 
            break; 
        case '/': 
            return divide(num1, num2); 
            break; 
    }
}

//iterate through each nodelist and add number to display when clicked 
numberButton.forEach(function(button) {
    button.addEventListener('click', function() {
 
        if (button.textContent === '.' && decimalClicked) {
            return; 
        }

        userInput += button.textContent; 

        if(button.textContent === '.') {
            decimalClicked = true; 
        }

        displayVal(userInput); 
    })
})

//update values when user clicks on an operation 
operatorButtons.forEach(function(operatorButton) {
    operatorButton.addEventListener('click', function() {   

        if(operator === '') {
            operator = operatorButton.textContent; 
            
            if(total === null) {
                total = parseFloat(userInput); 
                userInput = '';  
            }
        }
        else if(operatorButton.textContent === '=' && total) {
             num2 = parseFloat(userInput); 
             total = operate(total, num2, operator); 
             displayVal(total); 
             operator = ''; 
             userInput = ''; 
        }
        else {
            num2 = parseFloat(userInput); 
            total = operate(total, num2, operator); 
            displayVal(total); 
            operator = operatorButton.textContent; 
            userInput = ''; 
        }

    })
})

//reset all values when clearing the screen 
clearButton.addEventListener('click', function() {
    total = null; 
    num2 = null;  
    userInput = ''; 
    operator = ''; 
    displayVal('0'); 

})

function displayVal(val) {
    document.querySelector('.screen h1').textContent = val; 
}

