import React from 'react';
import {shallow, mount} from 'enzyme';
import App from '../App';
import EventList from '../EventList';
import CitySearch from '../CitySearch';
import NumberOfEvents from '../NumberOfEvents';
import { mockData } from '../mock-data';
import { extractLocations, getEvents } from '../api';

describe('<App /> component', () => {
  let AppWrapper;
  beforeAll(() => {
    AppWrapper = shallow(<App/>); //creates shallow API.
  });

test ('render list of events', () => {
  expect(AppWrapper.find(EventList)).toHaveLength(1); //ensures/checks if there is only one EventList component.
});

test('render CitySearch', () => {
  expect(AppWrapper.find(CitySearch)).toHaveLength(1);//expects 1 CitySearch element. 
});

test('render NumberOfEvents', () => {
  expect(AppWrapper.find(NumberOfEvents)).toHaveLength(1);
});
});

describe('<App /> integration', () => {
  test('App component passes "events" state as props to EventList component', () => {
    const AppWrapper = mount(<App/>); //sets API wrapper to constant
    const AppEventsState = AppWrapper.state('events');
    expect(AppEventsState).not.toEqual(undefined); //checks if state of events is not undefined as this could technically still pass if both states in next line of code were undefined. 
    expect(AppWrapper.find(EventList).props().events).toEqual(AppEventsState); //compares event state in App.js with EventList.js to check if they were passed correctly. 
    AppWrapper.unmount(); // cleans up code for next test. 
  });

  test('App component passes "locations" state as props to CitySearch component', () => {
    const AppWrapper = mount(<App/>);
    const AppLocationsState = AppWrapper.state('locations');
    expect(AppLocationsState).not.toEqual(undefined);
    expect(AppWrapper.find(CitySearch).props().locations).toEqual(AppLocationsState);
    AppWrapper.unmount();
  });

  test('get a list of events matching the city selected by the user', async () => { // add async keyword if test contains async code
    const AppWrapper = mount(<App/>); //sets API wrapper for App.js to constant
    const CitySearchWrapper = AppWrapper.find(CitySearch); // sets CitySearch to constant. 
    const locations = extractLocations(mockData); // sets extracted locations to constant.
    CitySearchWrapper.setState({ suggestions: locations}); // set CitySearch's suggestions state to all available cities. 
    const suggestions = CitySearchWrapper.state('suggestions'); //sets CitySearch's suggestions state to constant. 
    const selectedIndex = Math.floor(Math.random() * (suggestions.length)); // it just evaluates to a random index in the suggestions array. 
    const selectedCity = suggestions[selectedIndex]; // returns acutal suggestion from the random index. 
    await CitySearchWrapper.instance().handleItemClicked(selectedCity); //mimick click by calling instance() on CitySearchWrapper, then selecting the function. Also, selectedCity has been passed into the component. Async code expected with in handleItemClicked(), thus await added before. 
    const allEvents = await getEvents(); // gets all events from API asynchronously with api function from api.js.
    const eventsToShow = allEvents.filter(event => event.location === selectedCity);  //filter list of all events, storing all events with the same location as selectedCity in new array. 
    expect(AppWrapper.state('events')).toEqual(eventsToShow); //compares whether events state in App.js takes same array as the filtered result in EventsToShow. 
    AppWrapper.unmount(); // cleans up code for next test.
  });

  test('get a list of all events when user selects "See all cities"', async () => {
    const AppWrapper = mount (<App />); //sets API wrapper for App.js to constant. 
    const suggestionItems = AppWrapper.find(CitySearch).find('.suggestions li'); // sets rendered suggestion list items to an array. 
    await suggestionItems.at(suggestionItems.length -1).simulate('click'); //simulates click action at last item (which will always be "see all cities").
    const allEvents = await getEvents(); //gets all events from API.
    expect(AppWrapper.state('events')).toEqual(allEvents); //checks if the events state of App.js equals list of all events from API. 
    AppWrapper.unmount();
  });
});