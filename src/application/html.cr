require "../helpers/routes"

abstract struct Application::HTML < Frost::HTML
  include Helpers::Routes

  # Returns the absolute path to a static asset.
  #
  # TODO: if a manifest exists, use it to map `path/file.ext` to `/assets/path/file-digest.ext`
  # TODO: memoize the manifest (unless development?)
  def asset_path(path : String) : String
    Path.posix("/assets").join(path).to_s
  end

  enum BadgeType
    Error
    Warning
    Normal
    Pending
    Success

    def to_s(io : IO) : Nil
      {% begin %}
      case self
      {% for name in @type.constants %}
        when {{name}} then io << "badge-{{name.downcase}}"
      {% end %}
      end
      {% end %}
    end

    def to_s : Nil
      {% begin %}
      case self
      {% for name in @type.constants %}
        when {{name}} then "badge-{{name.downcase}}"
      {% end %}
      end
      {% end %}
    end
  end

  def badge(contents : String, type : BadgeType, **attrs) : Nil
    span(contents, **attrs, class: "badge #{type}")
  end

  def badge(type : BadgeType, **attrs, &) : Nil
    span(**attrs, class: "badge #{type}") { yield }
  end
end

require "../components/**"
