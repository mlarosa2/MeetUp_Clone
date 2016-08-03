class Api::MembershipsController < ApplicationController
  def create
    @membership = Membership.new(membership_params)
    if @membership.save
      render Group.find(@membership.group_id)
    else
      render json: @membership.errors.full_messages
    end
  end

  def destroy
    @membership = Membership.find(params[:id])
    group = Group.find(@membership.group_id)
    if @membership.destroy
      render group
    else
      render json: @membership.errors.full_messages
    end
  end

  private
  def membership_params
    params.require(:membership).permit(:group_id, :member_id)
  end
end
