class Api::ChannelsController < ApplicationController
  before_action :require_logged_in

  def index
    render json: Channel.all()
  end

  def show
    render json: Channel.find(params[:id])
  end

  private

  def channel_params
    params.require(:channel).permit(:name)
  end
end
