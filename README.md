# Project Title

This is a MERN stack application. It is a small online shopping app that includes authentication, shops and products.

### Prerequisites

In order to be able to use this repo in your machine you need to have node and npm installed.

### Installing

we have to different servers, one for backend which is supported by node and express js and another one for frontend which is react js with the help of libraries such as redux. 


This script will install all the dependencies related to this project
```
npm install
```

However, for running only the server, you can do

```
npm run server 
```
For the database, we use Mongodb with the help of mongoose js which makes it a lot easier to work with this database. However, we have a config file for our credits such as jsonwebtoken and mongoURl. So, you need to create a config.env file with these keyword on it:

* NODE_ENV=
* PORT=
* DATABASE=
* DATABASE_PASSWORD=
* JWT_SECRET=
* JWT_EXPIRES_IN=
* JWT_COOKIE_EXPIRES_IN=

## Built With
* [node](https://nodejs.org/en/)
* [express js](https://expressjs.com/)
* [react js](https://reactjs.org/)
* [redux](https://redux.js.org/)
