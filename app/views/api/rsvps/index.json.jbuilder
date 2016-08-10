@rsvps.each do |rsvp|
  if rsvp.attending
    json.set! rsvp.id do
      json.partial! 'rsvp', locals: { rsvp: rsvp }
    end
  end
end
