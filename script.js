let firstOperand = null; 
let secondOperand = null; 
let operator = ''; 
let userInput = ''; 
let decimalClicked = false; 
let errorMsg = 'NaN'; 

let operatorButtons = document.querySelectorAll('.operation'); 
let numberButton = document.querySelectorAll('.num');           //nodelist of all numbers  
let clearButton = document.getElementById('clr-btn');     
let deleteButton = document.getElementById('dlt-btn');          //delete DOM element       

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
        
        if(firstOperand !== null && operator == '') {       //user does operation on two number, then press number with no operation
            firstOperand = null; 
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

        if(operator === '' && operatorButton.textContent !== '=') {                       
            operator = operatorButton.textContent; 
            
            if(firstOperand === null) {
                firstOperand = parseFloat(userInput); 
                userInput = '';  
                decimalClicked = false; 
            }
        }
        else if(operator === '' && operatorButton.textContent === '=') {
            return; 
        }
        else if(operator !== '' && userInput === '') {                          //change operation if there was initial operation and no second operand
            operator = operatorButton.textContent; 
        }
        else if(firstOperand && parseFloat(userInput) === 0) {
            displayVal(errorMsg); 
        }
        else if(operatorButton.textContent === '=' && firstOperand) {           //when user enters = for doing calculation
             secondOperand = parseFloat(userInput); 
             firstOperand = operate(firstOperand, secondOperand, operator);     
             displayVal(firstOperand); 
             secondOperand = null; 
             operator = '';                                                     //reset operator 
             userInput = ''; 
             decimalClicked = false; 
        }
        else {                                                                          //when user clicks operation other than = 
            secondOperand = parseFloat(userInput); 
            firstOperand = operate(firstOperand, secondOperand, operator);      //first operand becomes value of operation on two numbers
            displayVal(firstOperand);                        
            operator = operatorButton.textContent;                              //if user did not click =, make new operation operatorbutton.textContent
            secondOperand = null; 
            userInput = ''; 
            decimalClicked = false; 
        }

    })
})

//reset all values when clearing the screen 
clearButton.addEventListener('click', function() {
    firstOperand = null; 
    secondOperand = null;  
    userInput = ''; 
    operator = ''; 
    decimalClicked = false;
    displayVal('0'); 

}) 

//delete most recent number a user has clicked 
deleteButton.addEventListener('click', function() {
    if(userInput.length === 0 && firstOperand !== null) {       //check if no input for second operand, delete first operand
        firstOperand = firstOperand.toString().slice(0, -1); 
        if (firstOperand === '') {
            firstOperand = null;
        } else {
            firstOperand = parseFloat(firstOperand); 
        }
        displayVal(firstOperand); 
    }
    else if(userInput.length > 0) {
        userInput = userInput.slice(0, -1); 
        displayVal(userInput); 
    }
    //allow user to click decimal again if it gets deleted 
    if(userInput.indexOf('.') === -1) {
        decimalClicked = false; 
    }
} )

function displayVal(val) {
    document.querySelector('.screen h1').textContent = val; 
}

