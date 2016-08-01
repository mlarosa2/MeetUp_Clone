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
* `ApiActions.receiveAllGroups`
* `ApiActions.receiveSingleGroup`
* `ApiActions.deleteGroup`
* `GroupActions.fetchAllGroups`
* `GroupActions.fetchSingleNote`
* `GroupActions.createGroup`
* `GroupActions.editGroup`
* `GroupActions.destroyGroup`
* `GroupAction.joinGroup`
* `GroupAction.leaveGroup`

### ApiUtil
* `ApiUtil.fetchAllGroups`
* `ApiUtil.fetchSingleGroup`
* `ApiUtil.createGroup`
* `ApiUtil.editGroup`
* `ApiUtil.destroyGroup`
* `ApiUtil.joinGroup`
* `ApiUtil.leaveGroup`

## Gems/Libraries
