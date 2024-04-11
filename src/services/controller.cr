class Services::Controller < Application::Controller
  before_action do
    authenticate_user!
  end

  def show
    service = ServiceRepository.find(params.route["name"])
    tasks = TaskRepository.list(service)
    render ShowPage.new(service, tasks)
  end

  def terminal
    service = ServiceRepository.find(params.route["name"])

    if request.upgrade?("websocket")
      web_socket do |ws|
        ws.on_ping { ws.pong }
        # ...
      end
    else
      render TerminalPage.new(service)
    end
  end

  def logs
    service = ServiceRepository.find(params.route["name"])
    filters = parse_logs_filters

    if request.accept?("text/event-stream")
      response.headers["content-type"] = "text/event-stream"

      ServiceRepository.logs(service.id, **filters) do |type, message|
        push_event({type, message})
      end
    else
      render LogsPage.new(service, **filters)
    end
  end

  private def parse_logs_filters
    {
      since: datetime_local(params.query["since"]?),
      timestamps: params.query["timestamps"]? == "1",
      follow: params.query["follow"]? == "1",
    }
  end

  private def datetime_local(time : String?)
    if t = time.presence
      {
        "%Y-%m-%dT%H:%M:%S",
        "%Y-%m-%dT%H:%M",
        "%Y-%m-%d",
      }.each do |format|
        return Time.parse(t, format, Time::Location::UTC)
      rescue
        next
      end
    end
  end

  private def push_event(data) : Nil
    response << "data: "
    data.to_json(response)
    response << "\n\n"

    # OPTIMIZE: don't flush on every event, but after some time without events (how?)
    response.flush
  end
end
