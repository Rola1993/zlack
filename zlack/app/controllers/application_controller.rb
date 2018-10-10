class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception #  for preventing CSRF
  helper_method :current_user, :logged_in?

  def login!(user)
    session[:session_token] = user.reset_session_token!
    @current_user = user
  end

  def logout!
    current_user.reset_session_token!
    session[:session_token] = nil
    @current_user = nil
  end

  def current_user
    return nil unless session[:session_token]
    @current_user ||= User.find_by_session_token(session[:session_token])
  end

  def logged_in?
    !current_user.nil?
  end

  def require_logged_in
    if current_user.nil?
      render json: { base: ['Invalid credentials'], status: 401}
    end
  end

  def user_params
    params.require(:user).permit(:username, :password)
  end
end
