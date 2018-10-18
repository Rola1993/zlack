class Channel < ApplicationRecord

  belongs_to :workspace
  has_many :channel_subscriptions
  has_many :users, through: :channel_subscriptions, source: :user
end
