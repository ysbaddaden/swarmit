-- +migrate up
CREATE TABLE users (
  id          UUID                  DEFAULT gen_random_uuid() PRIMARY KEY,
  email       VARCHAR(128) NOT NULL UNIQUE,
  name        VARCHAR(128) NOT NULL,
  created_at  TIMESTAMP    NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMP    NOT NULL DEFAULT NOW()
);

-- +migrate down
DROP TABLE users;
