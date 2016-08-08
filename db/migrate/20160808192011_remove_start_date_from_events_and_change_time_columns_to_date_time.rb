class RemoveStartDateFromEventsAndChangeTimeColumnsToDateTime < ActiveRecord::Migration
  def change
    remove_column :events, :start_date
    remove_column :events, :start_time
    remove_column :events, :end_time
    add_column :events, :start_time, :datetime, null: false
    add_column :events, :end_time, :datetime, null: false
  end
end
