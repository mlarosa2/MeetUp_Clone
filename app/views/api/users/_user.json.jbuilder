json.user do
  json.id user.id
  json.username user.username
  json.email user.email
  json.image_url asset_path(user.image.url)
  json.joined user.created_at.strftime("%b %d, %Y")
end
