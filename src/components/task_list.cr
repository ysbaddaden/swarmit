struct Components::TaskList < Application::HTML
  @tasks : Array(Docker::Task)
  @services : Hash(String, Docker::Service)

  def initialize(@tasks, @services)
    @tasks.sort_by!(&.created_at)
  end

  def template : Nil
    render Card.new(title: "Tasks") do
      table do
        thead do
          tr do
            th "ID"
            th "Name"
            th "Container"
            th "Node"
            th "State"
            th "Error"
            th "Created"
          end
        end
        tbody do
          @tasks.reverse_each do |task|
            tr do
              td { code task.id[0..11], title: task.id }
              td name(task)
              td do
                if s = task.status.container_status?
                  code s.container_id[0..11], title: s.container_id
                end
              end
              td do
                a(href: routes.node_path(task.node_id) ) { code task.node_id }
              end
              td { status(task) }
              td { task.status.err? }
              td { task.created_at }
            end
          end
        end
      end
    end
  end

  def name(task)
    if slot = task.slot?
      {@services[task.service_id].spec.name, slot}.join('.')
    else
      @services[task.service_id].spec.name
    end
  end

  def status(task)
    text = task.status.state.to_s.downcase
    message = task.status.message

    case task.status.state
    when .running?
      badge text, :success, title: message
    when .shutdown?, .complete?
      badge text, :normal, title: message
    when .failed?, .rejected?, .orphaned?, .remove?
      badge text, :error, title: message
    when .orphaned?, .remove?
      badge text, :warning, title: message
    when .new?, .allocated?, .pending?, .assigned?, .accepted?, .preparing?, .ready?, .starting?
      badge text, :pending, title: message
    end
  end
end
