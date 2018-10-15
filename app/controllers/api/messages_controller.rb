class Api::MessagesController < ApplicationController
  before_action :require_logged_in

  def index
    render json: Message.all()
  end

  def show
    render json: Message.find(params[:id])
  end

  private

  def message_params
    params.require(:message).permit(:name)
  end
end
