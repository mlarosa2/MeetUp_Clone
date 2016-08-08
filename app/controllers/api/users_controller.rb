class Api::UsersController < ApplicationController
  def create
    @user = User.new(user_params)

    if @user.save
      sign_in!(@user)
      render @user
    else
      render json: @user.errors.full_messages, status: 412
    end
  end

  def show
    @user = User.find(params[:id])

    render @user
  end

  def update
    @user = User.find(params[:id])

    if @user.update(user_params)
      render @user
    else
      render json: @user.errors.full_messages, status: 412
    end
  end

  private
  def user_params
    params.require(:user).permit(:username, :email, :password, :image)
  end
end
