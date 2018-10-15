class Api::WorkspacesController < ApplicationController
  before_action :require_logged_in

  def index
    render json: Workspace.all()
  end

  def show
    render json: Workspace.find(params[:id])
  end

  private

  def workspace_params
    params.require(:workspace).permit(:name)
  end
end
