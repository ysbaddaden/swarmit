module Application
  class NotFound < Exception
  end

  module Database
    @[AlwaysInline]
    def database : DB::Database
      Swarmit.database
    end

    def offset(page : Int, per_page : Int) : Int64
      (page.to_i64 - 1).clamp(0..) * per_page
    end

    def transaction(& : (DB::Connection, DB::Transaction) -> T) forall T
      database.using_connection do |conn|
        tx = conn.begin_transaction.as(DB::Transaction)
        res = nil

        begin
          res = yield conn, tx
        rescue ex
          tx.rollback unless tx.closed?
          raise ex
        end

        tx.commit unless tx.closed?
        res
      end
    end
  end
end
