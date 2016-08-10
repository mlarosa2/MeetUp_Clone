json.rsvp do
  json.id rsvp.id
  json.event_id rsvp.event_id
  json.user_id rsvp.user_id
  json.image_url asset_path(User.find(rsvp.user_id).image.url(:original))
end
