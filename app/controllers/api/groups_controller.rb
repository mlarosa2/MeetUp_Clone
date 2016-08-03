class Api::GroupsController < ApplicationController
  def index
    @groups = Group.all
    render @groups
  end

  def show
    @group = Group.find(params[:id])

    render @group
  end

  def create
    @group = Group.new(group_params)

    if @group.save
      render @group
    else
      render json: @group.errors.full_messages, status: 412
    end
  end

  def update
    @group = Group.find(params[:id])

    if @group.update(group_params)
      render @group
    else
      render json: @group.errors.full_messages, status: 412
    end
  end

  def destroy
    @group = Group.find(params[:id])
    group = @group
    if @group.destroy
      render json: group
    else
      render json: @group.errors.full_messages, status: 412
    end
  end

  private
  def group_params
    params.require(:group).permit(:title, :moderator_id, :description, :city, :state)
  end
end
