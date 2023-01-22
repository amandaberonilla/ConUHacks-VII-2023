
var inputdata=[];
var input;
var length;
var password; 

function othername(){
    input = document.getElementById('lower');
    window.alert(input.value);
    datacollection(input);
    displayarray();
}

function datacollection(){
    inputdata.push(document.getElementById("lower").value);
    document.getElementById("lower").value="";
}

function displayarray(){
    var e = "<hr/>";
    for(var i=0; i<inputdata.length; i++){
        e += "Element " + i+" = "+ inputdata[i]+ "<br/>";
    }
    document.getElementById("Result").innerHTML = e;
}

// function ()

// function displaypassword(){
//     var include = document.getElementById("lower").value;
//     var password = 
// }


//Abdur

const characterAmountRange = document.getElementById('characterAmountRange');
const characterAmountNumber = document.getElementById('characterAmountNumber');
const passwordDisplay = document.getElementById('PasswordDisplay');
const generationCopy = document.getElementById('generationCopy');
const miscText = document.getElementById('miscText');
const form = document.getElementById('passwordForm');
const upper = document.getElementById('upper');
const lower = document.getElementById('lower');
const number = document.getElementById('number');
const symbols = document.getElementById('special');
const UPPERCASE_CHAR_CODES = arrayFromLowToHigh(65,90);
const LOWER_CHAR_CODES = arrayFromLowToHigh(97, 122);
const NUMBER_CHAR_CODES = arrayFromLowToHigh(48,57);
const SYMBOL_CHAR_CODES = arrayFromLowToHigh(33,47).concat(
    arrayFromLowToHigh(58,64)
).concat(
    arrayFromLowToHigh(91,96)
).concat(
    arrayFromLowToHigh(123,126)
);

characterAmountNumber.addEventListener('input', syncCharacterAmount);
characterAmountRange.addEventListener('input', syncCharacterAmount);
function syncCharacterAmount(e){
    const value = e.target.value;
    characterAmountNumber.value = value;
    characterAmountRange.value = value;
    
}

function copyToClipboard() {
    navigator.clipboard.writeText(passwordDisplay.innerText);
    miscText.innerText = "Copied!";
}

form.addEventListener('submit', e => {
    e.preventDefault();
    //Checking if there's at least one checkbox checked.
    let numberOfChecks = 0;
    if(document.getElementById('upper').checked) {numberOfChecks++}
    if(document.getElementById('lower').checked) {numberOfChecks++}
    if(document.getElementById('number').checked) {numberOfChecks++}
    if(document.getElementById('special').checked) {numberOfChecks++}
    if(numberOfChecks == 0) {
        document.getElementById('miscText').innerText = "Please check at least one textbox.";
        return;
    }
    const upperCase = upper.checked;
    const lowerCase = lower.checked;
    const includeNumbers = number.checked;
    const symbol = symbols.checked;
    const characterAmount = characterAmountNumber.value;
    const password = generatePassword(characterAmount, upperCase, includeNumbers, symbol);   
    passwordDisplay.innerText = password;
    miscText.innerText = " ";
})

function generatePassword(characterAmount, includeUpperCase, includeNumber, includeSymbols) {
    let charCodes = LOWER_CHAR_CODES;
    if(includeUpperCase) charCodes = charCodes.concat(UPPERCASE_CHAR_CODES);
    if(includeNumber) charCodes = charCodes.concat(NUMBER_CHAR_CODES);
    if(includeSymbols) charCodes = charCodes.concat(SYMBOL_CHAR_CODES);
    const passwordCharacters = [];
    for(let i = 0; i < characterAmount; i++){
        const characterCode = charCodes[Math.floor(Math.random() * charCodes.length)];
        passwordCharacters.push(String.fromCharCode(characterCode));
    }
    return passwordCharacters.join('');
}

function arrayFromLowToHigh(low, high) {
    const array = [];
    for(let i = low; i< high; i++){
        array.push(i);
    }
    return array;
}

//Check if the password provided is part of the top 10 million most common passwords
/* function topPass(){
    let pw = document.getElementById('password');
    
    const fs = require('fs')
    fs.readFile('top10-million-password-list.txt', (err, data) => {
        if (err) throw err;
        console.log(data.toString());
    })    
}
 */

function numberOfTries(){
    let pass = document.getElementById('password').value;
    console.log(pass)

    // let hasUpper,hasLower,hasNumber,hasSymbol;
    let lowalpha = 0;
    let upalpha = 0;
    let num = 0;
    let symbols = 0;
    let lengthofPass = pass.length;
    
       
    if(/[A-Z]/.test(pass)){
        lowalpha = 1;
        console.log("Has upper case")
    }

    if(/[a-z]/.test(pass)){
        upalpha = 1;
        console.log("Has lower case")
    }

    if(/[0-9]/.test(pass)){
        num = 1;
        console.log("Has numbers")
    }
    
    if(containsSymbol(pass)){
        symbols = 1;
        console.log("Has symbols")
    }
    

    let numberoftries = ((lowalpha * 26) + (upalpha * 26) + (num * 10) + (symbols * 35))**lengthofPass;
    console.log(numberoftries)
    document.getElementById('displayTries').innerHTML = "<p>Result: " + numberoftries + "</p>";
}


/* function containsUppercase(str) {
    return /^[A-Z]+$/.test(str);
}
function containsLowercase(str) {
    return /^[a-z]+$/.test(str);
}
function containsNumbers(str) {
    return /[0-9]/.test(str);
} */

function containsSymbol(str){
    var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

    if(format.test(str)){
        return true;
    } 
    else {
        return false;
    }
}
