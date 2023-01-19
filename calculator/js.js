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
    let resultOfEquation = calculate(document.getElementById("result").value)
    const f = x => ( (x.toString().includes('.')) ? (x.toString().split('.').pop().length) : (0) );
    if(f(resultOfEquation) < 5){
        document.getElementById("result").value = resultOfEquation
    }
    else{
        document.getElementById("result").value = resultOfEquation.toFixed(5)
    }

    if(document.getElementById("result").value.includes('.')){
      while(document.getElementById("result").value.slice(-1)=="0"){
      document.getElementById("result").value = (document.getElementById("result").value).substring(0,(document.getElementById("result").value).length -1)
      }
      if((document.getElementById("result").value.slice(-1)==".")){
        document.getElementById("result").value = (document.getElementById("result").value).substring(0,(document.getElementById("result").value).length -1)
      }
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
    if(calculate(document.getElementById("result").value) === undefined){
      document.getElementById("result").value = (document.getElementById("result").value) *168
    }
    else{    
      document.getElementById("result").value = calculate(document.getElementById("result").value) *168
  }
    equal()
}


function square(){
    if(document.getElementById("result").value.length === 0){
        return
    }
    if(calculate(document.getElementById("result").value) === undefined){
      document.getElementById("result").value = (document.getElementById("result").value) *(document.getElementById("result").value)
    }
    else{    
      document.getElementById("result").value = calculate(document.getElementById("result").value) *calculate(document.getElementById("result").value)
  }
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

  try{equal()}
    finally{
    navigator.clipboard.writeText(document.getElementById("result").value)
        .then(() => {})}
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

document.getElementById("equalClipBoard").addEventListener("click", equalClipBoard)
document.getElementById("equal").addEventListener("click", equal)
document.getElementById("volumetricWeight").addEventListener("click", volumetricWeight)
document.getElementById("square").addEventListener("click", square)
document.getElementById("deletef").addEventListener("click", deletef)
document.getElementById("deleteLastDigit").addEventListener("click", deleteLastDigit)
document.getElementById("num1").addEventListener("click", function(){ num(1)})
document.getElementById("num2").addEventListener("click", function(){ num(2)})
document.getElementById("num3").addEventListener("click", function(){ num(3)})
document.getElementById("num4").addEventListener("click", function(){ num(4)})
document.getElementById("num5").addEventListener("click", function(){ num(5)})
document.getElementById("num6").addEventListener("click", function(){ num(6)})
document.getElementById("num7").addEventListener("click", function(){ num(7)})
document.getElementById("num8").addEventListener("click", function(){ num(8)})
document.getElementById("num9").addEventListener("click", function(){ num(9)})
document.getElementById("num0").addEventListener("click", function(){ num(0)})
document.getElementById("num+").addEventListener("click", function(){ num("+")})
document.getElementById("num-").addEventListener("click", function(){ num("-")})
document.getElementById("num*").addEventListener("click", function(){ num("*")})
document.getElementById("num/").addEventListener("click", function(){ num("/")})
document.getElementById("num.").addEventListener("click", function(){ num(".")})
document.getElementById("num)").addEventListener("click", function(){ num(")")})
document.getElementById("num(").addEventListener("click", function(){ num("(")})
document.getElementById("previousResultBTN1").addEventListener("click", function(){ previousResulttoCB(0)})
document.getElementById("previousResultBTN2").addEventListener("click", function(){ previousResulttoCB(1)})
document.getElementById("previousResultBTN3").addEventListener("click", function(){ previousResulttoCB(2)})
document.getElementById("previousResultBTN4").addEventListener("click", function(){ previousResulttoCB(3)})






function calculate(input) {

    var f = {
      add: '+',
      sub: '-',
      div: '/',
      mlt: '*',
      mod: '%',
      exp: '^'
    };
  
    // Create array for Order of Operation and precedence
    f.ooo = [
      [
        [f.mlt],
        [f.div],
        [f.mod],
        [f.exp]
      ],
      [
        [f.add],
        [f.sub]
      ]
    ];
  
    var output;
    for (var i = 0, n = f.ooo.length; i < n; i++) {
  
      // Regular Expression to look for operators between floating numbers or integers
      var re = new RegExp('(\\d+\\.?\\d*)([\\' + f.ooo[i].join('\\') + '])(\\d+\\.?\\d*)');
      re.lastIndex = 0; // take precautions and reset re starting pos
  
      // Loop while there is still calculation for level of precedence
      while (re.test(input)) {
        output = _calculate(RegExp.$1, RegExp.$2, RegExp.$3);
        if (isNaN(output) || !isFinite(output)) 
          return output; // exit early if not a number
        input = input.replace(re, output);
      }
    }
  
    return output;
  
    function _calculate(a, op, b) {
      a = a * 1;
      b = b * 1;
      switch (op) {
        case f.add:
          return a + b;
          break;
        case f.sub:
          return a - b;
          break;
        case f.div:
          return a / b;
          break;
        case f.mlt:
          return a * b;
          break;
        case f.mod:
          return a % b;
          break;
        case f.exp:
          return Math.pow(a, b);
          break;
        default:
          null;
      }
    }
  }
































function boxDimensions(){
  let dimesions = document.getElementById("boxDimensions").value
  let numberOfBoxes = document.getElementById("boxNumber").value
  let weightOfBoxes = document.getElementById("boxWeight").value
  dimesions = dimesions.replace(/[,]/g, '.')
  dimesions = dimesions.replace(/[-]/g, ' ')
  let dimensionsRegExp = /[+-]?([0-9]*[.])?[0-9]+/g
  let dimensionResult = dimesions.match(dimensionsRegExp)
  if((dimensionResult[0] < 1)||(dimensionResult[1] < 1)||(dimensionResult[2] < 1)){
    let scalar = 100;
    dimensionResult = dimensionResult.map(dimensionResultIndex => dimensionResultIndex * scalar);
  }
  let oneBoxVolume = (dimensionResult[0] * dimensionResult[1]* dimensionResult[2]) / 1000000
  let wholeVolume = oneBoxVolume * numberOfBoxes
  let volumeWeight = wholeVolume * 168
  let wholeWeight = weightOfBoxes * numberOfBoxes
  let dimensionS = dimensionResult.join('-')
  navigator.clipboard.writeText(`Gross weight - ${wholeWeight.toFixed(2)} kg
Cargo volume - ${wholeVolume.toFixed(2)} cbm (${volumeWeight.toFixed(2)} kg)
Total boxes quantity - ${numberOfBoxes} ctn
Each box size - ${dimensionS} cm, ${weightOfBoxes} kg`)

}

  document.getElementById("boxesCalculationandtoCB").addEventListener("click", function(){ boxDimensions()})






































function inchesCalculate(){
  let inches = document.getElementById("inchesIn").value
  inches = inches.replace(/[,]/g, '.')
  inches = inches.replace(/[-]/g, ' ')
  let inchesRegExp = /[+-]?([0-9]*[.])?[0-9]+/g
  let inchesResult = inches.match(inchesRegExp)
    let inchesResult1 = inchesResult.map(i => (i*2.54).toFixed(1));
  document.getElementById("inchesOut").value = inchesResult1.join(' - ') + ' cm'
}
document.getElementById("inchesIn").addEventListener("input", function(){ inchesCalculate()})


function lbsCalculate(){
  let lbs = document.getElementById("lbsIn").value
  lbs = lbs.replace(/[,]/g, '.')
  lbs = lbs.replace(/[-]/g, ' ')
    let lbs1 = (lbs * 0.45).toFixed(2);
  document.getElementById("lbsOut").value = lbs1 + ' kg'

}

document.getElementById("lbsIn").addEventListener("input", function(){ lbsCalculate()})


































let ratesButtonManager = document.getElementById("ratesButtonManager")
let ratesButtonClient = document.getElementById("ratesButtonClient")
ratesButtonManager.addEventListener("click", function(){calculateRates("manager")})
ratesButtonClient.addEventListener("click", function(){calculateRates("client")})



function calculateRates(who){
  function r(number){
    number = number / 10
    return Math.ceil(number)*10
  }
  

  let superMatsonRate = parseFloat(document.getElementById("ratesInput").value.match(/(?<=fast ma[ts][ts]on.+)[0-9]*[.]?[0-9]+/i))
  let seaTruckRate = parseFloat(document.getElementById("ratesInput").value.match(/(?<=sea ?truck.*)[0-9]*[.]?[0-9]+/i))
  let seaUpsRate = parseFloat(document.getElementById("ratesInput").value.match(/(?<=sea ups.+)[0-9]*[.]?[0-9]+/i))
  let normalMatsonRate = parseFloat(document.getElementById("ratesInput").value.match(/(?<=normal ma[st][st]on.+)[0-9]*[.]?[0-9]+/i))
  let airRate = parseFloat(document.getElementById("ratesInput").value.match(/(?<=air.+)[0-9]*[.]?[0-9]+/i))
  let pickUpRate = parseFloat(document.getElementById("ratesInput").value.match(/(?<=pick ?up.+)[0-9]*[.]?[0-9]+/i))
  let cargoGrossWeight = parseFloat(document.getElementById("cargoInput").value.match(/(?<=weight.+)[0-9]*[.]?[0-9]+/i))
  let cargoVolume = parseFloat(document.getElementById("cargoInput").value.match(/(?<=volume.+)[0-9]*[.]?[0-9]+/i))
  let cargoVolumeWeight = parseFloat(document.getElementById("cargoInput").value.match(/(?<=\(.*)[0-9]*[.]?[0-9]+/i))
  let cargoBoxesQuoantity = parseFloat(document.getElementById("cargoInput").value.match(/(?<=quantity.*)[0-9]*[.]?[0-9]+/i))
  let cargoName = document.getElementById("cargoInput").value.match(/(?<=product).*(?=\n)/i)+""
  let cargoDestination = document.getElementById("cargoInput").value.match(/(?<=destination - ).*/i) +""
  let biggerWeight = 0
  let overPrice = 0
  let combinedMethodSuperMatsonNumber = document.getElementById("combinedMatsonNumber").value


  //calculate bigger weight
  if(cargoGrossWeight>cargoVolumeWeight){
    biggerWeight = cargoGrossWeight
  }
  if(cargoVolumeWeight>cargoGrossWeight){
    biggerWeight = cargoVolumeWeight
  }
  let cheapestMethod = ""
  let cheapestMethodRate = 0
  let cheapestMethodRateMeasure 
  


  let oneBoxWeight = biggerWeight / cargoBoxesQuoantity

  if(seaUpsRate*biggerWeight <= seaTruckRate*cargoVolume){
    cheapestMethod = "UPS"
    cheapestMethodRate = seaUpsRate
    cheapestMethodRateMeasure = biggerWeight
  }
  if(seaUpsRate*biggerWeight >= seaTruckRate*cargoVolume){
    cheapestMethod = "truck"
    cheapestMethodRate = seaTruckRate
    cheapestMethodRateMeasure = cargoVolume
  }
  

  //calculate overprice
  if(biggerWeight<500){
    overPrice = 200
  }
  else if(biggerWeight<860){
    overPrice = biggerWeight*0.4
  }
  else if(biggerWeight<2000){
    overPrice = biggerWeight*0.3
  }
  else if(biggerWeight<3000){
    overPrice = biggerWeight*0.25
  }
  else if(biggerWeight<6000){
    overPrice = biggerWeight*0.2
  }

  if(who === "manager"){
    navigator.clipboard.writeText(`air : ${airRate} usd per kg - ${(airRate*biggerWeight).toFixed(2)}(${r(airRate*biggerWeight+overPrice)})
fast maston :  ${superMatsonRate} usd per kg - ${(superMatsonRate*biggerWeight).toFixed(2)}(${r(superMatsonRate*biggerWeight+overPrice)})
normal maston : ${normalMatsonRate} usd per kg - ${(normalMatsonRate*biggerWeight).toFixed(2)}(${r(normalMatsonRate*biggerWeight+overPrice)})
sea ups ：${seaUpsRate} usd per kg - ${(seaUpsRate*biggerWeight).toFixed(2)}(${r(seaUpsRate*biggerWeight+overPrice)})
sea truck : ${seaTruckRate} usd per cbm -  ${(seaTruckRate*cargoVolume).toFixed(2)}(${r(seaTruckRate*cargoVolume+overPrice)})
combined ${combinedMethodSuperMatsonNumber} matson and ${cargoBoxesQuoantity-combinedMethodSuperMatsonNumber} ${cheapestMethod} - ${(combinedMethodSuperMatsonNumber*oneBoxWeight*superMatsonRate).toFixed(2)}+${(((cheapestMethodRateMeasure/cargoBoxesQuoantity)*(cargoBoxesQuoantity-combinedMethodSuperMatsonNumber))*cheapestMethodRate).toFixed(2)}(${r((combinedMethodSuperMatsonNumber*oneBoxWeight*superMatsonRate)+(((cheapestMethodRateMeasure/cargoBoxesQuoantity)*(cargoBoxesQuoantity-combinedMethodSuperMatsonNumber))*cheapestMethodRate)+overPrice)})
pickup :  ${pickUpRate} usd(${r(pickUpRate+30)})`)
}


  if(who === "client"){
    navigator.clipboard.writeText(`DESTINATION : ${cargoDestination}
PRODUCT : ${cargoName}
NUMBER OF CARTONS : ${cargoBoxesQuoantity} CARTONS
TOTAL GROSS WEIGHT : ${cargoGrossWeight} KG 
TOTAL VOLUME:  ${cargoVolume} CBM
SERVICE : DDP – DUTY PAID

METHODS OF DELIVERY TERMS AND PRICES:
-COMBINED
${combinedMethodSuperMatsonNumber} BOXES – SUPER MATSON - 18-25 WORKING DAYS
${cargoBoxesQuoantity - combinedMethodSuperMatsonNumber} BOXES - REGULAR OCEAN FREIGHT - 40-45 WORKING DAYS
TOTAL PRICE DDP : ${r((combinedMethodSuperMatsonNumber*oneBoxWeight*superMatsonRate)+(((cheapestMethodRateMeasure/cargoBoxesQuoantity)*(cargoBoxesQuoantity-combinedMethodSuperMatsonNumber))*cheapestMethodRate)+overPrice)} USD

-AIR FREIGHT + UPS
TOTAL PRICE DDP : ${r(airRate*biggerWeight+overPrice)} USD
TIME : 10-13 WORKING DAYS 

-REGULAR OCEAN FREIGHT 
TOTAL PRICE DDP : ${r(seaTruckRate*cargoVolume+overPrice)} USD 
TIME : 40-45 WORKING DAYS

-FAST OCEAN FREIGHT 
TOTAL PRICE DDP : ${r(seaUpsRate*biggerWeight+overPrice)} USD
TIME : 30-35  WORKING DAYS 

-MATSON OCEAN FREIGHT 
TOTAL PRICE DDP : ${r(superMatsonRate*biggerWeight+overPrice)} USD
TIME : 18-25  WORKING DAYS 

PICK UP PRICE : ${r(pickUpRate+30)} USD 
`)
  }
}

















//save and render cargo and rates

document.getElementById("ratesInput").addEventListener("input", function(){localStorage.setItem("ratesInputInLS", document.getElementById("ratesInput").value) })
document.getElementById("cargoInput").addEventListener("input", function(){localStorage.setItem("cargoInputInLS", document.getElementById("cargoInput").value) })


function renderRatesFromLS(){
  document.getElementById("ratesInput").value = (localStorage.getItem("ratesInputInLS"))
}

function renderCargoFromLS(){
  document.getElementById("cargoInput").value = (localStorage.getItem("cargoInputInLS"))
}

if((localStorage.getItem("ratesInputInLS"))){
  renderRatesFromLS()
}
if((localStorage.getItem("cargoInputInLS"))){
  renderCargoFromLS()
}