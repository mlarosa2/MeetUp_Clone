# MeetUp

[MeetUp live][heroku]

[heroku]: http://www.herokuapp.com


This MeetUp clone has been implemented using the Ruby on Rails web framework, a PostgreSQL database, and
a frontend created with React.js following the Flux architecture.  

## Features & Implementation

### Single-Page App

This app utilizes React.js and the Flux architecture to create and app that delivers
content as needed on a single static page. Content is rendered based on the current user.
By listening to a `SessionStore`, information about the current user can be retrieved by
calling `SessionStore.currentUser()`.


### Groups

  Groups are stored as one table in the database. Groups have `id`, `title`, `moderator_id`, `description`, `city`, and `state` columns. Groups are fetched when a user signs in, or upon search.

  Groups are rendered as GroupIndex or GrouptDetail components. The GroupIndex component is made up of a list of GrouptDetail components, where individual group data is processed.

### Events

Events are held by groups. An EventsIndex is rendered on the GroupDetail component, and is made up of EventDetail components. These components listen to the `EventStore`.

Events Appear automatically on the group's calendar. They have their own details page as well. Events can only be deleted or edited by the group's creator. The interface for changing events is on the `EventIndex` rather than a control panel.
![event]

![event-admin]


### RSVP

RSVPs are sent to members from other members. They are made in one `rsvps` table, with `id`, `event_id`, `user_id`, and `attending` (a boolean value) as columns.
RSVPs are rendered on the EventDetail component as a RSVPIndex component, made up of RSVPDetail components.

### Search

Search filters groups via group title, and location within a certain range of a specified city. Search happens after clicking the magnifying glass, and is cleared when the user returns to the home page.

![search-bar]

### Calendar

A Calendar belongs to a group and displays all of the groups events in a calendar format.

### Pending Features

The rsvps table has an extraneous attending column. In the future, I hope to implement pending RSVPs that gets sent to the user as a notification.

[event]: ./production_img/event.png
[event-admin]: ./production_img/event_admin.png
[search-bar]: ./production_img/search_bar.png
