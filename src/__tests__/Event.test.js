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

  test('renders event overview div', () => {
    expect(EventWrapper.find('.overview')).toHaveLength(1);
  });

  test("doesn't render details when first loaded", () => {
    expect(EventWrapper.state("details")).toBe(false);
  });
/*   test("click on show details button to expand event details", () => {
    EventWrapper.setState({details: false});
    EventWrapper.find("showDetailsButton").simulate("click");
    expect(EventWrapper.state('details')).toBe(true);
  });
 */
/* test ('render show details button', () => {
  expect(EventWrapper.find()).toHaveLength(1);
});
 */
/* test('change state when show details button is clicked', () => {

  EventWrapper.setState({
    details: false
  });

const showDetailsButton = EventWrapper.find('.showDetailsButton');
showDetailsButton.simulate('click');

  expect(EventWrapper.state('details')).toBe(true);
}); */
/* test ('render hide details button', () => {
  EventWrapper.setState
  expect(EventWrapper.find('.hideDetailsButton')).toHaveLength(1);
});




test('change state when hide details button is clicked', () => {

  EventWrapper.setState({
    details: true
  });

const showDetailsButton = EventWrapper.find('.showDetailsButton');
showDetailsButton.simulate('click');

  expect(EventWrapper.state('details')).toBe(false);
});

test('show more info for event when details button is clicked', () => {
  // expect()
});

test('hide event info for when hide info button is clicked', () => {
  // use simulate event
}); */
});
