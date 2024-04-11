struct Components::Card < Application::HTML
  @title : String?
  @description : String?

  def initialize(@title = nil, @description = nil)
  end

  def template(&) : Nil
    div class: "card" do
      h2 @title, class: "card-title" if @title
      p @description, class: "card-description" if @description
      yield
    end
  end
end

