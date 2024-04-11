require "frost/config"
require "yaml"

class Swarmit::Config < Frost::Config
  attribute public_path : String
  attribute database_url : String

  attribute google_oauth_domain : String
  attribute google_oauth_client_id : String
  attribute google_oauth_client_secret : String
  attribute google_oauth_redirect_url : String
end
