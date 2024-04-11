module TaskRepository
  def self.list(service : Docker::Service) : Array(Docker::Task)
    Docker.client.task_list(filters: {service: [service.spec.name]}.to_json)
  end

  def self.list(node : Docker::Node) : Array(Docker::Task)
    Docker.client.task_list(filters: {node: [node.id]}.to_json)
  end
end
