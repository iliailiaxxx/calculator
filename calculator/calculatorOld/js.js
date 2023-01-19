const symbols = ["+","-","*","/",".",]

let previousResultsArray = []
if(JSON.parse(localStorage.getItem("previousResultsArrayInLocalStorage"))){
    previousResultsArray = JSON.parse(localStorage.getItem("previousResultsArrayInLocalStorage"))
}

let previousResultsArrayResults = []
if(JSON.parse(localStorage.getItem("previousResultsArrayInLocalStorageResults"))){
    previousResultsArrayResults = JSON.parse(localStorage.getItem("previousResultsArrayInLocalStorageResults"))
}

renderResultFromLocalStarage()
renderPreviousResults()
focusFunction()


function num(number){
    //symbols can't be inputed if it's first input
    if((document.getElementById("result").value.length === 0)&&(symbols.includes(number))){
        return
    }
    //if last element is symbol and inputed element is symbol last symbol will be replaced
    let lastDigit = (document.getElementById("result").value).slice(-1)
    if((symbols.includes(lastDigit))&&(symbols.includes(number))){
        document.getElementById("result").value = (document.getElementById("result").value).substring(0,(document.getElementById("result").value).length -1) + number
    }
    //just input
    else{document.getElementById("result").value += number}
    saveResultToLocalStorage()
    focusFunction()
}


function equal(){
    //if last element is symbol equal will not work
    let lastDigit = (document.getElementById("result").value).slice(-1)
    if(symbols.includes(lastDigit)){
        return
    }
    conditionsOfEquation = (document.getElementById("result").value)
    //if result is float number of digits after dot will not be more than 3
    let resultOfEquation = (new Function('return '+document.getElementById("result").value)())
    const f = x => ( (x.toString().includes('.')) ? (x.toString().split('.').pop().length) : (0) );
    if(f(resultOfEquation) < 3){
        document.getElementById("result").value = resultOfEquation
    }
    else{
        document.getElementById("result").value = resultOfEquation.toFixed(4)
    }

    updatePreviousResultsArray()
    saveResultToLocalStorage()
    renderPreviousResults()
    focusFunction()
}


function volumetricWeight(){
    if(document.getElementById("result").value.length === 0){
        return
    }
    document.getElementById("result").value = (new Function('return '+document.getElementById("result").value)()) *168
    equal()
}


function square(){
    if(document.getElementById("result").value.length === 0){
        return
    }
    document.getElementById("result").value = (new Function('return '+document.getElementById("result").value)()) * (new Function('return '+document.getElementById("result").value)())
    equal()
}


function deletef(){
    document.getElementById("result").value = ""
    saveResultToLocalStorage()
}


function deleteLastDigit(){
    document.getElementById("result").value = (document.getElementById("result").value).substring(0, (document.getElementById("result").value).length - 1)
    saveResultToLocalStorage()
}


function equalClipBoard(){
    navigator.clipboard.writeText((new Function('return '+document.getElementById("result").value)()))
        .then(() => {})
    equal()
}


function removeCharacters(){
    //replace , with .
    document.getElementById("result").value = document.getElementById("result").value.replace(/[,]/g, '.')
    //abandons everything exept numbers and symbols
    document.getElementById("result").value = document.getElementById("result").value.replace(/[^+-/()*0-9]/g, '')

    //prevent symbols duplicate
    let lastDigit = (document.getElementById("result").value).slice(-1)
    let perLastDigit = (document.getElementById("result").value).slice(-2, -1)
    if((symbols.includes(lastDigit))&&(symbols.includes(perLastDigit))){
        document.getElementById("result").value = (document.getElementById("result").value).substring(0,(document.getElementById("result").value).length -2) + lastDigit
    }
}


function saveResultToLocalStorage(){
    localStorage.setItem("resultInLocalStarage", document.getElementById("result").value)
}


function renderResultFromLocalStarage(){
    document.getElementById("result").value = (localStorage.getItem("resultInLocalStarage"))
}


function updatePreviousResultsArray(){
    previousResultsArrayResults.unshift(document.getElementById("result").value)
    if(previousResultsArrayResults.length === 5){
        previousResultsArrayResults.pop()
    }
    localStorage.setItem("previousResultsArrayInLocalStorageResults", JSON.stringify(previousResultsArrayResults))


    previousResultsArray.unshift(conditionsOfEquation + " = " + document.getElementById("result").value)
    if(previousResultsArray.length === 5){
        previousResultsArray.pop()
    }
    localStorage.setItem("previousResultsArrayInLocalStorage", JSON.stringify(previousResultsArray))
}


function renderPreviousResults(){
    previousResultBTN1.innerHTML=previousResultsArray[0]
    previousResultBTN2.innerHTML=previousResultsArray[1]
    previousResultBTN3.innerHTML=previousResultsArray[2]
    previousResultBTN4.innerHTML=previousResultsArray[3]
    
}


function previousResulttoCB(index){
    navigator.clipboard.writeText(previousResultsArrayResults[index])
        .then(() => {})
}


function focusFunction(){
    result.focus()
}




//events
result.addEventListener("input", removeCharacters)
result.addEventListener("input", saveResultToLocalStorage)
main.addEventListener("click", focusFunction)
result.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        equal()
    }
});









function boxDimensions(){

}