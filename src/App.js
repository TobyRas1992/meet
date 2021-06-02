import React, {Component} from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import mockData from './mock-data';

class App extends Component {
  state = {
    events: []
  }
  componentDidMount(){
    this.setState({events: mockData});
  }
  render() {
    const {events} = this.state;
    return (
      <div className="App">
        <h1>Meet App</h1>
        <p>Choose your nearest city</p>
        <CitySearch/>
        <NumberOfEvents/>
        <EventList events = {events}/>
      </div>
    );
  }
}

export default App;
