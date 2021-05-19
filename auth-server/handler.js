const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2; // is a authentication and authorization protocol
const calendar = google.calendar("v3");
const SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];


// Credentials are those values required to get access to your calendar. If you see “process.env” this means the value is in the “config.json” file. This is a best practice as it keeps your API secrets hidden. Please remember to add “config.json” to your “.gitignore” file.
const credentials = {
  client_id: process.env.CLIENT_ID,
  project_id: process.env.PROJECT_ID,
  client_secret: process.env.CLIENT_SECRET,
  calendar_id: process.env.CALENDAR_ID,
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  redirect_uris: ["https://tobyras1992.github.io/meet/"], // redirects user after successful registration
  javascript_origins: ["https://tobyras1992.github.io", "http://localhost:3000"],
};

const { client_secret, client_id, redirect_uris, calendar_id } = credentials; // 
const oAuth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  redirect_uris[0] // question: does this specify the only available option?
);

// STEP 1
module.exports.getAuthURL = async () => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({
      authUrl: authUrl,
    }),
  };
};

// STEP 2
module.exports.getAccessToken = async (event) => {
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );
  const code = decodeURIComponent(`${event.pathParameters.code}`);

  return new Promise((resolve, reject) => {
    oAuth2Client.getToken(code, (err, token) => {
      if(err) {
        return reject(err);
      }
      return resolve(token);
    });
  }).then((token) => {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(token),
    };
  }).catch((err) => {
    console.log(err);
    return{
      statusCode: 500,
      body: JSON.stringify(err),
    };
  });
};

//STEP 3
module.exports.getCalendarEvents = async (event) => {
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );
const access_token = decodeURIComponent(`${event.pathParameters.access_token}`); //gets token from URI
oAuth2Client.setCredentials({access_token}); //sets access token as credentials

return new Promise ((resolve, reject) =>{
  calendar.events.list(
    {
      calendarId: calendar_id,
      auth: oAuth2Client,
      timeMin: new Date().toISOString(),
      singleEvents: true,
      orderBy: "startTime",
    },
    (error, response) => {
      if (error) {
        reject(error);
      } else {
        resolve (response);
      }
    }
  );
}).then((results) => {
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({events: results.data.items}),
  };
}
).catch((err) =>{
  console.log(err);
  return{
    statusCode: 500,
    body: JSON.stringify(err),
  }; 
});
};