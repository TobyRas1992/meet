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
  test('render number input field', () => {
    expect(NumberOfEventsWrapper.find('.numberInput')).toHaveLength(1);
  });
  
/*   test('', () => {});
  test('', () => {});
  test('', () => {});
  test('', () => {}); */
});