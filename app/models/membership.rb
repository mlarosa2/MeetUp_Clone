class Membership < ActiveRecord::Base
  validates :group_id, :member_id, presence: true
end
