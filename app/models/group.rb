class Group < ActiveRecord::Base
  validates :title, :moderator_id, :description, :city, :state, presence: true

  has_one(
    :moderator,
    class_name: "User",
    foreign_key: :moderator_id,
    primary_key: :id
  )

  has_many(
    :members,
    through: :memberships,
    source: :member_id
  )
end
