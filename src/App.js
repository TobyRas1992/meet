import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import EventPieChart from './EventPieChart';
import { extractLocations, getEvents } from './api';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: 32,
    currentCity: "all",
  }


  updateEvents = (location, numberOfEvents) => { // method that changes component's 'events' + 'currentCity' state. 
    getEvents().then((events) => {
      const locationEvents = (location === 'all') //checks if value is 'all' before update
        ? events.slice(0, numberOfEvents) // John: how does this line work? would it be ok to just have 'events' considering this is already written on line 26?
        : events.filter((event) => event.location === location); // filters events matching location
      if (this.mounted) { // checks if mounted
        this.setState({
          events: locationEvents.slice(0, numberOfEvents), // slice returns a portion of new array (locationsEvents). 
          currentCity: location,
        });
      }
    });
  }

  updateNumberOfEvents(eventNumber) { // updates 'numberOfEvents' state --> then calls updateEvents with currentCity and eventNumber
    this.setState({ numberOfEvents: eventNumber });
    const { currentCity } = this.state;
    this.updateEvents(currentCity, eventNumber);
  }


  // function that counts how many events each city has for scatter chart component. 
  getDataForScatterChart = () => {
    const { locations, events } = this.state;
    const data = locations.map((location) => {
      const number = events.filter((event) => event.location === location).length; // finds how many events will take place in given city.
      const city = location.split(', ').shift(); // gets city name by shortening the location and removing unnecessary info, leaving only city name. 
      return { city, number };
    });
    return data;
  }

  componentDidMount() { // makes API call and saves initial data to state. 
    const { numberOfEvents } = this.state;
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({
          events: events.slice(0, numberOfEvents),
          locations: extractLocations(events)
        });
      }
    });
  }

  componentWillUnmount() { // cleans up code. 
    this.mounted = false;
  }

  render() {
    return (
      <div className="App">
        <h1>Meet App</h1>
        <p>Choose your nearest city</p>
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} numberOfEvents={this.state.numberOfEvents} />
        <NumberOfEvents updateNumberOfEvents={(e) => this.updateNumberOfEvents(e)} />
        <h4>Events in each city</h4>
        <div className="data-vis-wrapper">
          <EventPieChart events={this.state.events} />
          <ResponsiveContainer height={400}>
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid />
              <XAxis type="category" dataKey="city" name="city" />
              <YAxis type="number" dataKey="number" name="number of events" allowDecimals={false} />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter data={this.getDataForScatterChart()} fill="#8884d8" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        <EventList events={this.state.events} />
      </div>
    );
  }
}

export default App;
