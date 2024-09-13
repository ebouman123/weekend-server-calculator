function onReady(){
console.log('client.js is sourced!');
getCalcs()
}

onReady()

let operator = ''

function postCalc(event){
    event.preventDefault()
    let numOne = document.getElementById('numOne').value
    let numTwo = document.getElementById('numTwo').value
    let operatorInput = operator

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
        console.log('response.data', response.data)
      })
      .catch(function(error){
        console.log(error);
       alert('oh crap')
      })
}



// Function to GET the calculations array from the server
function getCalcs() {
    let calculations = []
    axios({
        method: 'GET',
        url: '/calculations',
    })
    .then ((response) => {
        console.log('response.data from GET', response.data);
        calculations = response.data
        // renderToDom()
    })
    .catch(function(error){
        console.log('error:', error)
    })
}  


function getOperator(event){
    event.preventDefault()
    operator = event.target.innerText

}

// Display calculations array inside <section id="resultHistory"> when it loads
    // re-render when new calc is made
        // i.e. list (12 - 4 = 8)

      



// Display calculation.length-1 inside <section id="recentResults">
    // re-render when new calc is made




// Take inputs from two inputs and the button and send those values when = is clicked
    // Place inputs in an object {numOne: , numTwo: , operator: }




// Create a C button that clears the inputs