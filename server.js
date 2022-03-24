var express = require('express')
var app = express()
const port = 5000

const Grades = {
  'Correct': 'correct',
  'Incorrect': 'incorrect',
  'Invalid': 'invalid'
}
const TemperatureTypes = {
  Celsius: 'Celsius',
  Fahrenheit: 'Farhenheit',
  Kelvin: 'Kelvin',
  Rankine: 'Rankine'
}

isValidNumber = (numberToCheck) => {
  return !isNaN(numberToCheck) && !isNaN(parseFloat(numberToCheck))
}

convertToCelsius = (convertFrom, tempInput, studentResponse) => {
  console.log('tempInput toCelsius = ', tempInput)
  let grade = ''
  let correctAnswer = 0
  switch(convertFrom) {
    case TemperatureTypes.Celsius:
      correctAnswer = Math.round(tempInput.toFixed(1))
      break;
    case TemperatureTypes.Fahrenheit:
      correctAnswer = Math.round((5/9 * (tempInput - 32)).toFixed(1))
      break;
    case TemperatureTypes.Kelvin:
      correctAnswer = Math.round((tempInput - 273).toFixed(1))
      break;
    case TemperatureTypes.Rankine:
      correctAnswer = Math.round(((tempInput - 491.67) * (5/9)).toFixed(1))
      break; 
    default:
      return false;
      break;
  }
  grade = (correctAnswer == studentResponse) ? Grades.Correct : Grades.Incorrect
  return grade
}
convertToFahrenheit = (convertFrom, tempInput, studentResponse) => {
  let grade = ''
  let correctAnswer = 0
  switch(convertFrom) {
    case TemperatureTypes.Celsius:
      correctAnswer = Math.round(((tempInput * 9/5) + 32).toFixed(1))
      break;
    case TemperatureTypes.Fahrenheit:
      correctAnswer = Math.round(tempInput.toFixed(1))
      break;
    case TemperatureTypes.Kelvin:
      correctAnswer = Math.round(((tempInput - 273.15) * 9/5 + 32).toFixed(1))
      break;
    case TemperatureTypes.Rankine:
      correctAnswer = Math.round((tempInput - 459.67).toFixed(1))
      break; 
    default:
      return false;
      break;
  }
  grade = (correctAnswer == studentResponse) ? Grades.Correct : Grades.Incorrect
  return grade
}
convertToKelvin = (convertFrom, tempInput, studentResponse) => {
  let grade = ''
  let correctAnswer = 0
  switch(convertFrom) {
    case TemperatureTypes.Celsius:
      correctAnswer = Math.round((tempInput + 273.15).toFixed(1))
      break;
    case TemperatureTypes.Fahrenheit:
      correctAnswer = Math.round(((tempInput - 32) * 5/9 + 273.15).toFixed(1))
      break;
    case TemperatureTypes.Kelvin:
      correctAnswer = Math.round(tempInput.toFixed(1))
      break;
    case TemperatureTypes.Rankine:
      correctAnswer = Math.round((tempInput * 5/9).toFixed(1))
      break; 
    default:
      return false;
      break;
  }
  grade = (correctAnswer == studentResponse) ? Grades.Correct : Grades.Incorrect
  return grade
}
convertToRankine = (convertFrom, tempInput, studentResponse) => {
  let grade = ''
  let correctAnswer = 0
  switch(convertFrom) {
    case TemperatureTypes.Celsius:
      correctAnswer = Math.round((tempInput + 273.15) * 9/5).toFixed(1)
      break;
    case TemperatureTypes.Fahrenheit:
      correctAnswer = Math.round(tempInput + 459.67).toFixed(1)
      break;
    case TemperatureTypes.Kelvin:
      correctAnswer = Math.round(tempInput * 9/5).toFixed(1)
      break;
    case TemperatureTypes.Rankine:
      correctAnswer = Math.round(tempInput.toFixed(1))
      break; 
    default:
      return false;
      break;
  }
  grade = (correctAnswer == studentResponse) ? Grades.Correct : Grades.Incorrect
  return grade
}

returnGrades = (studentInput) => {
  for(let i = 0; i < studentInput.length; i++) {
    let tempInputIsValid = true;
    let studentInputIsValid = true;
    const rowToCheck = studentInput[i]
    let grade = ''
    tempInputIsValid = isValidNumber(rowToCheck.tempInput)
    studentInputIsValid = isValidNumber(rowToCheck.studentResponse)
    if(tempInputIsValid && studentInputIsValid) {
      //We first do a toFixed becaue Math.round will only round based on the first decimal place.
      //ToFixed will round correctly to the first decimal place
      //We only want to round the student's input here because the tempInput has not had the equation done yet.
      rowToCheck.studentResponse = Math.round(parseFloat(rowToCheck.studentResponse).toFixed(1))
      //The numbers come in as strings so we want to parse them before running them.
      rowToCheck.tempInput = parseFloat(rowToCheck.tempInput)
      switch(rowToCheck.targetUnits) {
        case TemperatureTypes.Celsius:
          grade = convertToCelsius(rowToCheck.tempInputType, rowToCheck.tempInput, rowToCheck.studentResponse)
          break;
        case TemperatureTypes.Fahrenheit:
          grade = convertToFahrenheit(rowToCheck.tempInputType, rowToCheck.tempInput, rowToCheck.studentResponse)
          break;
        case TemperatureTypes.Kelvin:
          grade = convertToKelvin(rowToCheck.tempInputType, rowToCheck.tempInput, rowToCheck.studentResponse)
          break;
        case TemperatureTypes.Rankine:
          grade = convertToRankine(rowToCheck.tempInputType, rowToCheck.tempInput, rowToCheck.studentResponse)
          break;
        default:
          grade = "Not a valid target conversion type"
          break;
      }
    }else {
      //If we don't check tempInputIsValid here then we get a false Incorrect if both temp input and student response are characters.
      grade = (!studentInputIsValid && tempInputIsValid) ? Grades.Incorrect : Grades.Invalid
    }
    //False is returned if the temp input data is not part of the switch enums and would therefore be invalid.
    rowToCheck.grade = (grade) ? grade : Grades.Invalid
  }
  return studentInput
}

app.listen(port, () => console.log(`Grading Application listening on port ${port}`))

app.post('/express_backend', (req, res) => {
  let data = ''
  req.on('data', chunk => {
    data += chunk;
  })
  req.on('end', () => {
    console.log(JSON.parse(data)); 
    console.log('about to send the hello!')
    let studentInput = returnGrades(JSON.parse(data))
    res.status(200).send({response: studentInput});
  })
})

