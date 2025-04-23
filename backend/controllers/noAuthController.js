// import { pool } from '../config/db.js';
import {supabase} from '../supabase/supabaseClient.js'

// Utility to shuffle array
const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };
  
  
  export const getNoAuthProfiles = async (req, res) => {
    try {
      const { age, caste, city, lookingFor, religion } = req.query;
    
      let query = supabase
        .from('profiles')
        .select(`
          id,
          first_name,
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
        `)
        .not('role', 'eq', 'super_admin') // 🚫 exclude super_admins;
        .limit(10); 
    
      // ✅ Age filter
      if (age) {
        const [minAge, maxAge] = age.split(" to ").map(Number);
    
        const today = new Date();
        const minDate = new Date(today.getFullYear() - maxAge, today.getMonth(), today.getDate());
        const maxDate = new Date(today.getFullYear() - minAge, today.getMonth(), today.getDate());
    
        query = query.gte('dob', minDate.toISOString()).lte('dob', maxDate.toISOString());
      }
    
      // ✅ Caste filter
      if (caste) {
        query = query.eq('caste', caste);
      }
    
      // ✅ City filter
      if (city) {
        query = query.eq('city', city);
      }
    
      // ✅ Religion filter
      if (religion) {
        query = query.eq('religion', religion);
      }
    
      // ✅ Gender (lookingFor)
      if (lookingFor) {
        query = query.eq('gender', lookingFor);
      }
    
      // Execute query
      const { data, error } = await query;
    
      if (error) {
        console.error('Supabase Query Error:', error);
        return res.status(500).json({ message: 'Error fetching profiles', error: error.message });
      }
    
      res.json(shuffleArray(data));
    } catch (error) {
      console.error('Server Error:', error);
      res.status(500).json({ message: 'Server Error', error: error.message });
    }    
  };
  
  
  
  
  
  
  