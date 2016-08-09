class CreateRsvps < ActiveRecord::Migration
  def change
    create_table :rsvps do |t|
      t.integer :event_id, null: false
      t.integer :user_id, null: false
      t.boolean :attending

      t.timestamps null: false
    end

    add_foreign_key :rsvps, :users, column: :user_id
    add_foreign_key :rsvps, :events, column: :event_id
    add_index :rsvps, [:event_id, :user_id], unique: true
  end
end
