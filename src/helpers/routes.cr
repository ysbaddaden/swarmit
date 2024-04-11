require "uri"

module Helpers
  module Routes
    @@routes = Methods.new

    def routes : Methods
      @@routes
    end

    struct Methods
      # def initialize(@scheme : String, @host : String)
      # end

      def session_path : String
        "/session"
      end

      def new_session_path : String
        "/session/new"
      end

      def stacks_path : String
        "/stacks"
      end

      def service_path(name : String) : String
        "/services/#{URI.encode_path_segment(name)}"
      end

      def service_logs_path(name : String, **params) : String
        if params.empty?
          "/services/#{URI.encode_path_segment(name)}/logs"
        else
          "/services/#{URI.encode_path_segment(name)}/logs?#{URI::Params.encode(params)}"
        end
      end

      def service_terminal_path(name : String) : String
        "/services/#{URI.encode_path_segment(name)}/terminal"
      end

      def nodes_path : String
        "/nodes"
      end

      def node_path(id : String) : String
        "/nodes/#{URI.encode_path_segment(id)}"
      end

      def users_path : String
        "/users"
      end

      def root_path : String
        "/"
      end
    end
  end
end
