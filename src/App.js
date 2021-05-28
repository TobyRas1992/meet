import React, {Component} from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Meet App</h1>
        <p>Choose your nearest city</p>
        <CitySearch/>
        <p>Number of Events:</p>
        <NumberOfEvents/>
        <EventList/>
      </div>
    );
  }
}

export default App;
