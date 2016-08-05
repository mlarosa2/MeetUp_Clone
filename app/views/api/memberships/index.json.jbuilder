
users = Membership.get_members_for_group(params[:group_id])

json.array! @memberships do |mem|
  json.membership_id mem.id
  json.partial! 'api/users/user', user: User.find(mem.member_id)
end
