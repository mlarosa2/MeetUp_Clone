class AddLatLngToGroups < ActiveRecord::Migration
  def change
    add_column :groups, :lat, :decimal, null: false
    add_column :groups,  :lng, :decimal, null: false
  end
end
