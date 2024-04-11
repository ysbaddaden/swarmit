module UserRepository
  extend Application::Database

  def self.get(id : String|UUID)
    database.query_one(<<-SQL, id, as: User)
      SELECT * FROM users
      WHERE id = $1
    SQL
  end

  def self.list : Array(User)
    database.query_all(<<-SQL, as: User)
      SELECT * FROM users
      ORDER BY name
    SQL
  end

  def self.sign_in(email : String, name : String) : User
    database.query_one(<<-SQL, email, name, Time.utc, as: User)
      INSERT INTO users (email, name, created_at, updated_at) VALUES ($1, $2, $3, $3)
      ON CONFLICT (email) DO UPDATE SET name = $2, updated_at = $3
      RETURNING *
    SQL
  end
end
