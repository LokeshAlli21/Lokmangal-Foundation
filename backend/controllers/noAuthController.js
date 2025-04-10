import { pool } from '../config/db.js';

// Utility to shuffle array
const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };
  
  
  export const getProfiles = async (req, res) => {
    try {
      const { age, caste, city, lookingFor, religion } = req.query;
  
      let baseQuery = `
        SELECT 
          id,
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
          family_status,
          height_feet,
          height_inches,
          photo_url,
          family_type,
          preferred_age_range
        FROM profiles
        WHERE 1=1
      `;
  
      const queryParams = [];
      let paramIndex = 1;
  
      // ✅ Age filter
      if (age) {
        const [minAge, maxAge] = age.split(" to ").map(Number);
        baseQuery += ` AND EXTRACT(YEAR FROM AGE(dob)) BETWEEN $${paramIndex++} AND $${paramIndex++}`;
        queryParams.push(minAge, maxAge);
      }
  
      // ✅ Caste filter
      if (caste) {
        baseQuery += ` AND caste = $${paramIndex++}`;
        queryParams.push(caste);
      }
  
      // ✅ City filter
      if (city) {
        baseQuery += ` AND city = $${paramIndex++}`;
        queryParams.push(city);
      }
  
      // ✅ Looking for (gender) filter
      if (lookingFor) {
        baseQuery += ` AND gender = $${paramIndex++}`;
        queryParams.push(lookingFor);
      }
  
      // ✅ Religion filter (ignore if "Any")
      if (religion && religion.toLowerCase() !== "any") {
        baseQuery += ` AND religion = $${paramIndex++}`;
        queryParams.push(religion);
      }
  
      // ✅ Execute the query
      const result = await pool.query(baseQuery, queryParams);
  
      let profiles = result.rows;
  
      // ✅ Shuffle and limit to 5
      profiles = shuffleArray(profiles).slice(0, 5);
  
      res.json(profiles);
    } catch (error) {
      console.error('Error fetching profiles:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  
  
  
  
  
  