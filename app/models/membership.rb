class Membership < ActiveRecord::Base
  validates :group_id, :member_id, presence: true
  validates :group_id, uniqueness: { scope: :member_id }

  belongs_to(
    :group,
    class_name: "Group",
    foreign_key: :group_id,
    primary_key: :id,
  )

  belongs_to(
    :member,
    class_name: "User",
    foreign_key: :member_id,
    primary_key: :id,
  )

  def self.get_members_for_group(id)
    Membership.where(group_id: id).map do |membership|
      membership.member
    end
  end
end
