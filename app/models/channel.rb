class Channel < ApplicationRecord
  validates :name, presence:true

  belongs_to :workspace
  has_many :channel_subscriptions, inverse_of: :channel
  has_many :users, through: :channel_subscriptions, source: :user
end
