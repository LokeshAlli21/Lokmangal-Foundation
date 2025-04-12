// import { pool } from '../config/db.js';
import {supabase} from '../supabase/supabaseClient.js'

// Utility to shuffle array
const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

export const getProfiles = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select(`
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
      `)
      .limit(10);
  
    if (error) {
      console.error('Error fetching profiles:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  
    // Optional: Shuffle the results if you want random order
    const shuffledProfiles = shuffleArray(data);
  
    res.status(200).json(shuffledProfiles);
  } catch (error) {
    console.error('Error fetching profiles:', error);
    res.status(500).json({ message: 'Server error' });
  }  
};


export const getProfileById = async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from('profiles')
      .select(`
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
      `)
      .eq('id', id)
      .single(); // ✅ because you're expecting a single row
  
    if (error) {
      console.error('Error fetching profile:', error);
      return res.status(404).json({ message: 'Profile not found' });
    }
  
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Server error' });
  }  
};


// ✅ Get full profile by email
export const getFullProfileByEmail = async (req, res) => {
  try {
    const { email } = req.body;
  
    if (!email) {
      return res.status(400).json({ error: "Email is required." });
    }
  
    const { data, error } = await supabase
      .from('profiles')
      .select(`
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
      `)
      .eq('email', email)
      .limit(1)
      .single(); // ✅ Fetch exactly one record
  
    if (error) {
      console.error('Error fetching profile:', error);
      return res.status(404).json({ error: "Profile not found." });
    }
  
    res.status(200).json(data);
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error' });
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
    height_inches,
    height_feet,
    weight,
    photo_url,
    preferred_age_range,
    preferred_religion_caste,
    preferred_location,
    other_preferences,
    // add physical attributes as well
  } = req.body;

  try {
    // First update block
    const { data: updateBlock1, error: error1 } = await supabase
      .from('profiles')
      .update({
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
      })
      .eq('user_id', profileId)
      .select(); // ✅ to get the returning *
  
    if (error1) {
      console.error('Error in first update:', error1);
      return res.status(500).json({ message: 'Error updating profile - block 1' });
    }
  
    // Second update block
    const { data: updateBlock2, error: error2 } = await supabase
      .from('profiles')
      .update({
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
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', profileId)
      .select(); // ✅ to get the returning *
  
    if (error2) {
      console.error('Error in second update:', error2);
      return res.status(500).json({ message: 'Error updating profile - block 2' });
    }
  
    res.status(200).json({
      message: 'Profile updated successfully',
      updatedProfile: { ...updateBlock1?.[0], ...updateBlock2?.[0] }, // ✅ Merged response
    });
  
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
  
};