# Phase 2: Flux Architecture, Groups and Joining Groups (2 days)

## Rails
### Models
* Group

### Controllers
* Api::GroupsController (create, destroy, index, show, update)

### Views
* groups/index.json.jbuilder
* groups/show.json.jbuilder

## Flux
### Views (React Components)
* GroupsIndex
  - GroupsDetail
* GroupForm

### Stores
* Group

### Actions
* `GroupActions.fetchAllGroups`
* `GroupActions.fetchSingleGroup`
* `GroupActions.createGroup`
* `GroupActions.editGroup`
* `GroupActions.destroyGroup`
* `GroupAction.joinGroup`
* `GroupAction.leaveGroup`

### ApiUtil
* `GroupApiUtil.fetchAllGroups`
* `GroupApiUtil.fetchSingleGroup`
* `GroupApiUtil.createGroup`
* `GroupApiUtil.editGroup`
* `GroupApiUtil.destroyGroup`
* `GroupApiUtil.joinGroup`
* `GroupApiUtil.leaveGroup`

## Gems/Libraries
