import React, { Component } from 'react';
import './QuestionFields.css';



class QuestionFields extends Component {
  constructor(props) {
    super(props);
    console.log('props in QuestionFields = ', props)
    console.log('this.props QuestionFields = ', this.props)
  }
  

  render() {
    //I would make the text inputs into number fields but I believe the requirements want
    //text to be an option based on incorrect text answers in the example.
    return (
      <React.Fragment>
        <label>
          Temperature Input
          <input
            name={"tempInput-" + this.props.index}
            type="text"
            // defaultValue={this.props.answers.tempInput}
            value={this.props.answers.tempInput}
            onChange={this.props.handleInputChange}
          />
        </label>
        <label>
          Temperature Input Type
          <select 
            // defaultValue={this.props.answers.tempInputType} 
            value={this.props.answers.tempInputType}
            onChange={this.props.handleInputChange}
            name={"tempInputType-" + this.props.index}
          >
            <option value={this.props.TemperatureTypes.Celsius}>{this.props.TemperatureTypes.Celsius}</option>
            <option value={this.props.TemperatureTypes.Fahrenheit}>{this.props.TemperatureTypes.Fahrenheit}</option>
            <option value={this.props.TemperatureTypes.Kelvin}>{this.props.TemperatureTypes.Kelvin}</option>
            <option value={this.props.TemperatureTypes.Rankine}>{this.props.TemperatureTypes.Rankine}</option>
          </select>
        </label>
        <label>
          Target Units
          <select 
            // defaultValue={this.props.answers.tempInputType} 
            value={this.props.answers.targetUnits}
            onChange={this.props.handleInputChange}
            name={"targetUnits-" + this.props.index}
          >
            <option value={this.props.TemperatureTypes.Celsius}>{this.props.TemperatureTypes.Celsius}</option>
            <option value={this.props.TemperatureTypes.Fahrenheit}>{this.props.TemperatureTypes.Fahrenheit}</option>
            <option value={this.props.TemperatureTypes.Kelvin}>{this.props.TemperatureTypes.Kelvin}</option>
            <option value={this.props.TemperatureTypes.Rankine}>{this.props.TemperatureTypes.Rankine}</option>
          </select>
        </label>
        <label>
        Student Response
          <input
            name={"studentResponse-" + this.props.index}
            type="text"
            // defaultValue={this.props.answers.studentResponse}
            value={this.props.answers.studenetResponse}
            onChange={this.props.handleInputChange}
          />
        </label>
        <div className="grade">Grade: {this.props.answers.grade}</div>
        <button className="remove-row" data-row-number={this.props.index} onClick={this.props.removeRow}>Remove Row</button>
      </React.Fragment>
    )
  }

}

export default QuestionFields;