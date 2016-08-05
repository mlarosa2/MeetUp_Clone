json.user do
  json.id user.id
  json.username user.username
  json.email user.email
  json.joined user.created_at.strftime("%b %d, %Y")
end

json.extract! user, :id, :username, :email, :created_at
