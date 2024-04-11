class Home::Controller < Application::Controller
  def index
    if authenticate_user?
      redirect_to routes.stacks_path
    else
      redirect_to routes.new_session_path
    end
  end
end
