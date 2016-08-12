class Api::EventsController < ApplicationController
  def index
    if params[:group_id]
      @events = Event.where(group_id: params[:group_id])
    else
      @events = Event.all
    end
    
    render :index
  end

  def show
    @event = Event.find(params[:id])
    render @event
  end

  def create
    @event = Event.new(event_params)

    if @event.save
      render @event
    else
      render json: @event.errors.full_messages, status: 412
    end
  end

  def update
    @event = Event.find(params[:event][:id])

    if @event.update(event_params)
      render @event
    else
      render json: @event.errors.full_messages, status: 412
    end
  end

  def destroy
    @event = Event.find(params[:id])

    event = @event
    if @event.destroy
      render json: event
    else
      render json: @event.errors.full_messages, status: 412
    end
  end

  private
  def event_params
    params.require(:event).permit(:id, :group_id, :title, :description, :start_time, :end_time)
  end
end
