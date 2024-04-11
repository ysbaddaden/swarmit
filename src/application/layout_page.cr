struct Application::LayoutPage < Application::HTML
  def initialize(@title : String?, @nav : String? = nil, @heading : String? = nil)
  end

  def heading(&@heading_block : -> String?) : Nil
  end

  def template(&block) : Nil
    doctype

    html do
      head do
        meta name: "turbo-cache-control", content: "no-cache"
        render_title
        link rel: "stylesheet", type: "text/css", href: asset_path("css/application.css") #, "data-turbo-track": "reload"
        script src: asset_path("js/application.js") #, "data-turbo-track": "reload"
      end

      body do
        div class: "page" do
          nav class: "page-sidebar" do
            a href: routes.root_path, class: "page-sidebar-logo" do
              img src: asset_path("images/logo-light.svg"),
                alt: "Swarmit - Docker Swarm User Interface"
            end

            ul class: "page-sidebar-entries" do
              sidebar_entry "Stacks", routes.stacks_path, nav: "stacks"
              sidebar_entry "Nodes", routes.nodes_path, nav: "nodes"
              sidebar_entry "Users", routes.users_path, nav: "users"
            end
          end

          div class: "page-main" do
            nav class: "page-menu" do
              if heading_block = @heading_block
                h2 class: "page-heading", &heading_block
              else
                h2 @heading, class: "page-heading"
              end

              if user = Current.user?
                div user.name

                form action: routes.session_path, method: "delete", class: "form-inline" do
                  input type: "submit", value: "Sign out"
                end
              end
            end

            section class: "page-content", &block
          end
        end
      end
    end
  end

  def render_title
    title do
      if @title
        concat @title
        concat " - "
      end
      concat "Swarmit"
    end
  end

  def sidebar_entry(name, href, *, nav)
    class_names = ["page-sidebar-entry"]
    class_names << "is-selected" if nav == @nav

    li do
      a name, href: href, class: class_names
    end
  end
end
