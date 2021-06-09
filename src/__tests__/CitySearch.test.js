import React from 'react';
import {shallow} from 'enzyme';
import CitySearch from '../CitySearch';
import {mockData} from '../mock-data';
import {extractLocations} from '../api'; //function import

describe('<CitySearch /> component', () => {

  let locations, CitySearchWrapper;

  beforeAll(()=> {
    locations = extractLocations(mockData); //extracts JSON objects from google mockData file and puts it into a superset of locations. 
    CitySearchWrapper = shallow(<CitySearch locations={locations} updateEvents={() => {}}/>); //creates shallow API wrapper + passes superset locations to CitySearch as a prop like normal props from main page to components. 
  });

  test('render text input', () => { //looks for .city input field
      expect(CitySearchWrapper.find('.city')).toHaveLength(1); //Expects one element with .city class in CitySearchWrapper.
  });

  test('renders a list of suggestions', () =>{ //looks for css .suggestion class.
    expect(CitySearchWrapper.find('.suggestions')).toHaveLength(1); //Expects one element with .suggestions class in CitySearchWrapper.
  });

  test('renders text input correctly', () => { // checks if input field derives its value from query state.
    const query = CitySearchWrapper.state('query');
    expect(CitySearchWrapper.find('.city').prop('value')).toBe(query); // Compares the 'value property of each element (the input element added in CitySearch) and checks if the input field's prop is equal to the CitySearch's query state.
  });

  test('change state when text input changes', () => { //checks if user input updates state.
    CitySearchWrapper.setState({ // query state set to munich
      query: 'Munich'
    });
    const eventObject = {target: {value: 'Berlin'}}; //Once change event is called, set value to Berlin. 
    CitySearchWrapper.find('.city').simulate('change', eventObject); //simulates changes on the city's target value. 
    expect(CitySearchWrapper.state('query')).toBe('Berlin');
  });

  test('render list of suggestions correctly', () => { // suggestion list should be displayed based on the city name typed in the input field. OK to be more explicit.
    CitySearchWrapper.setState({ suggestions: locations }); //state = full list of mock locations.
    const suggestions = CitySearchWrapper.state('suggestions');
    const renderedSuggestList = CitySearchWrapper.find('.suggestions li');
    expect(renderedSuggestList).toHaveLength(suggestions.length + 1); //compare number of rendered suggestions to number of suggestions in the state of CitySearch (+1 because I will be adding a "see all cities" suggestion at the list end).
    for (let i = 0; i < suggestions.length; i += 1) { // does each element in the rendered list match with the value in the state.
      expect(renderedSuggestList.at(i).text()).toBe(suggestions[i]);
      // expect(renderedSuggestList.at(i).html()).toBe(`<li>${suggestions[i]}</li>`); -> a way to test the node element's html instead of text().
    }
  });

  test('suggestion list match the query when changed', () => { //ensures suggestion list matches query.
    CitySearchWrapper.setState({query: '', suggestions: []}); //empties states.
    CitySearchWrapper.find('.city').simulate('change', {
      target: {value: "Berlin"}, // changes value of query to Berlin through a simulated change event in the .city input field.
    });
    const query = CitySearchWrapper.state('query'); 
    const filteredLocations = locations.filter((location) => {
      return location.toUpperCase().includes(query.toUpperCase());  
    }); //filters locations superset prop against elements in the state of query("Berlin").
    // Does this filtering return the objects that match the query?
    expect(CitySearchWrapper.state("suggestions")).toEqual(filteredLocations); //tests if the suggestions state only has cities that match the locations of the filtered locations prop.
  });

  test('selecting a suggestion should change query state', () =>{
    CitySearchWrapper.setState({query: 'Berlin'});
    const suggestions = CitySearchWrapper.state('suggestions');
    CitySearchWrapper.find('.suggestions li').at(0).simulate('click'); //simulates click action on one of the suggestions in my suggestions list. 
    expect(CitySearchWrapper.state('query')).toBe(suggestions[0]);
  });

  test('selecting CitySearch input reveals the suggestion list', () => {
    CitySearchWrapper.find('.city').simulate('focus'); // simulates focus on city.
    expect(CitySearchWrapper.state('.showSuggestions')).toBe(true); //showSuggestions state expected to be true
    expect(CitySearchWrapper.find('.suggestions')).prop('style').not.toEqual({ display: 'none'});
  })
  
  test('selecting a suggestion should hide the suggestions list', () => {
    CitySearchWrapper.setState({
      query: 'Berlin',
      showSuggestions: undefined
    });
    CitySearchWrapper.find('.suggestions li').at(0).simulate('click'); //simulates click on first item on suggestions list
    expect(CitySearchWrapper.state('showSuggestions')).toBe(false); //checks if state changes after click
    expect(CitySearchWrapper.find('.suggestions').prop('style')).toEqual({ display: 'none'}); // checks if suggestions list is hidden
  });
}); 