struct Users::IndexPage < Application::HTML
  def initialize(@users : Array(User))
  end

  def template : Nil
    layout = Application::LayoutPage.new(title: "Users", nav: "users")
    layout.heading { "Users" }

    render layout do
      render Components::Card.new("Users") do
        table class: "table" do
          thead do
            tr do
              th "Name"
              th "Email"
              th "Updated"
            end
          end

          tbody do
            @users.each do |user|
              tr do
                td user.name
                td user.email
                td user.updated_at
              end
            end
          end
        end
      end
    end
  end
end
