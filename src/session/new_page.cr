struct Session::NewPage < Application::HTML
  def template : Nil
    doctype

    html do
      head do
        title "Swarmit"
        link rel: "stylesheet", type: "text/css", href: asset_path("css/login.css")
      end

      body do
        div class: "login" do
          div class: "login-card" do
            h1 class: "login-card-title" do
              img src: asset_path("images/logo.svg"),
                alt: "Swarmit - Docker Swarm User Interface"
            end
            # p "Authenticate using #{Swarmit.config.google_oauth_domain}", class: "login-card-description"

            form action: routes.session_path, method: "post", data: { turbo: "false" } do
              input type: "submit", value: "Log in with Google"
            end
          end
        end
      end
    end
  end
end
