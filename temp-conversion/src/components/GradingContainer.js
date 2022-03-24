import React, { Component } from 'react';
import './GradingContainer.css';
import QuestionFields from './QuestionFields';

class GradingContainer extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(event) {
    event.preventDefault()
  }
  render() {
    return (
      <div className="question-field">
        <QuestionFields
          index={this.props.index} 
          answers={this.props.answers} 
          TemperatureTypes={this.props.TemperatureTypes}
          handleInputChange={this.props.handleInputChange}
          removeRow={this.props.removeRow}
        />
      </div>
    )
  }

}

export default GradingContainer;