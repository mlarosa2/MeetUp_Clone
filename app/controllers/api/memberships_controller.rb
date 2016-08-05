class Api::MembershipsController < ApplicationController
  def index
    @memberships = Membership.where(group_id: params[:group_id])
    render :index
  end
  def create
    @membership = Membership.new(membership_params)
    if @membership.save
      render @membership
    else
      render json: @membership.errors.full_messages
    end
  end

  def destroy
    @membership = Membership.find(params[:id])
    membership = @membership
    if @membership.destroy
      render membership
    else
      render json: @membership.errors.full_messages
    end
  end

  private
  def membership_params
    params.require(:membership).permit(:group_id, :member_id)
  end
end
