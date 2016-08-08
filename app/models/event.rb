class Event < ActiveRecord::Base
  validates :group_id, :title, :description, :start_date, :start_time, :end_time, presence: true
  validate :date_is_in_future?, :end_time_comes_after?

  def date_is_in_future?
    if self.start_date.past?
      errors.add(:start_date, "can't be in the past")
    end
  end

  def end_time_comes_after?
    
  end
end
