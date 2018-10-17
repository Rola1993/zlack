class ChatChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'chat_channel'
  end

  def unsubscribed; end

  def create(opts)
    Message.create(
      body: opts.fetch('body'),
      user_id: opts.fetch('user_id'),
      chatroom_id: opts.fetch('chatroom_id')
    )
  end
end
