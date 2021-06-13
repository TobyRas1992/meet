import React from 'react';
import { shallow, mount } from 'enzyme';
import App from '../App';
import { loadFeature, defineFeature } from 'jest-cucumber';
import { mockData } from '../mock-data';
import NumberOfEvents from '../NumberOfEvents';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature'); //loads Gherkin file and sets it to constant

defineFeature(feature, test => {
  let AppWrapper;
  let NumberOfEventsWrapper;
  test('When user hasn’t specified a number, 32 is the default number.', ({ given, when, then }) => {

    given('the user hasn\'t specified any number in NumberOfEvents', () => {
      NumberOfEventsWrapper = mount(<NumberOfEvents />);
    });

    when('the main page is open', () => {
      AppWrapper = mount(<App />);
    });

    then('the number of events will be 32', () => {
      NumberOfEventsWrapper.update();
      expect(NumberOfEventsWrapper.state('numberOfEvents')).toBe(32);
    });
  });

  test('User can change the number of events they want to see.', ({ given, when, then }) => {
    given('a list of events is shown to the user', () => {
      AppWrapper = mount(<App />);
    });

    when('the user changes the input for NumberOfEvents', () => {
      AppWrapper.find('.numberInput').simulate('change', { target: { value: 5 } });
    });

    then('the user should see the number of events he/she chose in the event list', () => {
      NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
      expect(NumberOfEventsWrapper.state('numberOfEvents')).toBe(5);
    });
  });
});