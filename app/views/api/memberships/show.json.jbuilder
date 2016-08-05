json.membership_id @membership.id
json.partial! 'api/users/user', user: User.find(@membership.member_id)
