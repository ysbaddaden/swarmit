module StackRepository
  def self.list : Hash(String, Array(Docker::Service))
    services = Docker.client.service_list(status: true)
    services.group_by(&.spec.labels["com.docker.stack.namespace"])
  end
end
