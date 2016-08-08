json.user do
  json.id user.id
  json.username user.username
  json.email user.email
  json.image_url asset_path(user.image.url(:original))
  json.joined user.created_at.strftime("%b %d, %Y")
  json.groups user.groups.take(5).map do |group|
    json.id group.id
    json.title group.title
  end
end
