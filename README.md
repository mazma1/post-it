# Post It
A simple Node.js application that allows friends and colleagues create groups for messaging
[![Build Status](https://travis-ci.org/mazma1/post-it.svg?branch=master)](https://travis-ci.org/mazma1/post-it)
[![Coverage Status](https://coveralls.io/repos/github/mazma1/post-it/badge.svg?branch=master)](https://coveralls.io/github/mazma1/post-it?branch=master)
## Structure
Post it is a REST API that allows users do the following:
1. Sign up and log in to their accounts.
2. Create groups 
3. Add users to a group
4. Post messages to a group
5. Retrieve all the messages posted to groups the belong to.
## To get started
1. Clone the repository and run `npm install`. 
2. To start app, navigate to the root directory of the app and run  `node run start:dev`.
This will fire up the app, with *nodemon* that watches the app for any changes and automatically restarts the app.

## End Points
1. Sign Up

  POST: `api/user/signup`
  #### Input Parameters
  email, username and password

2. Sign In

  POST: `api/user/signin`
  #### Input Parameters
  username, password

3. Create a new group

  POST: `api/group`
  #### Input Parameters
  group_name

4.  Add user to group

  POST: `api/group/<group id>/user`
  #### Input Parameters
  username

5. Post message to a group

  POST: `api/group/<group id>/message`
  #### Input Parameters
  message

6. Retrieve messages from a specified group

GET: `api/group/<group id/messages`
