function onReady(){
console.log('client.js is sourced!');
getCalcs()
}


let operator = ''
let calculations = []

onReady()


// Function to determine which operator was chosen and send it to the operator global variable
function getOperator(event){
    event.preventDefault()
    operator = event.target.innerText
}

// Function to GET the calculations array from the server
function getCalcs() {
    axios({
        method: 'GET',
        url: '/calculations',
    })
    .then ((response) => {
        // GETs the calculations array from the server
        calculations = response.data
        let resultHistorySection = document.getElementById('resultHistory')
        let recentResultsSection = document.getElementById('recentResult')

        // Reset the resultHistory section
            // loop through the calculations array and put the equations on the DOM
        resultHistorySection.innerHTML = ''
        for (let calc of calculations){
        resultHistorySection.innerHTML += `<li>${calc.numOne} ${calc.operator} ${calc.numTwo} = ${calc.result}</li>`
        }
        // If the calculations.length > 0 render the most recent result
            // This gets around the result having no value when the page is first loaded
        if(calculations.length > 0){
            recentResultsSection.innerHTML = `<p>${calculations[calculations.length - 1].result}</p>`
        }
    })
    .catch(function(error){
        console.log('error:', error)
    })
}  

// Function to gather the inputs and POST them to the server
function postCalc(event){
    event.preventDefault()
    let numOne = document.getElementById('numOne').value
    let numTwo = document.getElementById('numTwo').value
    let operatorInput = operator

    // Put the inputs into an object to be POSTed to the server
    let newCalc = {
        numOne: numOne,
        numTwo: numTwo,
        operator: operatorInput
    }
    axios({
        method: 'POST',
        url: '/calculations',
        data: newCalc
      })
      .then ((response) =>{
        // Call getCalcs() after the data is posted
        getCalcs()
      })
      .catch(function(error){
        console.log(error);
       alert('oh crap')
      })
}

// Function for the C button to reset the form inputs
function clearInputs(){
    document.querySelector('form').reset()
    }








// Function to render everything to the DOM
// function renderToDom(){
    
// }




// Display calculations array inside <section id="resultHistory"> when it loads
    // re-render when new calc is made
        // i.e. list (12 - 4 = 8)


// Display calculation.length-1 inside <section id="recentResults">
    // re-render when new calc is made


