class Membership < ActiveRecord::Base
  validates :group_id, :member_id, presence: true
  validates :group_id, uniqueness: { scope: :member_id }
end
