## Component Hierarchy

**Bolded** components are associated with routes.

* **App**
  * Navbar
  * SignupForm
  * SignInForm
  * GroupsIndex
    * SearchBar
    * CreateGroupForm
    * GroupIndexItem
  * **GroupDetail**
    * UpdateGroupForm
    * Calendar
    * **EventsIndex**
      * CreateEventForm
      * EventIndexItem
      * CreateEventForm
    * **EventDetail**
      * RSVPs
      * UpdateRSVPForm
      * UpdateEventForm


## Routes

* **component:** `App` **path:** `/`
  * **component:** `LoginForm` **path:** /login
  * **component:** `SignupForm` **path:** /signup
  * **component:** `GroupsIndex` **path:** /groups
    * **component:** `GroupDetail` **path:** `groups/:groupId`
      * **component:** `Calendar`  **path:** `groups/:groupId/calendar`
      * **component:** `EventsIndex` **path** `/groups/:groupId/events`
      * **component:** `EventDetail` **path:** `/events/:eventId`
