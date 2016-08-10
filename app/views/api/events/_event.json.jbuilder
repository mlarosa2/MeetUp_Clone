json.event do
  json.id event.id
  json.title event.title
  json.description event.description
  json.group_id event.group_id
  json.attendees event.attendees.map do |attendee|
    json.id attendee.id
    json.username attendee.username
    json.image_url asset_path(attendee.image.url(:original))
  end
  json.start_time event.start_time
  json.end_time event.end_time
end
