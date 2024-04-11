require "minitest/autorun"
require "http/server"
require "frost/session/memory_store"
require "frost/integration/test"
require "../src/boot"
require "../src/routes"

class Frost::Integration::Test < Minitest::Test
  include ::Helpers::Routes

  def sign_in!
    post routes.session_path, params: {
      email: "jportalier@manas.tech",
      password: "secret",
    }
    assert_response :see_other
  end

  def sign_out!
    delete routes.session_path
  end
end
