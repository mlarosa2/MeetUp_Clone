@groups.each do |group|
  json.set! group.id do
    json.partial! '/api/groups/group.json.jbuilder', group: @group
  end
end
