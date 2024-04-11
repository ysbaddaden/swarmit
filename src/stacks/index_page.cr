struct Stacks::IndexPage < Application::HTML
  def initialize(@stacks : Hash(String, Array(Docker::Service)))
  end

  def template : Nil
    layout = Application::LayoutPage.new(title: "Stacks", nav: "stacks")
    layout.heading { "Stacks" }

    render layout do
      @stacks.each do |stack_name, services|
        render Components::Card.new(stack_name) do
          table do
            thead do
              tr do
                th "Service"
                th "ID"
                th "Image"
                th "Mode"
                th "Status"
                th "Update"
                th "Updated"
              end
            end
            tbody do
              services.each do |service|
                tr do
                  td do
                    a service.spec.name, href: routes.service_path(service.spec.name)
                  end
                  td { code service.id[0..11], title: service.id }
                  td service.spec.labels.fetch("com.docker.stack.image") { image(service) },
                    title: service.spec.task_template.container_spec.image
                  td mode(service)
                  td status(service)
                  td service.update_status?.try(&.message) || '-'
                  td service.updated_at
                end
              end
            end
          end
        end
      end
    end
  end

  private def mode(service)
    case service.spec.mode
    when .replicated?
      "replicated"
    when .global?
      "global"
    when .replicated_job?
      "replicated job"
    when .global_job?
      "global job"
    else
      "unknown"
    end
  end

  private def status(service)
    running = service.service_status.running_tasks
    desired = service.service_status.desired_tasks

    if service.spec.mode.replicated_job? || service.spec.mode.global_job?
      "#{running}/#{desired} replicas (#{service.service_status.completed_tasks} completed)"
    else
      "#{running}/#{desired} replicas"
    end
  end

  private def image(service)
    image = service.spec.task_template.container_spec.image
    if index = image.index('@')
      image[0...index]
    else
      image
    end
  end
end
