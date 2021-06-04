import React from 'react';
import {shallow} from 'enzyme';
import Event from '../Event';
import { mockData } from './../mock-data'

describe('<Event/> component', ()=>{
let  EventWrapper;

  beforeAll(()=> {
    EventWrapper = shallow(<Event event={mockData[0]}/>); //passes first event from array for simulation purpose
  });

  test ('renders event element', () => {
    expect(EventWrapper.find('.event')).toHaveLength(1);
  });

  test('renders event title', () => {
    expect(EventWrapper.find('.name')).toHaveLength(1);
  });

  test('renders event title with correct content', () => {
    expect(EventWrapper.find('.name').text()).toBe('Learn JavaScript');
  });

  test("doesn't render details when first loaded", () => {
    expect(EventWrapper.state("details")).toBe(false);
  });

  test("click on show details button to expand event details", () => { //John: why doesn't this return correct node?
    EventWrapper.setState({details: false});
    EventWrapper.find(".showDetailsButton").simulate("click");
    expect(EventWrapper.state('details')).toBe(true);
  });
  test("click on hide details button to hide event details", () => { //John: why doesn't this return correct node?
    EventWrapper.setState({details: true});
    EventWrapper.find(".hideDetailsButton").simulate("click");
    expect(EventWrapper.state('details')).toBe(false);
  });
});
