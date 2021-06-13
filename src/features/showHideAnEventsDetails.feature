Feature: Show/hide an event details

Scenario: An event element is collapsed by default
Given the user hasn't expanded an event to see its details
When the user opens the app
Then the user should see a list of all the events without details

Scenario: User can expand an event to see its details.
Given the user has chosen an event
When the user clicked on show details button on a specific event
Then the user should see the details of this specific event

Scenario: User can collapse an event to hide its details.
Given an event's details is expanded
When the user clicks on the hide details button
Then the user should no longer see the event's details