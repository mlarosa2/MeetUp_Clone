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

Events are created in one table, with the columns, `id`,  `group_id`, `title`, `description`,  `start_date`, `start_time`, and `end_time`. Events are related to Groups via the `memberships` table in the database.


### RSVP

RSVPs are sent to members from other members. They are made in one `rsvps` table, with `id`, `event_id`, `user_id`, and `attending` (a boolean value) as columns.
RSVPs are rendered on the EventDetail component as a RSVPIndex component, made up of RSVPDetail components.

### Search

Search filters groups via key group information (i.e. the group's name), and location within a certain range. The search feature is a fully front end feature, that fetches data from the backend.

### Calendar

A Calendar belongs to a group and displays all of the groups events in a calendar format. Like Search, Calendar is a fully front end component, that is rendered via data fetched from the backend. The calendar listens to the `EventStore`.
