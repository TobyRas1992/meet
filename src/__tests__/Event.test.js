import React from 'react';
import {shallow} from 'enzyme';
import Event from '../Event';

describe('<Event/> component', ()=>{
let  EventWrapper;

  beforeAll(()=> {
    EventWrapper = shallow(<Event/>);
  });

  test ('render event name', () => {
    expect(EventWrapper.find('.name')).toHaveLength(1);
  });

/* test ('render show details button', () => {
EventWrapper.setState({details: false});
  expect(EventWrapper.find('.showDetailsButton')).toHaveLength(1);
});
 */
/* test ('render hide details button', () => {
  EventWrapper.setState
  expect(EventWrapper.find('.hideDetailsButton')).toHaveLength(1);
});


test('change state when show details button is clicked', () => {

  EventWrapper.setState({
    details: false
  });

const showDetailsButton = EventWrapper.find('.showDetailsButton');
showDetailsButton.simulate('click');

  expect(EventWrapper.state('details')).toBe(true);
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
