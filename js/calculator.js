/*declare necessary variables*/
var input = "" ;
var output = 0 ;

var count = 0 ;
var inputArray = [] ;
const operators = ["+","-","*","/"] ;



/*trigger button clicks*/
function on9ButtonClick () {
    input = input + "9" ;
    showInput() ;
}

function on8ButtonClick () {
    input = input + "8" ;
    showInput() ;
}

function on7ButtonClick () {
    input = input + "7" ;
    showInput() ;
}

function on6ButtonClick () {
    input = input + "6" ;
    showInput() ;
}

function on5ButtonClick () {
    input = input + "5" ;
    showInput() ;
}

function on4ButtonClick () {
    input = input + "4" ;
    showInput() ;
}

function on3ButtonClick () {
    input = input + "3" ;
    showInput() ;
}

function on2ButtonClick () {
    input = input + "2" ;
    showInput() ;
}

function on1ButtonClick () {
    input = input + "1" ;
    showInput() ;
}

function on0ButtonClick () {
    input = input + "0" ;
    showInput() ;
}

function onDotButtonClick () {
    input = input + "." ;
    showInput() ;
}

function onAddButtonClick () {
    input = input + "+" ;
    showInput() ;
}

function onMinusButtonClick () {
    input = input + "-" ;
    showInput() ;
}

function onMultiplyButtonClick () {
    input = input + "*" ;
    showInput() ;
}

function onDivideButtonClick () {
    input = input + "/" ;
    showInput() ;
}

function onClearButtonClick () {
    input = "" ;
    output = 0 ;

    inputArray = [] ;
    count = 0 ;
    document.getElementById('result').textContent = "0" ;
}

function onBackButtonClick () {
    input = input.slice(0,-1) ;
    showInput() ;
}

function onEqualButtonClick () {
    if ( operators.includes(input.charAt(0)) ){
        showError() ;
    }
    else{
        calculate() ;
        showOutput() ;
    }
}



/*calculate the final result*/
function calculate(){
    var noError = splitIntoArray() ;

    if (noError){
        var tempOperatorIndex = 0 ;
        //calculate multiply and divide operations
        while ( inputArray.includes("*") || inputArray.includes("/") ){
            let multIndex = inputArray.indexOf("*") ;
            let divIndex = inputArray.indexOf("/") ;
            let multiBoo = false ;
            let divBoo = false ;

            if (multIndex == -1){
                tempOperatorIndex = divIndex ;
                divBoo = true ;
            }
            else if (divIndex == -1){
                tempOperatorIndex = multIndex ;
                multiBoo = true ;
            }
            else if ( multIndex != -1 && divIndex != -1 ){
                if (multIndex < divIndex){
                    tempOperatorIndex = multIndex ;
                    multiBoo = true ;
                }
                else{
                    tempOperatorIndex = divIndex ;
                    divBoo = true ;
                }
            }

            if (multiBoo == true){
                inputArray[tempOperatorIndex-1] = multiply(inputArray[tempOperatorIndex-1],inputArray[tempOperatorIndex+1]) ; 
            }
            else if (divBoo == true){
                inputArray[tempOperatorIndex-1] = divide(inputArray[tempOperatorIndex-1],inputArray[tempOperatorIndex+1]) ;
            }

            inputArray.splice(tempOperatorIndex,2) ;


        }
        //calculate add and minus operations
        while ( inputArray.includes("+") || inputArray.includes("-")){
            let addIndex = inputArray.indexOf("+") ;
            let minusIndex = inputArray.indexOf("-") ;
            let addBoo = false ;
            let minusBoo = false ;

            if (addIndex == -1){
                tempOperatorIndex = minusIndex ;
                minusBoo = true ;
            }
            else if (minusIndex == -1){
                tempOperatorIndex = addIndex ;
                addBoo = true ;
            }
            else if ( addIndex != -1 && minusIndex != -1 ){
                if (addIndex < minusIndex){
                    tempOperatorIndex = addIndex ;
                    addBoo = true ;
                }
                else{
                    tempOperatorIndex = minusIndex ;
                    minusBoo = true ;
                }
            }

            if (addBoo == true){
                inputArray[tempOperatorIndex-1] = add(inputArray[tempOperatorIndex-1],inputArray[tempOperatorIndex+1]) ; 
            }
            else if (minusBoo == true){
                inputArray[tempOperatorIndex-1] = minus(inputArray[tempOperatorIndex-1],inputArray[tempOperatorIndex+1]) ;
            }

            inputArray.splice(tempOperatorIndex,2) ;
        }
        
        
        output = inputArray[0] ;
    }

    
}

/*add operator*/
function add(firstValue, secondValue){
    return  parseFloat(firstValue) + parseFloat(secondValue );
}

/*minus operator*/
function minus(firstValue, secondValue){
    return parseFloat(firstValue) - parseFloat(secondValue );
}

/*multiply operator*/
function multiply(firstValue, secondValue){
    return parseFloat(firstValue) * parseFloat(secondValue) ;
}

/*divide operator*/
function divide(firstValue, secondValue){
    return parseFloat(firstValue) / parseFloat(secondValue );
}







/*split input into array*/
function splitIntoArray(){
    var startIndex = 0;

    let i = 0 ;
    while ( i < input.length){
            console.log("current input string: " ,input.substring(startIndex,input.length)) ;
            var operatorIndex = findNextOperator(input.substring(startIndex,input.length),0) ;
            

            //if there is no more operators, store the rest of string as value, then add = to the end of array
            if (operatorIndex == -1){             
                inputArray.push( input.substring(startIndex,input.length) ) ;
                count++ ;
                
                inputArray.push( "=" )  ;
                i= input.length ;
            }
            else{       
                //store first value into array                      
                inputArray.push( input.substring(startIndex,startIndex+operatorIndex) ) ;
                count++ ;
                startIndex = startIndex+operatorIndex ;
                //store operator into array
                inputArray.push( input.substring(startIndex,startIndex+1) )  ;
                count++ ;
                startIndex = startIndex+1 ;

                if ( operators.includes( input.substring(startIndex,startIndex+1) ) ){
                    output = "Your calculation input is incorrect. Please clear and re-input." ;
                    return false ;
                }

        
                i = startIndex  ;
            }
            
    } ;

    return true ;
    
}

/*find next operator index*/
function findNextOperator(currentInput, currentIndex){

    addPos = currentInput.indexOf("+") ;
    minusPos = currentInput.indexOf("-") ;
    multiplyPos = currentInput.indexOf("*") ;
    dividePos = currentInput.indexOf("/") ;

    var operatorArray = [] ;

    if ( addPos > currentIndex){
        operatorArray.push(addPos) ;
    }
    if ( minusPos > currentIndex){
        operatorArray.push(minusPos) ;
    }
    if ( multiplyPos > currentIndex){
        operatorArray.push(multiplyPos) ;
    }
    if ( dividePos > currentIndex){
        operatorArray.push(dividePos) ;
    }

    if ( Math.min(...operatorArray) == Infinity ){
        return -1 ;
    }

    

    return Math.min(...operatorArray) ;


}


/*show the current input*/
function showInput(){
    document.getElementById('result').textContent = input ;
}

/*show the calculation output*/
function showOutput(){
    document.getElementById('result').textContent = output ;
}

/*show the error input*/
function showError(){
    document.getElementById('result').textContent = "Your calculation input is incorrect. Please clear and re-input." ;
}
