DROP-PINS-MAP
DROP-PINS-MAP is a full-stack web application built using React, Express, MongoDB, and Mapbox. It allows users to leave a footprint on the map by adding a title, description, and rating for a location.

Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

Prerequisites
Before you can run this application, you will need to have the following installed:

Node.js (v14.17.3 or higher)
MongoDB (v4.4.6 or higher)
## Installing
Clone the repository:
- https://github.com/KedarKandel/mern-f.git

## Install the dependencies for the frontend:

cd client
npm install
Install the dependencies for the backend:

cd server
npm install
Mapbox API Token
This application uses Mapbox to display the map. You will need to sign up for a free account and get an API token to use in the application. Once you have the API token, create a .env file in the client directory and add the following line:

REACT_APP_MAPBOX_TOKEN=<your_mapbox_api_token>

## Running the Application
Start the backend server:

- cd server
- npm start

Start the frontend server:
- cd client
- npm start
The application should now be running on http://localhost:3000.

## Usage
- To use the application, register and login to the application and simply click on the map to add a new location. Enter the title, description, and rating in the popup that appears. You can also click on existing markers to view their details.


Acknowledgements
React
Express
MongoDB
Mapbox
