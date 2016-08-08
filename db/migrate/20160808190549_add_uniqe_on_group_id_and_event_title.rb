class AddUniqeOnGroupIdAndEventTitle < ActiveRecord::Migration
  def change
    add_index :events, [:group_id, :title], unique: true
  end
end
