json.event do
  json.id event.id
  json.title event.title
  json.description event.description
  json.group_id event.group_id
  json.start_time event.start_time
  json.end_time event.end_time
  json.rsvps event.rsvps do |rsvp|
    json.partial! 'api/rsvps/rsvp', rsvp: rsvp
  end
end
