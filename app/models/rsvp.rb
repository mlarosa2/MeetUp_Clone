class Rsvp < ActiveRecord::Base
  validates :event_id, :user_id, presence: true
  validates :event_id, uniqueness: { scope: :user_id }

  belongs_to(
    :event,
    class_name: "Event",
    foreign_key: :event_id,
    primary_key: :id
  )

  belongs_to(
    :user,
    class_name: "User",
    foreign_key: :user_id,
    primary_key: :id
  )
end
