import React, { Component, isValidElement } from 'react';
import './App.css';
import GradingContainer from './components/GradingContainer';

const TemperatureTypes = {
  Celsius: 'Celsius',
  Fahrenheit: 'Farhenheit',
  Kelvin: 'Kelvin',
  Rankine: 'Rankine'
}

let defaultGradingAnswers = {
  tempInput: '',
  tempInputType: TemperatureTypes.Celsius,
  targetUnits: TemperatureTypes.Celsius,
  studentResponse: '',
  grade: ''
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gradingContainerContent: [
        {...defaultGradingAnswers}
      ]
    };
  }
  handleInputChange = (event) => {
    const target = event.target
    const value = target.value
    const name = target.name
    let splitName = name.split('-')
    let inputIndex = splitName[1]
    let key = splitName[0]
    let newGradingContainer = [...this.state.gradingContainerContent]
    newGradingContainer[inputIndex][key] = value
    this.setState({
      gradingContainerContent: newGradingContainer
    })
  }
  handleSubmit = async (event) => {
    event.preventDefault();
    const dataToSend = []
    for(let i = 0; i < event.target.length; i++) {
      let row = event.target[i]
      let rowNameSplit = row.name.split('-')
      let rowName = rowNameSplit[0]
      let rowIndex = rowNameSplit[1]
      if(!dataToSend[rowIndex]) {
        dataToSend[rowIndex] = {}
      }
      dataToSend[rowIndex][rowName] = row.value
    }
    const response = await fetch('/express_backend',{
      method: 'POST',
      body: JSON.stringify(dataToSend)
    })
    const body = await response.json();
    this.setState({
      gradingContainerContent: body.response
    })
  }
  addRow = (event) => {
    event.preventDefault()
    this.setState({
      gradingContainerContent: [...this.state.gradingContainerContent, {...defaultGradingAnswers}]
    })
  }
  removeRow = (event) => {
    event.preventDefault();
    let modifiedArray = [...this.state.gradingContainerContent]
    modifiedArray.splice(event.target.dataset.rowNumber, 1)
    this.setState({
      gradingContainerContent: modifiedArray
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Temperature Conversion Grading</h1>
        </header>
        <form onSubmit={this.handleSubmit}>
        {
          Array.from({length: this.state.gradingContainerContent.length})
          .map((x, i) => (
            <GradingContainer 
              key={i} 
              answers={this.state.gradingContainerContent[i]} 
              TemperatureTypes={TemperatureTypes}
              handleInputChange={this.handleInputChange}
              removeRow={this.removeRow}
              index={i}
            />
          ))
        }
        <div className="form-submission">
          <button className="waves-effect waves-light btn" onClick={this.addRow}> Add Row</button>
          <input className="waves-effect waves-light btn purple" type="submit" value="Submit" />
        </div>
        </form>
      </div>
    );
  }
}

export default App;