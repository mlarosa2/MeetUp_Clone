json.membership do
  json.id membership.id
end

json.extract! membership, :id
