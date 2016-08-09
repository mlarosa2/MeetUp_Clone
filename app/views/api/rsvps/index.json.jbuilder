@rsvps.each do |rsvp|
  json.set! rsvp.id do
    json.partial! 'rsvp', locals: { rsvp: rsvp }
  end
end
