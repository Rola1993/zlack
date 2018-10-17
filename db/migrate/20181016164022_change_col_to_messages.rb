class ChangeColToMessages < ActiveRecord::Migration[5.2]
  def change
    change_column :messages, :user_id, :integer, :null => false

  end
end
