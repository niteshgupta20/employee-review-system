# Employee Review System

## Getting Started

- clone the repository

```
git clone https://github.com/niteshgupta20/employee-review-system.git
```

- create .env file

```
DB_URI="mongodb://127.0.0.1:27017/ers"
```

- Install dependencies

```
npm install
```

- Build and run the project

```
npm  start
```

- open the application

```
Run localhost:8000 on chrome browser.
```

- Usage

```
signed up a user and make admin from DB.

```

Production admin credentials
```
admin@gmail.com/1234
```

## About Project

 An application that allows employees to submit feedback toward each other’s performance

## Project Structure

The folder structure of this app is explained below:

| Name                     | Description                                                                                        |
| ------------------------ | -------------------------------------------------------------------------------------------------- |
| **assests**              | Contains static files css and javascript                                                           |
| **node_modules**         | Contains all npm dependencies                                                                      |
| **config**/middleware.js | Contains source code that will used for flash messages                                             |
| **congig**/passportLocalStrategy.js|  Contains passport middleware source code for auth                                   |
| **config**/mongoose.js   | connect to mongoDB database via mongoose ORM.|
| **controllers**          | Controllers define functions to serve various express routes.                                      |
| **routes**               | Contain all express routes                                                                         |
| **models**               | Models define schemas that will be used in storing and retrieving data from database |
| **views**                | ejs file which served by routes.                                                                   |
| app.js                   | Entry point to express app                                                                         |
| package.json             | Contains npm dependencies as well as build scripts                                                 |

## Screenshots

### SignUp Screen

![Home Screen](https://github.com/niteshgupta20/employee-review-system/blob/master/screenshots/sign-up.PNG?raw=true)

### SignIn Screen

![SignIn Screen](https://github.com/niteshgupta20/employee-review-system/blob/master/screenshots/sign-in.PNG?raw=true)

### Admin Home Screen

![Admin Home Screen](https://github.com/niteshgupta20/employee-review-system/blob/master/screenshots/admin-home.PNG?raw=true)

### Add User Screen

![Add User Screen](https://github.com/niteshgupta20/employee-review-system/blob/master/screenshots/add-user.PNG?raw=true)


### Assign Reviewers Screen
![Assign Reviewers Screen](https://github.com/niteshgupta20/employee-review-system/blob/master/screenshots/assign-reviewers.PNG?raw=true)

### Employee Home Screen

![Emplpoyee Home Screen](https://github.com/niteshgupta20/employee-review-system/blob/master/screenshots/employee-home.PNG?raw=true)

### Submit Feedback Screen

![Submit Feedback Screen](https://github.com/niteshgupta20/employee-review-system/blob/master/screenshots/submit-feedback.PNG?raw=true)
