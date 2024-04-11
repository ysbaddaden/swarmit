struct ShowPage < Application::HTML
  @service : Docker::Service
  @tasks : Array(Docker::Task)

  def initialize(@service, @tasks)
  end

  def template : Nil
    layout = Application::LayoutPage.new(title: "Service", nav: "stacks")

    layout.heading do
      a "Services", href: routes.stacks_path
      concat " / "
      concat @service.spec.name
    end

    render layout do
      nav class: "toolbar" do
        ul class: "inline" do
          li do
            a "Logs", href: routes.service_logs_path(@service.spec.name),
              class: "button button-secondary"
          end
          li do
            a "Shell", href: routes.service_terminal_path(@service.spec.name),
              class: "button button-secondary"
          end
        end
      end

      render Components::TaskList.new(@tasks, {@service.id => @service})

      tpl = @service.spec.task_template

      div class: "boxes" do
        render Components::Card.new("Container") do
          table do
            tr do
              th "Image"
              td @service.spec.labels["com.docker.stack.image"],
                title: tpl.container_spec.image
            end

            tr do
              th "Command"
              td { code tpl.container_spec.args?.try(&.join(' ')) }
            end

            tr do
              th "Directory"
              td { code tpl.container_spec.dir? }
            end
          end
        end

        render Components::Card.new("Labels") do
          table do
            @service.spec.labels.each do |(label, value)|
              tr do
                td label
                td value
              end
            end
          end
        end

        if mounts = tpl.container_spec.mounts?
          render Components::Card.new("Mounts") do
            table do
              thead do
                th "Type"
                th "Target"
                th "Source"
              end
              tbody do
                mounts.each do |mount|
                  tr do
                    td mount.type
                    td mount.target
                    td mount.source
                  end
                end
              end
            end
          end
        end

        if secrets = tpl.container_spec.secrets?
          render Components::Card.new("Secrets") do
            table do
              thead do
                th "ID"
                th "Name"
              end
              tbody do
                secrets.each do |secret|
                  tr do
                    td secret.secret_id
                    td secret.secret_name
                  end
                end
              end
            end
          end
        end

        render Components::Card.new("Networks") do
          table do
            thead do
              th "Target"
              th "Aliases"
            end
            tbody do
              tpl.networks.each do |network|
                tr do
                  # TODO: fetch list of networks to display the network name
                  # TODO: link to networks/show page
                  td network.target
                  td network.aliases.join(", ")
                end
              end
            end
          end
        end

        if ports = @service.spec.endpoint_spec.ports?
          render Components::Card.new("Endpoints") do
            table do
              thead do
                th "Protocol"
                th "Target port"
                th "Published port"
                th "Mode"
              end
              tbody do
                ports.each do |port|
                  tr do
                    td port.protocol
                    td port.target_port
                    td port.published_port
                    td port.publish_mode
                  end
                end
              end
            end
          end
        end
      end

      div class: "boxes" do
        render Components::Card.new("Spec (JSON)") do
          pre do
            @service.spec.to_pretty_json
          end
        end

        render Components::Card.new("Previous Spec (JSON)") do
          pre do
            @service.previous_spec.to_pretty_json
          end
        end
      end
    end
  end
end
