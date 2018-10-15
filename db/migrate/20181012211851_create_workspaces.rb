class CreateWorkspaces < ActiveRecord::Migration[5.2]
  def change
    create_table :workspaces do |t|
      t.string :name, null:false
      t.string :img_url, null:false
      
      t.timestamps
    end
  end
end
