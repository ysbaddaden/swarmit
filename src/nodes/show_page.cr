struct Nodes::ShowPage < Application::HTML
  @node : Docker::Node
  @tasks : Array(Docker::Task)
  @services : Hash(String, Docker::Service)

  def initialize(@node, @tasks, @services)
  end

  def template : Nil
    layout = Application::LayoutPage.new(title: "Node", nav: "nodes")

    layout.heading do
      a "Nodes", href: routes.nodes_path
      concat " / "
      code @node.id
    end

    render layout do
      render Components::TaskList.new(@tasks, @services)

      render Components::Card.new("Spec (JSON)") do
        pre @node.to_pretty_json
      end
    end
  end
end
