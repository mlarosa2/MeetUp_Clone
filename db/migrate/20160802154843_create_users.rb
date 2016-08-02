class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :email, null: false, index: true
      t.string :username, null: false, index: true
      t.string :password_digest, null: false
      t.string :session_token, null: false, index: true
      
      t.timestamps null: false
    end
  end
end
