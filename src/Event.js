import React, {Component} from 'react';

class Event extends Component {
  state = {
    details: false,
    event: this.props.event
}

  showDetails(e) {
    this.setState({details: true});
  }

  hideDetails(e) {
    this.setState({details: false});
  }

  render() {
    const {details} = this.state;
    const {event} = this.state;

    return <div className= "event">
      <div></div>
      <h3 className="name"></h3> {/* Fix: show event object name */}
      <div className="overview"></div>
      {details ? <div className="infoContainer">
        <h4>About event:</h4>
        <a className="eventGoogleLink" href="https://blahblahblahblah">see details on Google Calendar</a>
        <div className='xtraEventInfo'>Large info box</div>
        <button className=".hideDetailsButton" onClick={() => this.hideDetails()}>Hide Details</button>
      </div> : <button className=".showDetailsButton" onClick={() => this.showDetails()}>Show Details</button>}
    </div>; 
  }
}

export default Event;