# Phase 1: User Authentication and JSON API (2 days)

## Rails
### Models
* User
* Session

### Controllers
* Api::UsersController (create)
* Api::SessionsController (create, destroy, show)

### Views
* api/users/show.json.jbuilder

## Flux
### Views (React Components)
* App
* LoginForm
* SignupForm
* EditUserForm
* GroupIndex

### Stores
* CurrentUser
* Error

### Actions
* `SessionActions.logIn`
* `SessionActions.signUp`
* `SessionActions.fetchCurrentUser`
* `SessionActions.editCurrentUser`
* `SessionActions.signOut`
* `SessionActions.receiveCurrentUser`
* `SessionActions.removeCurrentUser`
* `ErrorActions.setErrors`
* `ErrorActions.removeErrors`

### ApiUtil
* `ApiUtil.logIn`
* `ApiUtil.logOut`
* `ApiUtil.signUp`  
* `ApiUtil.fetchCurrentUser`
* `ApiUtil.editCurrentUser`

## Gems/Libraries
* BCrypt (Gem)
* "babel-core": "^6.2.0",
* "babel-loader": "^6.2.0",
* "babel-preset-react": "^6.1.18",
* "webpack": "^1.12.2",
* "babel-preset-es2015": "^6.9.0",
* "flux": "^2.1.1",
* "react": "^0.14.2",
* "react-dom": "^0.14.2",
* "react-router": "2.0.1"
