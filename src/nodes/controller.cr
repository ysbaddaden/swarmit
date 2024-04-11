class Nodes::Controller < Application::Controller
  before_action do
    authenticate_user!
  end

  def show
    node = NodeRepository.find(params.route["id"])
    tasks = TaskRepository.list(node)
    services = ServiceRepository.dictionary
    render ShowPage.new(node, tasks, services)
  end

  def index
    nodes = NodeRepository.list
    render IndexPage.new(nodes)
  end
end
