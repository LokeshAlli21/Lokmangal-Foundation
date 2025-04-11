import { pool } from '../config/db.js';

// Utility to shuffle array
const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

export const getProfiles = async (req, res) => {
  try {
    const baseQuery = `
      SELECT 
        id,
        first_name,
        middle_name,
        last_name,
        gender,
        dob,
        created_at,
        marital_status,
        religion,
        caste,
        sub_caste,
        state,
        city,
        pincode,
        education,
        occupation,
        income,
        family_status,
        height_feet,
        height_inches,
        photo_url,
        family_type,
        preferred_age_range
      FROM profiles
      LIMIT 10
    `;

    const { rows } = await pool.query(baseQuery);

    // Optional: shuffle if you still want random order
    const shuffledProfiles = shuffleArray(rows);

    res.status(200).json(shuffledProfiles);
  } catch (error) {
    console.error('Error fetching profiles:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


export const getProfileById = async (req, res) => {
  const { id } = req.params;

  try {
    const query = `
      SELECT 
        id,
        first_name,
        middle_name,
        last_name,
        gender,
        dob,
        marital_status,
        religion,
        caste,
        sub_caste,
        state,
        city,
        pincode,
        education,
        occupation,
        income,
        father_name,
        mother_name,
        family_status,
        family_type,
        preferred_age_range,
        preferred_religion_caste,
        preferred_location,
        other_preferences,
        height_feet,
        height_inches,
        weight,
        photo_url
      FROM profiles
      WHERE id = $1
    `;

    const { rows } = await pool.query(query, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


// ✅ Get full profile by email
export const getFullProfileByEmail = async (req, res) => {
  try {
    const { email } = req.body;
    // console.log(email);
    

    if (!email) {
      return res.status(400).json({ error: "Email is required." });
    }

    const query = `
      SELECT 
        id,
        user_id,
        first_name,
        middle_name,
        last_name,
        gender,
        dob,
        marital_status,
        religion,
        caste,
        sub_caste,
        state,
        city,
        pincode,
        mobile,
        alt_mobile,
        email,
        email_verified,
        phone_verified,
        education,
        occupation,
        income,
        father_name,
        mother_name,
        family_status,
        family_type,
        preferred_age_range,
        preferred_religion_caste,
        preferred_location,
        other_preferences,
        height_feet,
        height_inches,
        weight,
        photo_url,
        created_at,
        updated_at
      FROM profiles
      WHERE email = $1
      LIMIT 1
    `;

    const { rows } = await pool.query(query, [email]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Profile not found." });
    }

    // console.log(rows);
    
    res.status(200).json(rows[0]);

  } catch (error) {
    console.error("Error fetching full profile by email:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

export const updateProfile = async (req, res) => {

  // console.log(req.params.id);
  // console.log(req.body);
  

  const profileId = req.params.id;
  const {
    first_name,
    middle_name,
    last_name,
    gender,
    dob,
    marital_status,
    religion,
    caste,
    sub_caste,
    state,
    city,
    pincode,
    mobile,
    alt_mobile,
    email,
    email_verified,
    phone_verified,
    education,
    occupation,
    income,
    father_name,
    mother_name,
    family_status,
    family_type,
    preferred_age_range,
    preferred_religion_caste,
    preferred_location,
    other_preferences,
    // add physical attributes as well
  } = req.body;

  try {
    const r1 = await pool.query(
      `UPDATE profiles SET
        first_name = $1,
        middle_name = $2,
        last_name = $3,
        gender = $4,
        dob = $5,
        marital_status = $6,
        religion = $7,
        caste = $8,
        sub_caste = $9,
        state = $10,
        city = $11,
        pincode = $12,
        mobile = $13,
        alt_mobile = $14
      WHERE user_id = $15
      RETURNING *`,
      [
        first_name,
        middle_name,
        last_name,
        gender,
        dob,
        marital_status,
        religion,
        caste,
        sub_caste,
        state,
        city,
        pincode,
        mobile,
        alt_mobile,
        profileId,
      ]
    );
    const r2 = await pool.query(
      `UPDATE profiles SET
        email = $1,
        email_verified = $2,
        phone_verified = $3,
        education = $4,
        occupation = $5,
        income = $6,
        father_name = $7,
        mother_name = $8,
        family_status = $9,
        family_type = $10,
        preferred_age_range = $11,
        preferred_religion_caste = $12,
        preferred_location = $13,
        other_preferences = $14
      WHERE user_id = $15
      RETURNING *`,
      [
        email,
        email_verified,
        phone_verified,
        education,
        occupation,
        income,
        father_name,
        mother_name,
        family_status,
        family_type,
        preferred_age_range,
        preferred_religion_caste,
        preferred_location,
        other_preferences,
        profileId,
      ]
    );

    // Merge results (optional: you can choose which to send)
    const result = {
      ...r1.rows[0],
      ...r2.rows[0],
    };

    if (!result) {
      return res.status(404).json({ message: "Profile not found." });
    }

    res.status(200).json({
      message: "Profile updated successfully.",
      profile: result,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};