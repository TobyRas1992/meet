import React, { Component } from 'react';

class Alert extends Component {
  constructor(props) {
    super(props);
    this.color = null;
  }
  getStyle = () => {
    return {
      color: this.color
    };
  }
  render() {
    return (
      <div className="Alert">
        <p style={this.getStyle()}>{this.props.text}</p>
      </div>
    );
  }
}

class InfoAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = 'blue';
  }
  getStyle = () => {
    return {
      color: this.color,
      fontWeight: "bold",
      margin: "45px"
    }
  }
}

class ErrorAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = "red";
  }
  getStyle = () => {
    return {
      color: this.color,
      fontWeight: "bold",
      margin: "48px"
    };
  }
}

class WarningAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = "green";
  }
  getStyle = () => {
    return {
      color: this.color,
      fontSize: "20px",
      margin: "45px"
    };
  }
}

export { InfoAlert, ErrorAlert, WarningAlert }