# @memberships.each do |membership|
#   json.set! membership.id do
#     json.id membership.id
#     json.members do
#       json.partial! 'api/users/user', locals: { user: User.find(membership.user_id) }
#     end
#   end
# end
users = Membership.get_members_for_group(params[:group_id])
json.members do
  json.partial!  'api/users/user', collection: users, as: :user
end
