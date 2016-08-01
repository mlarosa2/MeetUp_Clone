# Phase 3: Events & RSVP's (2 days)

## Rails
### Models
* Event
* RSVP

### Controllers
* Api::EventsController (create, destroy, index, show, update, edit)
* Api::RSVPsController (create, destroy, edit, update, index)

### Views
* events/index.json.jbuilder
* events/show.json.jbuilder
* rsvps/index.json.jbuilder

## Flux
### Views (React Components)
* EventsIndex
  - EventDetail
* EventForm
* RSVPsIndex
  - RSVPDetail
* RSVPForm

### Stores
* Event
* RSVP

### Actions
* `ApiActions.receiveAllEvents`
* `ApiActions.receiveSingleEvent`
* `ApiActions.updateEvent`
* `ApiActions.deleteEvent`
* `ApiActions.receiveAllRSVPs`
* `ApiActions.receiveSingleRSVP`
* `ApiActions.updateRSVP`
* `ApiActions.deleteRSVP`
* `EventActions.fetchAllEvents`
* `EventActions.fetchSingleEvent`
* `EventActions.createEvent`
* `EventActions.editEvent`
* `EventActions.destroyEvent`
* `RSVPActions.fetchAllRSVPs`
* `RSVPActions.fetchSingleRSVP`
* `RSVPActions.createRSVP`
* `RSVPActions.editRSVP`
* `RSVPActions.destroyRSVP`

### ApiUtil
* `ApiUtil.fetchAllEvents`
* `ApiUtil.fetchSingleEvent`
* `ApiUtil.createEvent`
* `ApiUtil.editEvent`
* `ApiUtil.destroyEvent`
* `ApiUtil.fetchAllRSVPs`
* `ApiUtil.fetchSingleRSVP`
* `ApiUtil.createRSVP`
* `ApiUtil.editRSVP`
* `ApiUtil.destroyRSVP`

## Gems/Libraries
