class AddChatroomToMessage < ActiveRecord::Migration[5.2]
  def change
    add_column :messages, :chatroom_id, :integer, null:false
    add_index :messages, :chatroom_id
  end
end
