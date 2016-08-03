class User < ActiveRecord::Base
  validates :email, :username, :session_token, :password_digest, presence: true
  validates :password, length: { minimum: 6, allow_nil: true }
  validates :email, uniqueness: true
  after_initialize :generate_session_token
  attr_reader :password

  has_many(
    :memberships,
    class_name: "Membership",
    foreign_key: :member_id,
    primary_key: :id
  )

  has_many(
    :groups,
    through: :memberships,
    source: :group
  )

  def self.create_session_token
    SecureRandom::urlsafe_base64
  end

  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)
    if user && user.is_password?(password)
      user
    else
      nil
    end
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def reset_session_token!
    self.session_token = User.create_session_token
    self.save!
    self.session_token
  end

  private
  def generate_session_token
    self.session_token = User.create_session_token
  end
end
