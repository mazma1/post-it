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
3. Create a [Nexmo](https://www.nexmo.com/) account and get your API key and secret which you will include as `NEXMO_KEY` and `NEXMO_SECRET` in your `.env` file. This is required for SMS notification
4. Navigate into the app's root directory: `cd post-it`
5. Create a `.env` file in the root directory using the sample `.env.sample` file
6. Install all dependencies: `npm install`
7. Run tests to ensure the app is not broken: `npm test`
8. Run `npm run db:migrate` to populate your database with initial user data
9. Start the app: `npm run start:dev`


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
3. No in-app notification, only email and SMS
4. Users cannot update their profile


## Contributing

This project is open for contributions. All contributions must adhere to the following Airbnb style guides:
1. [Javascript](http://airbnb.io/javascript/) 
2. [React](https://github.com/airbnb/javascript/tree/master/react)   

#### To get started:
1. Raise an issue in the app's repo
2. Fork the repository
3. Implement the said feature
4. Commit your changes
> Your commit message(s) should follow the format below. It should comprise of:
> *  A header: summarizes what feature was implemented
>* A body: gives a concise description of said feature
> ```
> feat(kafka): implement exactly one time delivery
> - ensure every event published to kafka is delivered exactly once
> - implement error handling for failed delivery


4. Raise a pull request to the development branch
> Pull requests should also follow the format below:
> ```
> - What does this PR do?
> - Description of Task to be completed?
> - How should this be manually tested?
> - Any background context you want to provide?
> - Screenshots (if appropriate)
> - Questions

## License
[MIT](https://github.com/mazma1/post-it/blob/chore/implement-feedback/LICENSE)


## FAQS
View frequently asked questions [here](https://github.com/mazma1/post-it/wiki/Post-It-FAQs)
