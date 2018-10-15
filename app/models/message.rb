class Message < ApplicationRecord

  belongs_to :user
  
  after_create_commit do
    MessageCreationEventBroadcastJob.perform_later(self)
  end
end
