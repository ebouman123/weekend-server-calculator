const express = require('express');
const app = express();
let PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(express.static('server/public'));
app.use(express.urlencoded({extended:true}))

// Global variable that will contain all of the
// calculation objects:
let calculations = []


// Here's a wonderful place to make some routes:

// GET: Send the calculations array to the client
app.get('/calculations', (req, res) => {
  console.log('GET calculations was run')
  res.send(calculations)
})
// POST: Take the inputs from the client and run them through the evaluate function
  // evaluate() will add the answer to the calculations array
app.post('/calculations', (req, res) => {
  let numbersInput = req.body
  console.log('req.body', req.body)
  let evaluateAnswer = evaluate(req.body)
  console.log('Current calculations array:',calculations)
  // console.log('evaluate() was called')
  res.sendStatus(201)
})

// function to calculate the answer based on the operator sent
let evaluate = (calcObject) => {
  let numOne = calcObject.numOne
  // console.log('numOne',numOne)
  let numTwo = calcObject.numTwo
  // console.log('numTwo', numTwo)
  let operator = calcObject.operator
  // console.log('operator', operator)
  let result = 0
  let answer = {
    numOne: numOne,
    numTwo: numTwo,
    operator: operator,
    result: result
  }

  // Check the operator and execute the appropriate calculation
    // Add the result to the answer object
      // Push the object into the calculations array
  if (operator === '+'){
    result = Number(numOne) + Number(numTwo)
    answer.result = result
    calculations.push(answer)
  }else if (operator === '-'){
    result = numOne - numTwo
    answer.result = result
    calculations.push(answer)
  }else if (operator === '/'){
    result = numOne / numTwo
    answer.result = result
    calculations.push(answer)
  }else if (operator === '*'){
    result = numOne * numTwo
    answer.result = result
    calculations.push(answer)
  }else{
    console.log('this shit broke')
  }

}






// PLEASE DO NOT MODIFY ANY CODE BELOW THESE BEARS:
// 🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸

// Makes it so you don't have to kill the server
// on 5000 in order to run the tests:
if (process.env.NODE_ENV === 'test') {
  PORT = 5002;
}

// This starts the server...but also stores it in a variable.
// This is weird. We have to do it for testing reasons. There
// is absolutely no need for you to reason about this.
const server = app.listen(PORT, () => {
  console.log('server running on: ', PORT);
});

// server.setTimeout(500)

// This is more weird "for testing reasons" code. There is
// absolutely no need for you to reason about this.
app.closeServer = () => {
  server.close();
}

app.setCalculations = (calculationsToSet) => {
  calculations = calculationsToSet;
}

module.exports = app;
