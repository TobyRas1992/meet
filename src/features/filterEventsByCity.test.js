import { loadFeature, defineFeature } from 'jest-cucumber';

const feature = loadFeature('./src/features/filterEventsByCity.feature'); //loads Gherkin file and sets it to constant

defineFeature(feature, test => { // defines features for recently loaded Gherkin file. 

});