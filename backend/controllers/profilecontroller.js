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