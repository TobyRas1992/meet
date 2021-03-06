import React, { Component } from 'react';
import { ErrorAlert } from "./Alert";
import { WarningAlert } from "./Alert";

class NumberOfEvents extends Component {
  state = {
    numberOfEvents: 32
  }

  handleInputChange = (event) => {
    const value = event.target.value;
    this.setState({
      numberOfEvents: value
    })
    if (value < 0 || value > 32) {
      this.setState({
        errorText: "Select a number between 1 and 32"
      })
    } else if (isNaN(value)) {
      this.setState({
        warningText: "Input field only accepts numbers"
      });
    } else {
      this.setState({
        errorText: "",
        warningText: ""
      });
    }
    this.props.updateNumberOfEvents(value);
  }

  render() {
    return <div className="numberOfEvents">
      <div className="alert-message">
        <ErrorAlert text={this.state.errorText} />
        <WarningAlert text={this.state.warningText} />
      </div>
      <label className="input-message">Number of Events:</label>
      <input
        type="number" // change this to text to render WarningAlert 
        name="EventNumber"
        className="numberInput"
        placeholder="Enter Number of Events"
        value={this.state.numberOfEvents}
        onChange={(e) => this.handleInputChange(e)}
      />
    </div>
  }
}

export default NumberOfEvents;
