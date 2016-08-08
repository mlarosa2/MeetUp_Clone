class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.integer :group_id,  null: false
      t.string :title, null: false
      t.text :description, null: false
      t.date :start_date, null: false
      t.time :start_time, null: false
      t.time :end_time, null: false

      t.timestamps null: false
    end

    add_foreign_key :events, :groups, column: :group_id
  end
end
