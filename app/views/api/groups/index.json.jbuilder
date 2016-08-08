@groups.each do |group|
  json.set! group.id do
    json.partial! 'group', locals: { group: group }
  end
end
