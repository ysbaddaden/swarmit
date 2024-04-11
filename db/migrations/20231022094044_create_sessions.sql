-- +migrate up
CREATE TABLE sessions (
  private_id CHAR(71)  PRIMARY KEY,
  expires_at TIMESTAMP NOT NULL,
  body       TEXT      NOT NULL
);

-- +migrate down
DROP TABLE sessions;
