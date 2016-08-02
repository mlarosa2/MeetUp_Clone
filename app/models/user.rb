class User < ActiveRecord::Base
  validates :email, :username, :session_token, :password_digest, presence: true
  validates :password, length: { minimum: 6, allow_nil: true }

  after_initialize
end
