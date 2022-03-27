import React, { Component } from 'react';
import './QuestionFields.css';
import M from 'materialize-css'



class QuestionFields extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount = () => {
    M.AutoInit()
  }
  

  render() {
    let gradeTextColor = ''
    if(this.props.answers.grade) {
      gradeTextColor = this.props.answers.grade === "correct" ? "green-text text-darken-4" : "red-text"
    }
    //I would make the text inputs into number fields but I believe the requirements want
    //text to be an option based on incorrect text answers in the example.
    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col md2 valign-wrapper input-field">
              <label>Temperature Input</label>
                <input
                  name={"tempInput-" + this.props.index}
                  type="text"
                  // defaultValue={this.props.answers.tempInput}
                  value={this.props.answers.tempInput}
                  onChange={this.props.handleInputChange}
               />
            </div>
            <div className="col md2 valign-wrapper input-field">
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
                <label>Temperature Input Type</label>
            </div>
            <div className="col md2 valign-wrapper input-field">
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
                <label>Target Units</label>
            </div>
            <div className="col md2 valign-wrapper input-field">
                <input
                  name={"studentResponse-" + this.props.index}
                  type="text"
                  // defaultValue={this.props.answers.studentResponse}
                  value={this.props.answers.studentResponse}
                  onChange={this.props.handleInputChange}
                />
              <label>Student Response</label>
            </div>
            <div className="col md2 valign-wrapper">
              <div className="grade">Grade: <span className={gradeTextColor}>{this.props.answers.grade}</span></div>
            </div>
            <div className="col md2 valign-wrapper">
              <button className="remove-row waves-effect waves-light btn red" data-row-number={this.props.index} onClick={this.props.removeRow}>Remove Row</button>
            </div>
          </div>
        </div>
        <div class="divider"></div>
      </React.Fragment>
    )
  }

}

export default QuestionFields;