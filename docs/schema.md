# Schema Information

## groups
column name    | data type | details
---------------|-----------|-----------------------
id             | integer   | not null, primary key
title          | string    | not null
moderator_id   | integer   | not null, foreign key (references user), indexed
description    | text      | not null
city           | string    | not null
state          | string    | not null


## memberships
column name    | data type | details
---------------|-----------|-----------------------
id             | integer   | not null, primary key
member_id      | integer   | not null, foreign key (references users), indexed
group_id       | integer   | not null, foreign key (references groups), indexed

## events
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
group_id    | integer   | not null, foreign key (references groups), indexed
title       | string    | not null
description | text      | not null
start_date  | integer   | not null
start_time  | integer   | not null
end_time    | integer   | not null

## rsvps
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
event_id    | integer   | not null, foreign key (references events), indexed
user_id     | integer   | not null, foreign key (references users), indexed
attending   | boolean   |

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
email           | string    | not null, indexed, unique
username        | string    | not null, indexed, unique
password_digest | string    | not null
session_token   | string    | not null, indexed, unique
