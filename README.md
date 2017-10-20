# Post It
A simple Node.js application that allows friends and colleagues create groups for messaging. Up to date version of project can be found on the `development` branch.

[![Build Status](https://travis-ci.org/mazma1/post-it.svg?branch=chore/implement-feedback)](https://travis-ci.org/mazma1/post-it)
[![codecov.io Code Coverage](https://codecov.io/github/mazma1/post-it/branch/chore%2Fimplement-feedback/graphs/badge.svg)](https://codecov.io/gh/mazma1/post-it/branch/chore%2Fimplement-feedback)
[![Code Climate](https://codeclimate.com/github/mazma1/post-it/badges/gpa.svg)](https://codeclimate.com/github/mazma1/post-it)


## Core Technologies
1. NodeJS/Express
2. Postgres/Sequelize ORM
3. ReactJS/Redux
4. Webpack


## To get started
1. Clone the repository: `git clone https://github.com/mazma1/post-it`
2. Ensure you have installed [NodeJS](https://nodejs.org/en/) and [Postgres](https://www.postgresql.org/download/)
3. Navigate into the app's root directory: `cd post-it`
4. Create a `.env` file in the root directory using the sample `.env.sample` file
5. Install all dependencies: `npm install`
6. Run tests to ensure the app is not broken: `npm test`
7. Run `npm run db:migrate` to populate your database with initial user data
8. Start the app: `npm run start:dev`


## Available Functionalities on Client
1. Signup
2. Signin
3. View groups on message board
4. View messages in respective groups
5. Post messages to groups
6. View members of a group
7. Add user to group
8. Create new group
9. Search for registered users



## API End Points

Access to endpoints are restricted based on the authorization token assigned to the user. This token is generated when a new user signs up, and when a returning user signs in.

For more of the api, [go here.](http://docs.postit9.apiary.io/)


## Limitations

1. Users are added to the group one at a time.
2. Group creator cannot remove users from group
3. Chat message notifications are not real-time. You have to refresh your browser to see new message notifications.
4. Users cannot update their profile


## Contributing

This project is open for contributions. All contributions must adhere to the Airbnb styleguide.
1. [Javascript](http://airbnb.io/javascript/) 
2. [React](https://github.com/airbnb/javascript/tree/master/react)   

#### To get started:
1. Raise an issue in the app's repo
2. Fork the repository
3. Implement the said feature
4. Raise a pull request to the development branch

## License
[MIT](https://github.com/mazma1/post-it/blob/chore/implement-feedback/LICENSE)
