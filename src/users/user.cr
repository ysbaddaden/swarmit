class User
  include DB::Serializable

  getter id : UUID
  getter email : String
  getter name : String
  getter picture_url : String?
  getter created_at : Time
  getter updated_at : Time

  def initialize(
    @id : UUID,
    @email : String,
    @name : String,
    @picture_url : String?,
    @created_at : Time,
    @updated_at : Time)
  end
end
