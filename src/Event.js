import React, {Component} from 'react';

class Event extends Component {
  state = {
    details: false
}

  showDetails(e) {
    this.setState({details: true});
  }

  hideDetails(e) {
    this.setState({details: false});
  }

  render() {
    const {details} = this.state;

    return <div className= "eventDiv">
      <h3 className=".name">name</h3> {/* Fix: show event object name */}
      <div className="basicDetails">basic details</div>
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