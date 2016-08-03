class AddForeignKeyToGroups < ActiveRecord::Migration
  def change
    add_foreign_key :groups, :users, column: :moderator_id
  end
end
