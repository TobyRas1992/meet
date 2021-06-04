import React from 'react';
import {shallow} from 'enzyme';
import App from '../App';
import EventList from '../EventList';
import CitySearch from '../CitySearch';
import NumberOfEvents from '../NumberOfEvents';

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