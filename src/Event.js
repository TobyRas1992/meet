import React, {Component} from 'react';

class Event extends Component {
  state = {
    details: false
}

changeDetailsState = () => {
  if (this.state.details === true) {
    this.setState({details: false});
  } else {
    this.setState({details: true});
  }
};

  render() {
    const {event} = this.props;

    return <div className= "event">
      <h1 className="name">{event.summary}</h1>
      <p>{event.start.dateTime}</p>
      <p className="event-location">{event.location}</p>
      { this.state.details &&
        (<div className="event-details">
            <h2>About event:</h2>
            <a className="eventGoogleLink" href={event.htmlLink}>See details on Google Calendar</a>
            <p>{event.description}</p>
        </div>)
      }
      {!this.state.details
      ? <button className=".showDetailsButton" onClick={() => this.changeDetailsState()}>Show Details</button>
      : <button className=".hideDetailsButton" onClick={() => this.changeDetailsState()}>Hide Details</button>
      }
    </div>; 
  }
}

export default Event;