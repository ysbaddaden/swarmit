require "pg"
require "./config"

module Swarmit
  @@config = Config.setup_from_env
  @@database : DB::Database = DB.open(@@config.database_url)

  class_getter config : Config
  class_getter database : DB::Database
end
