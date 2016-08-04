class Membership < ActiveRecord::Base
  validates :group_id, :member_id, presence: true
  validates :group_id, uniqueness: { scope: :member_id }

  belongs_to(
    :group,
    class_name: "Group",
    foreign_key: :group_id,
    primary_key: :id,
    dependent: :destroy
  )

  belongs_to(
    :member,
    class_name: "User",
    foreign_key: :member_id,
    primary_key: :id,
    dependent: :destroy
  )
end
