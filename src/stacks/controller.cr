class Stacks::Controller < Application::Controller
  before_action do
    authenticate_user!
  end

  def index
    render IndexPage.new(StackRepository.list)
  end
end
