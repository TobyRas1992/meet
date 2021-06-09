import { mockData } from './mock-data';

export const extractLocations = (events) => { //extracts event location from an array of events and remove duplicates.
  var extractLocations = events.map((event) => event.location); //creates new array only with locations.
  var locations = [...new Set(extractLocations)]; // creates new array + removes duplicates by using spread operator and spreading a Set. 
  return locations;
};

export const getEvents = async () => {
  return mockData;
};