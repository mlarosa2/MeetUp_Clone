class Api::UsersController < ApplicationController
  def create
    @user = User.new(user_params)

    if @user.save
      @user
    else
      flash.now[:errors] = @user.errors.full_messages
    end
  end

  def show
    @user = User.find(params[:id])

    @user
  end

  def update
    @user = User.find(params[:id])

    if @user.update(user_params)
      @user
    else
      flash.now[:errors] = @user.errors.full_messages
    end
  end

  private
  def user_params
    params.permit(:user).require(:username, :email, :password)
  end
end
