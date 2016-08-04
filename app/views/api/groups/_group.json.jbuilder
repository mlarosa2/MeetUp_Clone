
json.group do
 json.id group.id
 json.title group.title
 json.description group.description
 json.moderator_id group.moderator_id
 json.city group.city
 json.state group.state
 json.members group.members.length
end
