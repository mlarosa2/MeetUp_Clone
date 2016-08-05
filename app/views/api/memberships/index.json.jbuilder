@memberships.each do |membership|
  json.set! membership.id do
    json.group_id membership.group_id
    json.member_id membership.member_id
  end
end
