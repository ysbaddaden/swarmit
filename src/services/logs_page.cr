struct LogsPage < Application::HTML
  def initialize(
    @service : Docker::Service,
    @since : Time?,
    @timestamps : Bool,
    @follow : Bool,
  )
  end

  def template : Nil
    layout = Application::LayoutPage.new(title: "Logs", nav: "stacks")

    layout.heading do
      a "Services", href: routes.stacks_path
      concat " / "
      a @service.spec.name, href: routes.service_path(@service.spec.name)
      concat " / logs"
    end

    render layout do
      form class: "filters inline" do
        div class: "form-field" do
          label "Since", for: "logs_filters_since"
          whitespace
          input type: "text",
            name: "since",
            value: datetime_local(@since),
            id: "logs_filters_since",
            placeholder: "YYYY-MM-DDTHH:MM:SS",
            pattern: "[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}(T[0-2]{1,2}:[0-9]{1,2}:[0-9]{1,2}|T[0-9]{1,2}:[0-9]{1,2}|)"
        end

        div class: "form-field" do
          input type: "checkbox",
            name: "timestamps",
            value: "1",
            checked: @timestamps,
            id: "logs_filters_timestamps"
          whitespace
          label "Timestamps", for: "logs_filters_timestamps"
        end

        div class: "form-field" do
          input type: "checkbox",
            name: "follow",
            value: "1",
            checked: @follow,
            id: "logs_filters_follow"
          whitespace
          label "Follow", for: "logs_filters_follow"
        end

        div class: "form-field" do
          input type: "submit", value: "Go"
        end
      end

      div id: "terminal", data: {controller: "logs", "logs-url-value": websocket_path}
    end
  end

  def websocket_path
    routes.service_logs_path(
      @service.spec.name,
      since: datetime_local(@since),
      timestamps: @timestamps ? "1" : "0",
      follow: @follow ? "1" : "0",
    )
  end

  def datetime_local(time : Time?) : String?
    time.to_s("%Y-%m-%dT%H:%M:%S") if time
  end
end
