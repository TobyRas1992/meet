import { mockData } from './mock-data';
import axios from 'axios';
import NProgress from 'nprogress';

export const extractLocations = (events) => { //extracts event location from an array of events and remove duplicates.
  var extractLocations = events.map((event) => event.location); //creates new array only with locations.
  var locations = [...new Set(extractLocations)]; // creates new array + removes duplicates by using spread operator and spreading a Set. 
  return locations;
};

const checkToken = async (accessToken) => {
  const result = await fetch(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`)
    .then((res) => res.json())
    .catch((error) => error.json());
  return result;
};

const getToken = async (code) => { //fetches new token for user. 
  const encodeCode = encodeURIComponent(code); // encodes your code.
  const { access_token } = await fetch('https://qg6namd6jb.execute-api.eu-central-1.amazonaws.com/dev/api/token' + '/' + encodeCode)
    .then((res) => {
      return res.json();
    })
    .catch((error) => error);

  access_token && localStorage.setItem('access_token', access_token);

  return access_token;
};

const removeQuery = () => { // removes code from URL once I'm finished with it. Function checks whether there's a path, then builds the URL with the current path (or builds the URL without a path using window.history.pushState()).
  if (window.history.pushState && window.location.pathname) {
    var newurl = window.location.protocol + '//' + window.location.host + window.location.pathname;
    window.history.pushState('', '', newurl);
  } else {
    newurl = window.location.protocol + '//' + window.location.host;
    window.history.pushState('', '', newurl);
  }
}

export const getEvents = async () => {
  NProgress.start(); // displays progress bar at the top of page. 

  if (window.location.href.startsWith('http://localhost')) { //ensures we return mockData (and not real api) if using localhost. 
    return mockData;
  }

  //loads, parses and returns stored events list if user is offline. 
  if (!navigator.onLine) {
    const events = localStorage.getItem("lastEvents");
    NProgress.done();
    return events ? JSON.parse(events).events : [];;
  }

  const token = await getAccessToken(); // check for access token. 

  if (token) { // if token exists, make GET request to Google Calendar API. 
    removeQuery();
    const url = 'https://qg6namd6jb.execute-api.eu-central-1.amazonaws.com/dev/api/get-events' + '/' + token;
    const result = await axios.get(url);
    if (result.data) {
      var locations = extractLocations(result.data.events);
      localStorage.setItem('lastEvents', JSON.stringify(result.data));
      localStorage.setItem('locations', JSON.stringify(locations));
    }
    NProgress.done();
    return result.data.events;
  }
};

export const getAccessToken = async () => {
  const accessToken = localStorage.getItem('access_token'); //checks localstorage first for pre existing access token. 

  //step 2: if no accesstoken is found in localstorage. 
  const tokenCheck = accessToken && (await checkToken(accessToken)); // John: does this check the validity of the localstorage access token?

  if (!accessToken || tokenCheck.error) { // checks if access token is found, then if authorization code is found. 
    await localStorage.removeItem('access_token');
    const searchParams = new URLSearchParams(window.location.search);
    const code = await searchParams.get('code'); //gets code from search params. 
    if (!code) { // if no authorization code is found. 
      const results = await axios.get('https://qg6namd6jb.execute-api.eu-central-1.amazonaws.com/dev/api/get-auth-url'); // update with correct url - John: do I need to remove get aut url? 
      const { authUrl } = results.data;
      return (window.location.href = authUrl); // redirects user to Google Authorization screen.
    }
    return code && getToken(code);
  }
  return accessToken;
}