class Event < ActiveRecord::Base
  validates :group_id, :title, :description, :start_time, :end_time, presence: true
  validate :date_is_in_future?, :end_time_comes_after?

  has_many(
    :rsvps,
    class_name: "Rsvp",
    foreign_key: :event_id,
    primary_key: :id,
    dependent: :destroy
  )

  has_many(
    :attendees,
    through: :rsvps,
    source: :user
  )

  def date_is_in_future?

  end

  def end_time_comes_after?

  end
end
