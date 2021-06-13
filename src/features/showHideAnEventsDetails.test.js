import React from 'react';
import { mount } from 'enzyme';
import App from '../App';
import { mockData } from '../mock-data';
import Event from '../Event';
import { loadFeature, defineFeature } from 'jest-cucumber';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature'); //loads Gherkin file and sets it to constant

defineFeature(feature, test => {
  test('An event element is collapsed by default', ({ given, when, then }) => {
    let AppWrapper;
    given('the user hasn\'t expanded an event to see its details', () => {
    });

    when('the user opens the app', () => {
      AppWrapper = mount(<App />);
    });

    then('the user should see a list of all the events without details', () => {
      AppWrapper.update();
      expect(AppWrapper.find('.event').find('.event-details')).toHaveLength(0);
      AppWrapper.unmount();
    });
  });

  test('User can expand an event to see its details.', ({ given, when, then }) => {
    let EventWrapper;
    given('the user has chosen an event', () => {
      EventWrapper = mount(<Event event={mockData[0]} />);
    });

    when('the user clicked on show details button on a specific event', () => {
      EventWrapper.find('.showDetailsButton').simulate('click');
    });

    then('the user should see the details of this specific event', () => {
      expect(EventWrapper.find('.event-details')).toHaveLength(1);
      EventWrapper.unmount();
    });
  });

  test('User can collapse an event to hide its details.', ({ given, when, then }) => {
    let EventWrapper;
    given('an event\'s details is expanded', () => {
      EventWrapper = mount(<Event event={mockData[0]} />);
      EventWrapper.find('.showDetailsButton').simulate('click');
    });

    when('the user clicks on the hide details button', () => {
      EventWrapper.find('.hideDetailsButton').simulate('click');
    });

    then('the user should no longer see the event\'s details', () => {
      expect(EventWrapper.find('.event-details')).toHaveLength(0);
      EventWrapper.unmount();
    });
  });
});
