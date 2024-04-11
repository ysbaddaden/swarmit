module ServiceRepository
  def self.list : Array(Docker::Service)
    Docker.client.service_list || raise Application::NotFound.new
  end

  def self.dictionary : Hash(String, Docker::Service)
    list.to_h { |service| {service.id, service} }
  end

  def self.find(name_or_id : String) : Docker::Service?
    Docker.client.service_inspect?(name_or_id) || raise Application::NotFound.new
  end

  def self.logs(id : String, *,
      since : Time? = nil,
      timestamps : Bool = false,
      follow : Bool = false,
  ) : Nil
    Docker.client.service_logs?(
      id,
      stdout: true,
      stderr: true,
      since: since.try(&.to_unix),
      timestamps: timestamps,
      follow: follow,
    ) do |io|
      # TODO: extract the parsing details to the docker shard!
      # byte 1: stdin (0), stdout (1) or stderr (2)
      # byte 2-4: skip
      # byte 5-8: length
      # while io.pos < stream.size
      loop do
        type = io.read_byte
        break unless type

        3.times { io.read_byte }

        # OPTIMIZE: avoid the slice + copy when creating the string (create the string directly from the IO)
        usize = io.read_bytes(UInt32, IO::ByteFormat::BigEndian)
        slice = Bytes.new(usize.to_i32)
        io.read_fully(slice)
        message = String.new(slice)

        yield type.to_i32, message.rstrip
      end
    end
  end
end
