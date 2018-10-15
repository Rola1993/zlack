class AddUserToMessages < ActiveRecord::Migration[5.2]
  def change
    add_column :messages, :user_id, :integer
    add_index :messages, :user_id
  end
end
