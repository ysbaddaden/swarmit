struct TerminalPage < Application::HTML
  @service : Docker::Service

  def initialize(@service)
  end

  def template : Nil
    layout = Application::LayoutPage.new(title: "Service", nav: "stacks")

    layout.heading do
      a "Services", href: routes.stacks_path
      concat " / "
      a @service.spec.name, href: routes.service_path(@service.spec.name)
      concat " / shell"
    end

    render layout do
      div id: "terminal", data: {
        controller: "terminal",
        "terminal-url-value": routes.service_terminal_path(@service.spec.name),
      }
    end
  end
end
