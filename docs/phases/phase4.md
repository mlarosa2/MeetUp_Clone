# Phase 4: Calendar and Search by Location and Group Info (1 days)

## Rails

### Models
* Calendar

### Controllers
* Api::CalendarsController (new, create, edit, show)

### Views
* calendars/show.json.jbuilder

## Flux
### Views (React Components)
* Calendars
* SearchBar

### Stores
* Event
* Group

### Actions
* `ApiActions.receiveAllGroups`
* `ApiActions.receiveAllEvents`
* `GroupActions.fetchAllGroups`
* `EventActions.fetchAllEvents`
* `ApiUtil.fetchAllEvents`

## Gems/Libraries
