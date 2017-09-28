# Post It
A simple Node.js application that allows friends and colleagues create groups for messaging. Up to date version of project can be found on the `development` branch.

[![Build Status](https://travis-ci.org/mazma1/post-it.svg?branch=chore/implement-feedback)](https://travis-ci.org/mazma1/post-it)
[![codecov.io Code Coverage](https://codecov.io/github/mazma1/post-it/branch/chore%2Fimplement-feedback/graphs/badge.svg)](https://codecov.io/gh/mazma1/post-it/branch/chore%2Fimplement-feedback)
[![Code Climate](https://codeclimate.com/github/mazma1/post-it/badges/gpa.svg)](https://codeclimate.com/github/mazma1/post-it)

## Structure
Post it is a simple React application that consumes a Node REST API on an Express server. The API allows users do the following:
1. Sign up and log in to their accounts.
2. Create groups 
3. Add users to a group
4. Post messages to a group
5. Retrieve all the messages posted to groups the user belongs to
6. Retrieve the groups a user belongs to
7. Retrieve the members of a group


## To get started
1. Clone the repository: `git clone https://github.com/mazma1/post-it`
2. Ensure you have installed NodeJS and Postgres
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



## API End Points

Access to endpoints are restricted based on the authorization token assigned to the user. This token is generated when a new user signs up, and when a returning user signs in.

For more of the api, [go here.](http://docs.postit9.apiary.io/)


## Limitations

1. Users are added to the group one at a time.
2. Chat message notifications are not real-time. You have to refresh your browser to see new message notifications.


## Contributing

This project is open for contributions. To do so:

1. Raise an issue in the app's repo
2. Fork the repository
3. Implement the said feature
4. Raise a pull request to the development branch
