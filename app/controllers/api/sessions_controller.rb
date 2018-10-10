class Api::SessionsController < ApplicationController

  def create #login
    @user = User.find_by_credentials(
      params[:user][:username],
      params[:user][:password]
    )

    if @user
      login!(@user)
      render "api/users/show"
    else
      render json: ["invalid credentials"], status: 401
    end
  end

  def destroy
    @user = current_user
    if @user # Render an empty {} upon successful logout.
      logout!
      render "api/users/show"
    else  # Render a 404 message if there is no current_user to logout
      render json: ['No user signed in'], status:404
    end

  end
end
