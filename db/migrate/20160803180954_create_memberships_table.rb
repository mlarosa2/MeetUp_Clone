class CreateMembershipsTable < ActiveRecord::Migration
  def change
    create_table :memberships do |t|
      t.integer :member_id, null: false, index: true
      t.integer :group_id, null: false, index: true

      t.timestamps null: false
    end

    add_foreign_key :memberships, :users, column: :member_id
    add_foreign_key :memberships, :groups, column: :group_id
  end
end
