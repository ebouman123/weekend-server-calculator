function onReady(){
//* Call getCalcs() onReady so it still displays the history after the page is refreshed
getCalcs()
}

let operator = ''
let calculations = []

onReady()

/**
 * Function to determine which operator was chosen and then send it to the operator global variable.
 */
function getOperator(event){
    event.preventDefault()
    //* Operator equals the innerText of whichever operator button is clicked
    operator = event.target.innerText
}

/**
 * Function to GET the calculations array from the server.
 * Also calls the render function.
 */
function getCalcs() {
    axios({
        method: 'GET',
        url: '/calculations',
    })
    .then ((response) => {
        //* GETs the calculations array from the server and sets our calculations array equal to it
        calculations = response.data
        //* Render everything to the DOM
        renderToDom()
    })
    .catch(function(error){
        console.log('error:', error)
    })
}  

/**
 * Function to render the results history and the most recent result to the DOM.
 * Example of an object that will be passed through this function: 
 * let exampleObject = {
    numOne: 2,
    numTwo: 3,
    operator: '+',
    result: 5
  }
 */
function renderToDom(){
    //* Reference the divs where the data will go
    let resultHistorySection = document.getElementById('resultHistory')
    let recentResultsSection = document.getElementById('recentResult')

    //* Reset the resultHistory section
    resultHistorySection.innerHTML = ''

    //* Loop through the calculations array (of objects) and put the equations on the DOM
    for (let calc of calculations){
    resultHistorySection.innerHTML += `<li>${calc.numOne} ${calc.operator} ${calc.numTwo} = ${calc.result}</li>`
    }

    //* If the calculations.length > 0 render the most recent result
        //* This gets around the result having no value when the page is first loaded
    if(calculations.length > 0){
        recentResultsSection.innerHTML = `<p class="result">Last Result: ${calculations[calculations.length - 1].result}</p>`
    }
}

/**
*Function to gather the inputs and POST them to the server.
*/
function postCalc(event){
    event.preventDefault()
    let numOne = document.getElementById('numOne').value
    let numTwo = document.getElementById('numTwo').value
    let operatorInput = operator

    //* Package the inputs into an object to be POSTed to the server
    let newCalc = {
        numOne: numOne,
        numTwo: numTwo,
        operator: operatorInput
    }
    //* Require inputs before POSTing
    if (numOne.length > 0 && numTwo.length > 0 && operatorInput.length > 0){
    axios({
        method: 'POST',
        url: '/calculations',
        data: newCalc
      })
      .then ((response) =>{
        //* Call getCalcs() after the data is posted
        getCalcs()
      })
      .catch(function(error){
        console.log(error);
       alert('oh crap')
      })
    }else{
        alert('😾 PLEASE FILL OUT ALL FIELDS 😾')
    }
}

// Function for the C button to reset the form inputs.
function clearInputs(){
    document.querySelector('form').reset()
}








// Clears the calculations history
// function clearHistory(){
//     axios.delete('/calculations')
//     .then(() => console.log('deleted'))
// }

