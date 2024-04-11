require "../helpers/routes"

abstract class Application::Controller < Frost::Controller
  include Helpers::Routes

  # def before_action
  # end

  def authenticate_user! : Nil
    redirect_to(routes.new_session_path, :found) unless authenticate_user?
  end

  def authenticate_user? : Bool
    return false unless session?
    return false unless user_id = session["user.id"]?

    Current.user = UserRepository.get(user_id)
    true
  end
end
