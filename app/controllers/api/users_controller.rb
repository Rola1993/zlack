class Api::UsersController < ApplicationController

  def index
    render json: User.all()
  end

  def create
    @user = User.new(user_params)
    profile_pic = [
      "https://ca.slack-edge.com/T03GU501J-U96UZMZ8B-g6bbc5e1dbd2-48",
      "https://ca.slack-edge.com/T03GU501J-UBVJX8CB1-g959c98ec02a-48",
      "https://ca.slack-edge.com/T03GU501J-UBQT30TME-g0dfbde741cb-48",
      "https://ca.slack-edge.com/T03GU501J-UBTUKPUKT-g77790ef932c-48",
      "https://ca.slack-edge.com/T03GU501J-UBRKE8ZL2-gec36c925d48-48",
      "https://ca.slack-edge.com/T03GU501J-UBUG18T3L-gde3a340d9a2-48",
      "https://ca.slack-edge.com/T03GU501J-UBYDRM5K5-gf0b2cc06e7e-48",
      "https://ca.slack-edge.com/T03GU501J-U173XUKEH-ga475614689e-48"
      ]
    @user.img_url = profile_pic.sample
    if @user.save
      login!(@user)
      render "api/users/show"
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  private
  def user_params
    params.require(:user).permit(:username, :password)
  end
end
