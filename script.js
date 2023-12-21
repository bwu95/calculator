let firstOperand = null; 
let secondOperand = null; 
let operator = ''; 
let userInput = ''; 
let decimalClicked = false; 
let errorMsg = 'NaN'; 
let shiftKey = false; 

let operatorButtons = document.querySelectorAll('.operation'); 
let numberButton = document.querySelectorAll('.num');           //nodelist of all numbers  
let clearButton = document.getElementById('clr-btn');     
let deleteValue = document.getElementById('dlt-btn');          //delete DOM element    

deleteValue.addEventListener('click', deleteButton); 
clearButton.addEventListener('click', resetValues); 

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
        //check if user clicks operation without any input and no first operand 
        if(firstOperand === null && userInput === '') {                                              //check if user clicks operation first without any input 
            return; 
        }
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
        else if(firstOperand && parseFloat(userInput) === 0) {                  //check if dividing by 0 
            displayVal(errorMsg); 
        }
 
        else if(operatorButton.textContent === '=' && firstOperand) {           //when user click = for doing calculation
             secondOperand = parseFloat(userInput); 
             firstOperand = operate(firstOperand, secondOperand, operator);     
             firstOperand = roundResult(firstOperand); 
             displayVal(firstOperand); 
             secondOperand = null; 
             operator = '';                                                     //reset operator 
             userInput = ''; 
             decimalClicked = false; 
        }
        else {                                                                          //when user clicks operation other than = 
            secondOperand = parseFloat(userInput); 
            firstOperand = operate(firstOperand, secondOperand, operator);      //first operand becomes value of operation on two numbers
            firstOperand = roundResult(firstOperand); 
            displayVal(firstOperand);                        
            operator = operatorButton.textContent;                              //if user did not click =, make new operation operatorbutton.textContent
            secondOperand = null; 
            userInput = ''; 
            decimalClicked = false; 
        }

    })
})

//handling keyboard support for number input values 
document.addEventListener('keydown', function(event) {
    let key = event.key; 

    if(key === 'Enter') {
        event.preventDefault(); 
    }

    if(key === 'Shift') {
        shiftKey = true; 
        return; 
    }
    else if(key === 'Escape') {
        resetValues(); 
    }
    else if(key === 'Backspace') {
        deleteButton(); 
    }

    //add to user input if it's a number 
    if(!isNaN(key) || key === '.') {
        if(key === '.' && decimalClicked) {
            return; 
        }
        if(firstOperand !== null && operator == '') {        //user does operation on two number, then press number with no operation
            firstOperand = null; 
        }
        userInput += key; 
        displayVal(userInput); 
    }
    //check if user pressed operator 
    if(shiftKey && ['+', '*'].includes(key) ){
        operatorKeyboardClick(key); 
    }
    else if(['=', '-', '/', 'Enter'].includes(key)) {
        operatorKeyboardClick(key); 
    }

    if(key === '.') {
        decimalClicked = true; 
    }
})

//handling of keyboard support operations 
function operatorKeyboardClick(clickedOperator) {
    //check if user clicks on operation without any values 
    if(firstOperand === null && userInput === '') {                                              //check if user clicks operation first without any input 
        return; 
    }
    //first operation being done   
    if(operator === '' && clickedOperator !== '=') {
        operator = clickedOperator; 
        //add value to first operand if empty
        if(firstOperand === null) {
            firstOperand = parseFloat(userInput); 
            userInput = '';  
            decimalClicked = false; 
        }
    }
    else if(operator === '' && clickedOperator === '=') {
        return; 
    }
    else if(operator !== '' && userInput === '') {                          //change operation if there was initial operation and no second operand
        operator = clickedOperator; 
    }
    else if((clickedOperator === '=' || clickedOperator === 'Enter') && firstOperand) {
        secondOperand = parseFloat(userInput); 
        firstOperand = operate(firstOperand, secondOperand, operator); 
        firstOperand = roundResult(firstOperand);     
        displayVal(firstOperand); 
        secondOperand = null; 
        operator = '';                                                     //reset operator 
        userInput = ''; 
        decimalClicked = false;        
    }
    else {
        secondOperand = parseFloat(userInput); 
        firstOperand = operate(firstOperand, secondOperand, operator);   
        firstOperand = roundResult(firstOperand);   
        displayVal(firstOperand);                        
        operator = clickedOperator;                              
        secondOperand = null; 
        userInput = ''; 
        decimalClicked = false;      
    }
}

document.addEventListener('keyup', function(event) {
    const key = event.key;

    if (key === 'Shift') {
        shiftKey = false;
    }
});

function deleteButton() {
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
}

//reset all values when clearing screen 
function resetValues() {
    firstOperand = null; 
    secondOperand = null;  
    userInput = ''; 
    operator = ''; 
    decimalClicked = false;
    displayVal('0'); 
}

function roundResult(number) {
    return Math.round(number * 1000) / 1000
  }


function displayVal(val) {
    document.querySelector('.screen h1').textContent = val; 
}

