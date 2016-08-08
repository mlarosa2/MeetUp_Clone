class Api::EventsController < ApplicationController
  def index
    @events = Event.all
    render :index
  end

  def show
    @event = Event.find(params[:id])
    render @event
  end

  def create
    @event = Event.new(event_params)

    if @event.save!
      render @event
    else
      render json: @event.errors.full_messages, status: 412
    end
  end

  def update
    @event = Event.find(params[:id])

    if @event.update(event_params)
      render @event
    else
      render json: @event.errors.full_messages, status: 412
    end
  end

  def destroy
    @event = Event.find(params[:id])

    group = Group.find(@event.group_id)
    if @event.destroy
      render json: group
    else
      render json: @event.errors.full_messages, status: 412
    end
  end

  private
  def event_params
    params.require(:event).permit(:group_id, :title, :description, :start_date, :start_time, :end_time)
  end
end
