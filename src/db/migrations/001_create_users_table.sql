CREATE TABLE IF NOT EXISTS users (
  id             SERIAL PRIMARY KEY,
  first_name     VARCHAR(50) NOT NULL,
  last_name      VARCHAR(50) NOT NULL,
  email          VARCHAR(100) NOT NULL UNIQUE,
  phone_no       VARCHAR(15) NOT NULL,
  username       VARCHAR(30),
  password       CHAR(60) NOT NULL,
  is_verified    BOOLEAN DEFAULT false,
  otp            VARCHAR(6),
  otp_expires_at TIMESTAMP,
  created_at     TIMESTAMP DEFAULT NOW(),
  updated_at     TIMESTAMP
);