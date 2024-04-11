require "log"
Log.setup_from_env

require "./boot"
require "./routes"
require "earl/src/http_server"

server = Earl::HTTPServer.new([
  HTTP::LogHandler.new,
  HTTP::CompressHandler.new,
  Frost::Session::Handler.new(Frost::Session::DiskStore.new("tmp/sessions")),
  Frost::Routes.handler,
])
server.add_tcp_listener("::", 8000)

Earl.application.monitor(server)
Earl.application.start
