--------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------- Create users table ----------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------------------------

-- Create users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  phone VARCHAR(15),
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create function to auto-update 'updated_at'
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for auto-update
CREATE TRIGGER update_users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE PROCEDURE update_updated_at_column();

--------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------- Create profiles table -------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------------------------

-- Create profiles table
CREATE TABLE profiles (
  id SERIAL PRIMARY KEY,
  user_id INT UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  -- Personal Information
  first_name VARCHAR(100),
  middle_name VARCHAR(100),
  last_name VARCHAR(100),
  gender VARCHAR(10),
  dob DATE,
  marital_status VARCHAR(50),
  religion VARCHAR(50),
  caste VARCHAR(50),
  sub_caste VARCHAR(50),
  state VARCHAR(100),
  city VARCHAR(100),
  pincode VARCHAR(20),
  mobile VARCHAR(15),
  alt_mobile VARCHAR(15),
  email VARCHAR(100),

  -- Education & Work
  education VARCHAR(255),
  occupation VARCHAR(255),
  income VARCHAR(100),

  -- Family Details
  father_name VARCHAR(100),
  mother_name VARCHAR(100),
  family_status VARCHAR(50),
  family_type VARCHAR(50),

  -- Preferences
  preferred_age_range VARCHAR(50),
  preferred_religion_caste VARCHAR(100),
  preferred_location VARCHAR(100),
  other_preferences TEXT,

  -- Verification
  email_verified BOOLEAN DEFAULT FALSE,
  phone_verified BOOLEAN DEFAULT FALSE,

  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Trigger function to auto-update 'updated_at'
CREATE OR REPLACE FUNCTION update_profiles_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON profiles
FOR EACH ROW
EXECUTE FUNCTION update_profiles_updated_at_column();
