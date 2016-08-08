@events.each do |event|
  json.set! event.id do
    json.partial! 'event', locals: { event: event }
  end
end
