class CreateGroups < ActiveRecord::Migration
  def change
    create_table :groups do |t|
      t.string :title, null: false, index: true
      t.integer :moderator_id, null: false, foreign_key: true
      t.text :description, null: false, index: true
      t.string :city, null: false
      t.string :state, null: false

      t.timestamps null: false
    end
  end
end
