class UpdateMembershipsTableForUniqueness < ActiveRecord::Migration
  def change
    add_index :memberships, [:group_id, :member_id], unique: true
  end
end
