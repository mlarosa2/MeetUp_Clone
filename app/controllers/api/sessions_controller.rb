class Api::SessionsController < ApplicationController
  def create
    user = User.find_by_credentials(
      params[:user][:username],
      params[:user][:password]
    )
    if user
      sign_in!(user)
      render user
    else
      render json: "Invalid User", status: 412
    end
  end

  def destroy
    if current_user
      sign_out!(user)
    else
      render json: "No one is signed in", status: 405
    end
  end
end
