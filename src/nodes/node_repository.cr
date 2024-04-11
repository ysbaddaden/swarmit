module NodeRepository
  def self.find(id : String) : Docker::Node
    Docker.client.node_inspect?(id) || raise Application::NotFound.new
  end

  def self.list : Array(Docker::Node)
    Docker.client.node_list
  end
end
