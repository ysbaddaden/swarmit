class Users::Controller < Application::Controller
  before_action do
    authenticate_user!
  end

  def index
    users = UserRepository.list
    render IndexPage.new(users)
  end
end
