class Api::RsvpsController < ApplicationController
  def index
    @rsvps = Rsvp.where(event_id: params[:event_id])
    render :index
  end

  def create
    @rsvp = Rsvp.new(rsvp_params)

    if @rsvp.save
      render @rsvp
    else
      render json: @rsvp.errors.full_messages, status: 412
    end

  end

  def update
    @rsvp = Rsvp.find(params[:rsvp][:id])
    if @rsvp.update(rsvp_params)
      render @rsvp
    else
      render json: @rsvp.errors.full_messages, status: 412
    end
  end

  def destroy
    @rsvp = Rsvp.find(params[:id])
    rsvp = @rsvp
    if @rsvp.destroy
      render rsvp
    else
      render json: @rsvp.errors.full_messages, status: 412
    end
  end

  private
  def rsvp_params
    params.require(:rsvp).permit(:event_id, :user_id, :attending)
  end
end
