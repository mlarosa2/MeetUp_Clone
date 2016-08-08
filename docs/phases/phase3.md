# Phase 3: Events & RSVP's (2 days)

## Rails
### Models
* Event
* RSVP

### Controllers
* Api::EventsController (create, destroy, index, show, update)
* Api::RSVPsController (create, destroy, update, index)

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
* `EventApiUtil.fetchAllEvents`
* `EventApiUtil.fetchSingleEvent`
* `EventApiUtil.createEvent`
* `EventApiUtil.editEvent`
* `EventApiUtil.destroyEvent`
* `RSVPApiUtil.fetchAllRSVPs`
* `RSVPApiUtil.fetchSingleRSVP`
* `RSVPApiUtil.createRSVP`
* `RSVPApiUtil.editRSVP`
* `RSVPApiUtil.destroyRSVP`

## Gems/Libraries
