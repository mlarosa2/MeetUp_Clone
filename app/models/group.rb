class Group < ActiveRecord::Base
  validates :title, :moderator_id, :description, :city, :state, :lat, :lng, presence: true
  has_attached_file :image, default_url: "liberty_code.jpeg"
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/

  has_one(
    :moderator,
    class_name: "User",
    foreign_key: :moderator_id,
    primary_key: :id
  )

  has_many(
    :memberships,
    class_name: "Membership",
    foreign_key: :group_id,
    primary_key: :id,
    dependent: :destroy
  )

  has_many(
    :members,
    through: :memberships,
    source: :member
  )
end
