require "frost/public"

Frost.routes do
  get    "/home",                       &to(Home::Controller, index)

  get    "/session/new",                &to(Session::Controller, new)
  post   "/session",                    &to(Session::Controller, create)
  get    "/session/callback/:provider", &to(Session::Controller, callback)
  delete "/session",                    &to(Session::Controller, destroy)

  get    "/stacks",                     &to(Stacks::Controller, index)
  get    "/services/:name",             &to(Services::Controller, show)
  get    "/services/:name/logs",        &to(Services::Controller, logs)
  get    "/services/:name/terminal",    &to(Services::Controller, terminal)
  get    "/nodes",                      &to(Nodes::Controller, index)
  get    "/nodes/:id",                  &to(Nodes::Controller, show)
  get    "/users",                      &to(Users::Controller, index)

  public = Frost::Public.new(Swarmit.config.public_path)
  get("/*path") { |ctx, params| public.call(ctx, params["path"]) }

  root &redirect_to("/home")
end
