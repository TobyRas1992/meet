import React from 'react';
import {shallow} from 'enzyme';
import {mockData} from '../mock-data';
import NumberOfEvents from '../NumberOfEvents';
import {extractLocations} from '../api';

describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsWrapper, locations; 

  beforeAll(() => {
    locations = extractLocations(mockData);
    NumberOfEventsWrapper = shallow(<NumberOfEvents locations={locations}/> );
  });

  test('render NumberOfEvents component', () => {
    expect(NumberOfEventsWrapper.find('.numberOfEvents')).toHaveLength(1);
  });
  test('render input label', () => {
    expect(NumberOfEventsWrapper.find('.input-message')).toHaveLength(1);
  });
  test('render number input field', () => {
    expect(NumberOfEventsWrapper.find('.numberInput')).toHaveLength(1);
  });
  test('default number of events is 32', () => {
    expect(NumberOfEventsWrapper.state('numberOfEvents')).toBe(32);
  });
  test('renders number input correctly', () => {
    const numberOfEvents = NumberOfEventsWrapper.state('numberOfEvents');
    expect(NumberOfEventsWrapper.find('.numberInput').prop('value')).toBe(numberOfEvents);
  });
  test('change state when text input changes', () => {
    const eventObject = {target: {value: 10}};
    NumberOfEventsWrapper.find('.numberInput').simulate('change', eventObject);
    expect(NumberOfEventsWrapper.state('numberOfEvents')).toBe(10);
  });
/*   test('', () => {});
  test('', () => {});
  test('', () => {});
  test('', () => {}); */
});