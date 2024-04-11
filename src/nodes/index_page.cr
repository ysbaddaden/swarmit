struct Nodes::IndexPage < Application::HTML
  def initialize(@nodes : Array(Docker::Node))
  end

  def template : Nil
    layout = Application::LayoutPage.new(title: "Nodes", nav: "nodes")
    layout.heading { "Nodes" }

    render layout do
      render Components::Card.new("Nodes") do
        table do
          thead do
            tr do
              th "ID"
              th "Hostname"
              th "Role"
              th "Availability"
              th "Status"
              th "Engine"
              th "Platform"
            end
          end

          tbody do
            @nodes.each do |node|
              tr do
                td do
                  a(href: routes.node_path(node.id)) { code node.id }
                end
                td node.description.hostname
                td do
                  concat node.spec.role
                  concat " (leader)" if node.manager_status?.try(&.leader)
                end
                td node.spec.availability
                td node.status.state.to_s.downcase
                td node.description.engine.engine_version
                td do
                  concat node.description.platform.os
                  concat '/'
                  concat node.description.platform.architecture
                end
              end
            end
          end
        end
      end
    end
  end
end
