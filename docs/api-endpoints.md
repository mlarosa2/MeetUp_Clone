# API Endpoints

## HTML API

### Root

- `GET /` - loads React web app

## JSON API

### Users

- `POST /api/users`
- `PATCH /api/users`

### Session

- `POST /api/session`
- `DELETE /api/session`
- `GET /api/session`

### Groups

- `GET /api/groups`
  - Groups index/search
  - accepts `group_name` and `group_location` query params to list Groups by group information
- `POST /api/groups`
- `GET /api/groups/:id`
- `PATCH /api/groups/:id`
- `DELETE /api/groups/:id`

### Events

- `GET /api/events`
- `POST /api/events`
- `GET /api/events/:id`
- `PATCH /api/event/:id`
- `DELETE /api/events/:id`
- `GET /api/groups/:id/events`
  - index of all events for a group

### RSVPs

- RSVP's will be included in the events show template
- `GET /api/rsvps`
- `POST /api/rsvps`: add RSVP by id
- `DELETE /api/rsvps/:id`: remove RSVP from event by id

### Calendars

- `GET /api/groups/:id/calendar`
