# Post It
A simple Node.js application that allows friends and colleagues create groups for messaging. Up to date version of project can be found on the `development` branch.

[![Build Status](https://travis-ci.org/mazma1/post-it.svg?branch=development)](https://travis-ci.org/mazma1/post-it)
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
1. Clone the repository and run `npm install`. 
2. To start app, navigate to the root directory of the app and run  `node run start:dev`.
This will fire up the app, with *nodemon* that watches the app for any changes.

Ideally, the server should serve the client on port 3000. So visiting `localhost:3000` on your browser will take you to the index page where you are expected to sign up as a new user. If you are a returning user, you will either have to sign in or be redirected to your message board (if your session has not expired).


## Database Setup
The application requires a PostgreSql database to handle it's data. The model, migration and seed files are available in their respective folders in the server directory. 

#### To run the migrations:
`sequelize db:migrate`

#### To run the seeds:
The seed files have to be run in the folowing order to avoid running into model dependency errors:

`sequelize db:seed --seed <user-seed>`

`sequelize db:seed --seed <group-seed>`

`sequelize db:seed --seed <message-seed>`

`sequelize db:seed --seed <group-member-seed>`


| Username      | Password  |
| ------------- |:---------:| 
| mazma         | 1234      | 
| clare         | 1234      | 
| chyke         | 1234      | 


### Seed Data Glitch
The seeds are meant to provide dummy data for faster testing of the application. However, if on successful seeding you are unable to sign in with any of the above dummy username and password (I encountered this problem), you can try this workaround:

> Revert all migrations ran:
> `sequelize db:migrate:undo:all`
>
> Run migrations again:
> `sequelize db:migrate`
>
> Manually create at least 3 users using the sign up form
>
> Run the group-seed, message-seed and group-member-seed files in this order using the seed commands specified above.

Otherwise, you can leave out the seeding process entirely. Run just the migrations and enter your test data using the availble forms on the client.


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

| Feature          | Endpoint                  | Required Parameters                                                  |
| ---------------- |:-------------------------:| --------------------------------------------------------------------:|
| Sign Up          | `POST: api/user/signup`   | `firstname, lastname, username, email, password and confirm_password`|
| Sign In          | `POST: api/user/signin`   |  `username or email, password`                                       |
| Create New Group | `POST: api/group`         |  `group_name`                                                        |
| Add User to Group| `POST: api/group/<group id>/user`|  `username`                                                   |
| Post Message to Group| `POST: api/group/<group id>/message`|  `message`                                             |
| Retrieve Messages to Group| `GET: api/group/<group id>/messages`|  NIL                                              |
| Retrieve a User's Groups| `GET: api/user/<user id>/groups`|  NIL                                                    |
| Retrieve Members in a Group| `GET: api/group/<group id>/members`|  NIL                                              |


