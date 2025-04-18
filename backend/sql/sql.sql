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
  created_at TIMESTAMP DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Kolkata'),
  updated_at TIMESTAMP DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Kolkata')
);

-- Create function to auto-update 'updated_at'
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = (CURRENT_TIMESTAMP AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Kolkata');
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

CREATE TABLE profiles (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  
  -- Personal Info
  first_name VARCHAR(100),
  middle_name VARCHAR(100),
  last_name VARCHAR(100),
  gender VARCHAR(10),
  dob DATE,
  marital_status VARCHAR(50),
  religion VARCHAR(50),
  caste VARCHAR(50),
  sub_caste VARCHAR(50),
  
  -- Location
  state VARCHAR(100),
  city VARCHAR(100),
  pincode VARCHAR(10),
  
  -- Contact Info
  mobile VARCHAR(15),
  alt_mobile VARCHAR(15),
  email VARCHAR(100),
  email_verified BOOLEAN DEFAULT FALSE,
  phone_verified BOOLEAN DEFAULT FALSE,
  
  -- Education & Job
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
  preferred_religion_caste VARCHAR(255),
  preferred_location VARCHAR(255),
  other_preferences TEXT,
  
  -- Physical Attributes
  height_feet INTEGER,
  height_inches INTEGER,
  weight INTEGER,

  -- Photo URL
  photo_url TEXT,
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Kolkata'),
  updated_at TIMESTAMP DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Kolkata')
);



-- ✅ 1. Function to auto-update 'updated_at' column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = now();
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;



-- ✅ 2. Trigger for users table to auto-update 'updated_at'
CREATE TRIGGER trigger_update_users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE PROCEDURE update_updated_at_column();

-- ✅ 3. Trigger for profiles table to auto-update 'updated_at'
CREATE TRIGGER trigger_update_profiles_updated_at
BEFORE UPDATE ON profiles
FOR EACH ROW
EXECUTE PROCEDURE update_updated_at_column();



-- ✅ 4. Function: When new user is created → insert default profile
CREATE OR REPLACE FUNCTION create_profile_after_user_insert()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (user_id, email, mobile)
  VALUES (NEW.id, NEW.email, NEW.phone);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;


-- ✅ 5. Trigger: After insert on users, create profile
CREATE TRIGGER trigger_create_profile_after_user_insert
AFTER INSERT ON users
FOR EACH ROW
EXECUTE PROCEDURE create_profile_after_user_insert();




-- ✅ 6. Function: When user updates email/phone in users table → update in profiles table

-- CREATE OR REPLACE FUNCTION sync_profile_after_user_update()
-- RETURNS TRIGGER AS $$
-- BEGIN
--   UPDATE profiles
--   SET email = NEW.email,
--       mobile = NEW.phone
--   WHERE user_id = NEW.id;
--   RETURN NEW;
-- END;
-- $$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION sync_profile_after_user_update()
RETURNS TRIGGER AS $$
BEGIN
  IF (NEW.email IS DISTINCT FROM OLD.email OR NEW.phone IS DISTINCT FROM OLD.phone) THEN
    UPDATE profiles
    SET email = NEW.email,
        mobile = NEW.phone
    WHERE user_id = NEW.id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;


-- ✅ 7. Trigger: After update on users, sync profile
CREATE TRIGGER trigger_sync_profile_after_user_update
AFTER UPDATE OF email, phone ON users
FOR EACH ROW
EXECUTE PROCEDURE sync_profile_after_user_update();


-- ✅ 8. Function: When profile updates email/phone → sync users table
CREATE OR REPLACE FUNCTION sync_user_after_profile_update()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE users
  SET email = NEW.email,
      phone = NEW.mobile
  WHERE id = NEW.user_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ✅ 9. Trigger: After update on profiles, sync users table
CREATE TRIGGER trigger_sync_user_after_profile_update
AFTER UPDATE OF email, mobile ON profiles
FOR EACH ROW
EXECUTE PROCEDURE sync_user_after_profile_update();


--------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------- conversations ✅ (for chat feature) -----------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------------------------

CREATE TABLE conversations (
  conversation_id SERIAL PRIMARY KEY,
  sender_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  receiver_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  last_message_at TIMESTAMP DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Kolkata'),
  unread_count INTEGER DEFAULT 0,
  updated_at TIMESTAMP DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Kolkata'),
  UNIQUE(sender_id, receiver_id) -- Ensures one entry per conversation between two users
);

-- ✅ 1. Supabase SQL: Increment unread count (RPC function)

create or replace function increment_unread_count(conv_id integer)
returns void as $$
begin
  update conversations
  set unread_count = unread_count + 1,
      updated_at = (CURRENT_TIMESTAMP AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Kolkata')
  where conversation_id = conv_id;
end;
$$ language plpgsql;



-- ✅ 2. Supabase SQL: Reset unread count and mark messages as read

create or replace function mark_conversation_as_read(conv_id integer, user_id integer)
returns void as $$
begin
  -- Mark all unread messages as read for this user
  update messages
  set is_read = true
  where conversation_id = conv_id
    and receiver_id = user_id
    and is_read = false;

  -- Reset unread_count to 0
  update conversations
  set unread_count = 0,
      updated_at = (CURRENT_TIMESTAMP AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Kolkata')
  where conversation_id = conv_id;
end;
$$ language plpgsql;


--------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------- messages ✅ (chat messages) -------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------------------------

CREATE TABLE messages (
  message_id SERIAL PRIMARY KEY,
  sender_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  receiver_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  message_content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Kolkata'),
  is_read BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'delivered', -- ✅ NEW COLUMN
  conversation_id INTEGER REFERENCES conversations(conversation_id) ON DELETE CASCADE
);

--------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------- maudit_logs (optional, for tracking changes and actions) --------------------------------------
--------------------------------------------------------------------------------------------------------------------------------------

-- CREATE TABLE audit_logs (
--   id SERIAL PRIMARY KEY,
--   user_id INTEGER REFERENCES users(id),
--   action VARCHAR(255),
--   details TEXT,
--   created_at TIMESTAMP DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Kolkata')
-- );

--------------------------------------------------------------------------------------------------------------------------------------
--------------------------------------  user_wishlist Table --------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------------------------

CREATE TABLE user_wishlist (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  liked_profile_id INTEGER REFERENCES profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Kolkata'),
  UNIQUE(user_id, liked_profile_id)
);
