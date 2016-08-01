# Flux Cycles

Flux loops are organized by data type. Under each data type, there may
be sub-categories, and each action is listed with the sequence of events
that result from its invocation, ending with the API or store. Finally,
store listeners are listed at the end.

You should be able to use this document trace an **action** starting
with where it was invoked, through the **API**/**store** involved, and
finally to the **components** that update as a result. This is important
because once you start implementing your flux loops, that's precisely
what you'll need to do.

## Auth Cycles

### Session API Request Actions

* `signUp`
  0. invoked from `SignupForm` `onSubmit`
  0. `POST /api/users` is called.
  0. `receiveCurrentUser` is set as the success callback.
* `logIn`
  0. invoked from `Navbar` `onSubmit`
  0. `POST /api/session` is called.
  0. `receiveCurrentUser` is set as the callback.
* `logOut`
  0. invoked from `Navbar` `onClick`
  0. `DELETE /api/session` is called.
  0. `removeCurrentUser` is set as the success callback.
* `fetchCurrentUser`
  0. invoked from `App` in `didMount`
  0. `GET /api/session` is called.
  0. `receiveCurrentUser` is set as the success callback.

### Session API Response Actions

* `receiveCurrentUser`
  0. invoked from an API callback
  0. stores in `_currentUser` in `CurrentUserStore`
* `removeCurrentUser`
  0. invoked from an API callback
  0. removes `_currentUser` in `CurrentUserStore`

## Error Cycles

### Error API Response Actions
* `setErrors`
  0. invoked from API callbacks on error for actions that generate POST requests
  0. sets `form` and `_errors` in the `ErrorStore`
* `removeErrors`
  0. invoked from API callbacks on success for actions that generate POST requests
  0. removes `_errors` for a given `form` in the `ErrorStore`

## Groups Cycles

### Groups API Request Actions

* `fetchAllGroups`
  0. invoked from `GroupsIndex` `didMount`/`willReceiveProps`
  0. `GET /api/groups` is called.
  0. `receiveAllGroups` is set as the success callback.

* `createGroup`
  0. invoked from new group button `onClick`
  0. `POST /api/groups` is called.
  0. `receiveSingleGroup` is set as the success callback.

* `fetchSingleGroup`
  0. invoked from `GroupDetail` `didMount`/`willReceiveProps`
  0. `GET /api/groups/:id` is called.
  0. `receiveSingleGroup` is set as the success callback.

* `updateGroup`
  0. invoked from `GroupForm` `onSubmit`
  0. `PATCH /api/groups/:id` is called.
  0. `receiveSingleGroup` is set as the success callback.

* `destroyGroup`
  0. invoked from delete group button `onClick`
  0. `DELETE /api/groups/:id` is called.
  0. `destroyGroup` is set as the success callback.

* `joinGroup`
  0. invoked from join group button `onClick`
  0. `POST /api/memberships` is called.
  0. `joinGroup` is set as the success callback

* `leaveGroup`
  0. invoked from leave group button `onClick`
  0. `DELETE /api/memberships/:id` is called
  0. `leaveGroup` is set as success callback

### Groups API Response Actions

* `receiveAllGroups`
  0. invoked from an API callback.
  0. `Group` store updates `_groups` and emits change.

* `receiveSingleGroup`
  0. invoked from an API callback.
  0. `Group` store updates `_groups[id]` and emits change.

* `destroyGroup`
  0. invoked from an API callback.
  0. `Group` store removes `_groups[id]` and emits change.

### Store Listeners

* `GroupsIndex` component listens to `Group` store.
* `GroupDetail` component listens to `Group` store.


## Event Cycles

### Events API Request Actions

* `fetchAllEvents`
  0. invoked from `EventsIndex` `didMount`/`willReceiveProps`
  0. `GET /api/events/` is called.
  0. `receiveAllEvents` is set as the success callback.

* `createEvent`
  0. invoked from new event button `onClick`
  0. `POST /api/events` is called.
  0. `receiveSingleEvent` is set as the callback.

* `fetchSingleEvent`
  0. invoked from `EventDetail` `didMount`/`willReceiveProps`
  0. `GET /api/events/:id` is called.
  0. `receiveSingleEvent` is set as the success callback.

* `updateEvent`
  0. invoked from `EventForm` `onSubmit`
  0. `PATCH /api/events/:id` is called.
  0. `receiveSingleEvent` is set as the success callback.

* `destroyEvent`
  0. invoked from delete event button `onClick`
  0. `DELETE /api/events/:id` is called.
  0. `removeEvent` is set as the success callback.

### Events API Response Actions

* `receiveAllEvents`
  0. invoked from an API callback.
  0. `Event` store updates `_events` and emits change.

* `receiveSingleEvent`
  0. invoked from an API callback.
  0. `Event` store updates `_events[id]` and emits change.

* `removeEvent`
  0. invoked from an API callback.
  0. `Event` store removes `_events[id]` and emits change.

### Event Store Listeners

* `Calendar`    component listens to `Event` store
* `EventsIndex` component listens to `Event` store.
* `EventDetail` component listens to `Event` store.

## RSVP Cycles

### Events API Request Actions
* `fetchAllRSVPs`
  0. invoked from `RSVPsIndex` `didMount`/`willReceiveProps`
  0. `GET /api/events/:event_id/rsvps` is called.
  0. `receiveAllRSVPs` is set as the success callback.

* `createRSVP`
  0. invoked from new rsvp button `onClick`
  0. `POST /api/events/:event_id/rsvps` is called.
  0. `receiveSingleRSVP` is set as the callback.

* `fetchSingleRSVP`
  0. invoked from `RSVPDetail` `didMount`/`willReceiveProps`
  0. `GET /api/events/:event_id/rsvp/:id` is called.
  0. `receiveSingleRSVP` is set as the success callback.

* `updateRSVP`
  0. invoked from `RSVPForm` `onSubmit`
  0. `PATCH /api/events/:event_id/rsvp/:id` is called.
  0. `receiveSingleRSVP` is set as the success callback.

* `destroyRSVP`
  0. invoked from delete rsvp button `onClick`
  0. `DELETE //api/events/:event_id/rsvp/:id` is called.
  0. `removeRSVP` is set as the success callback.

### RSVPs API Response Actions

* `receiveAllRSVPs`
  0. invoked from an API callback.
  0. `RSVP` store updates `_rsvps` and emits change.

* `receiveSingleRSVP`
  0. invoked from an API callback.
  0. `RSVP` store updates `_rsvps[id]` and emits change.

* `removeRSVP`
  0. invoked from an API callback.
  0. `RSVP` store removes `_rsvps[id]` and emits change.

### RSVP Store Listeners

* `RSVPsIndex` component listens to `RSVP` store.
* `RSVPDetail` component listens to `RSVP` store.

## SearchBar Cycles

* `fetchSearchBarResults`
  0. invoked from `SearchBar` `onChange` when there is text
  0. `GET /api/groups` is called with `text` param.
  0. `receiveSearchBarResults` is set as the success callback.

* `receiveSearchBarResults`
  0. invoked from an API callback.
  0. `SearchBar` store updates `_results` and emits change.

* `removeSearchBarResults`
  0. invoked from `SearchBar` `onChange` when empty
  0. `SearchBar` store resets `_results` and emits change.

### Store Listeners

* `SearchBar` component listens to `SearchBar` store.
