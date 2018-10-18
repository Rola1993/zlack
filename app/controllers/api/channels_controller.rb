class Api::ChannelsController < ApplicationController
  before_action :require_logged_in

  def index
    render json: Channel.all()
  end

  def show
    render json: Channel.find(params[:id])
  end

  def create
    @channel = Channel.new(channel_params)
    @channel.workspace_id = 1

    if @channel.save
      render :show
    end
  end

  private

  def channel_params
    params.require(:channel).permit(:name,:is_dm,user_ids:[])
  end
end
