class User < ApplicationRecord
  attr_reader :password
  validates :username, :password_digest, :session_token, presence:true
  validates :password, length: {minimum: 6, allow_nil:true}
  validates :session_token, :username, uniqueness: true
  after_initialize :ensure_session_token

  has_many :workspace_memberships
  has_many :workspaces, through: :workspace_memberships, source: :workspace
  has_many :messages
  has_many :channel_subscriptions, inverse_of: :user
  has_many :channels, through: :channel_subscriptions, source: :channel

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    user && user.is_password?(password) ? user : nil
  end

  def ensure_session_token
    self.session_token ||= SecureRandom::urlsafe_base64(16)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def reset_session_token!
    self.session_token = SecureRandom::urlsafe_base64(16)
    self.save!
    self.session_token
  end
end
