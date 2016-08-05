@memberships.each do |membership|
  json.set! membership.id do
    json.id membership.id
    json.group_id membership.group_id
    json.member_id membership.member_id
  end
end
