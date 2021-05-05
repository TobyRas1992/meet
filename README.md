# meet app
This is the repo for my meet app, which is a serverless progressive web application, built with React.
For this build, I have followed a test-driven development technique. 


## Demo

## Tech/frameworks used
**Built with**
- [React.js](https://reactjs.org/)

## Installation 
### Install dependencies
`npm install`
### Run
`parcel run start`

## User Scenarios

### FEATURE 1: FILTER EVENTS BY CITY
#### Scenario 1: When user hasn’t searched for a city, show upcoming events from all cities.
- **Given** user hasn’t searched for a city.
- **When** the user open the app.
- **Then** the user should see a list of all upcoming events.
#### Scenario 2: User should see a list of suggestions when they search for a city.
- **Given** the main page is open. 
- **When** user starts typing in the city textbook.
- **Then** the user should see a list of cities (suggestions) that match what they’ve typed. 
#### Scenario 3: User can select a city from the suggested list.
- **Given** the user was typing “Berlin” in the city textbook and the list of suggested cities is showing.
- **When** the user selects a city (e.g. “Berlin, Germany”) from the list.
- **Then** their city should be changed to the city (I.e.  “Berlin, Germany”) and the user should receive a list of upcoming events in that city.
 
### FEATURE 2: SHOW/HIDE AN EVENT’S DETAILS
#### Scenario 1: An event element is collapsed by default.
- **Given** the user has selected a city from the suggested list.
- **When** the user has selected a city and its list of upcoming events is rendered. 
- **Then** the city’s events will render in a list of maximum 32 elements. 
#### Scenario 2: User can expand an event to see its details.
- **Given** the user sees an event element they want to expand. 
- **When** the user clicks the event element
- **Then** the event’s detail view is shown. 
#### Scenario 3: User can collapse an event to hide its details.
- **Given** the event’s details are shown in an expanded view.
- **When** user clicks “see less” button
- **Then** the element collapses back into its minimised state format. 

### FEATURE 3: SPECIFY NUMBER OF EVENTS
#### Scenario 1: When user hasn’t specified a number, 32 is the default number.
- **Given** the user has selected a city from the list without specifying number of events in the filter. 
- **When** the user clicks a city.
- **Then** a list of maximum 32 events in sequential order is rendered. 
#### Scenario 2: User can change the number of events they want to see.
- **Given** the user has selected a city from the list and selected a maximum number of events for the filter to render.
- **When** the user clicks a city.
- **Then** a list of X amount of events in sequential order is rendered. 

### FEATURE 4: USE THE APP WHEN OFFLINE
#### Scenario 1: Show cached data when there’s no internet connection.
- **Given** user has no internet connection to their phone. 
- **When** the user opens the app by clicking the app’s shortcut.
- **Then** the app will open, but only display the user’s cached data, showing an alert that informs the user that they are offline. 
#### Scenario 2: Show error when user changes the settings (city, time range).
- **Given** the user is offline and has opened the app. 
- **When** the user attempts to change the settings.
- **Then** the user will see an error alert, telling them that they have to be online to do this. 

### FEATURE 5: DATA VISUALIZATION
#### Scenario 1: Show a chart with the number of upcoming events in each city.
- **Given** the app is open, the user has selected a city from the list, and the city’s list of events is rendered . 
- **When** the user clicks “show event chart”.
- **Then** a chart view will be rendered that shows the percentages of different event types for that city. 
