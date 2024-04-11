require "./google_oauth"

class Session::Controller < Application::Controller
  def new
    render NewPage.new
  end

  def create
    state = Random::Secure.hex(24)
    session["google.oauth_state"] = state
    redirect_to google_oauth.authentication_url(state)
  end

  def callback
    if google_oauth.validate(params, session.delete("google.oauth_state"))
      if profile = google_oauth.authorize(params.query["code"])
        sign_in(profile)
        redirect_to routes.root_path
        return
      end
    end

    if error = params.query["error"]?
      render plain: error, status: :bad_request
    else
      head :bad_request
    end
  end

  def destroy
    delete_session
    redirect_to routes.root_path
  end

  private def sign_in(profile) : Nil
    user = UserRepository.sign_in(
      email: profile.email,
      name: profile.name,
    )
    session["user.id"] = user.id.to_s
  end

  private def google_oauth
    @google_oauth ||= GoogleOAuth.new(
      Swarmit.config.google_oauth_client_id,
      Swarmit.config.google_oauth_client_secret,
      Swarmit.config.google_oauth_redirect_url,
      Swarmit.config.google_oauth_domain,
    )
  end
end
