"use strict";

// Variables 
const form = document.querySelector("#form");
const username = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const cPassword = document.querySelector("#confirm-password");

// Show Error Message
const showError = (input, message) => {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

// Show Success Message
const showSuccess = input => {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

// Check If Email Valid
const checkEmail = input => {
    const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(regEx.test(input.value.trim())){
        showSuccess(input);
    } else {
        showError(input, 'Email is not valid')
    }
}

// Check Password Match
const checkPasswordMatch = (input1, input2) => {
    if(input1.value !== input2.value){
        showError(input2, 'Passwords do not match');
    }
}

// Get fieldname
const getFieldName = input => {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Check Input Length
const checkLength = (input, min, max) => {
    if(input.value.length < min){
        showError(input, `${getFieldName(input)} must be at least ${min} characters`);
    } else if(input.value.length > max){
        showError(input, `${getFieldName(input)} must be less than ${max} characters`);
    } else{
        showSuccess(input);
    }
}

// Check required fields
const checkRequired = inputArr => {
    inputArr.map(input=>{
        if(input.value.trim() === ''){
            showError(input, `${getFieldName(input)} is required`);
        } else{
            showSuccess(input);
        }
    })
}

// Event Listeners For Form Validation
form.addEventListener('submit', e => {
    e.preventDefault();
    checkRequired([username, email, password, cPassword]);
    checkLength(username, 3, 15);
    checkLength(password, 8, 20);
    checkEmail(email);
    checkPasswordMatch(password, cPassword);
});