json.group do
 json.id group.id
 json.title group.title
 json.description group.description
 json.moderator_id group.moderator_id
 json.city group.city
 json.state group.state
 json.lat group.lat
 json.lng group.lng
 json.image_url asset_path(group.image.url(:original))
 json.members group.members.length
 json.created group.created_at.strftime("%b %d, %Y")
end
