class MessageCreationEventBroadcastJob < ApplicationJob
  queue_as :default

  def perform(message)

    ActionCable
      .server
      .broadcast("chat-#{message.chatroom_id}:messages",
                 id: message.id,
                 created_at: message.created_at,
                 body: message.body,
                 user_id: message.user_id,
                 chatroom_id: message.chatroom_id)
  end
end
