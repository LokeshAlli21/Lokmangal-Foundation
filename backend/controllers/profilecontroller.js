// import { pool } from '../config/db.js';
import {supabase} from '../supabase/supabaseClient.js'

// Utility to shuffle array
const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

export const getProfiles = async (req, res) => {
  console.log('getProfiles is called new ................................', req.query.id);
  
  try {
    const id = req.query.id;

     // First, get the gender of the current profile
      const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('gender')
      .eq('id', id)
      .single(); // ✅ use .single() to get single row as object

    if (profileError) {
      console.error('Error fetching profile gender:', profileError);
      return res.status(500).json({ message: 'Server error while fetching profile gender' });
    }

    const gender = profileData.gender;

    // Now fetch profiles with different gender
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
      .not('gender', 'eq', gender)
      .not('role', 'eq', 'super_admin') // 🚫 exclude super_admins
      .limit(15);
  
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
    // console.log(data);
    
  
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

export const getProfilePhotoById = async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('photo_url')
      .eq('id', id)
      .single(); // ✅ single row expected

    if (error) {
      console.error('Error fetching profile photo:', error);
      return res.status(404).json({ message: 'Profile photo not found' });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching profile photo:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getChatReceiverNameAndPhotoById = async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from('profiles')
      .select(`photo_url,
              first_name,
              last_name`)
      .eq('id', id)
      .single(); // ✅ single row expected

    if (error) {
      console.error('Error fetching profile photo and name:', error);
      return res.status(404).json({ message: 'Profile photo and name not found' });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching profile photo and name:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const uploadProfileImage = async (req, res) => {
  // console.log('Upload route hit');
  const { id } = req.params;  
  const file = req.file;

  if (!file) {
    return res.status(400).json({ message: 'No image file provided.' });
  }

  try {
    const fileExt = file.originalname.split('.').pop();
    const fileName = `profile-photos/${id}-${Date.now()}.${fileExt}`;

    // 3️⃣ Upload new image to Supabase Storage
    const { data, error } = await supabase.storage
      .from('profile-images')
      .upload(fileName, file.buffer, {
        contentType: file.mimetype,
        upsert: true,
      });

    console.log('Supabase upload data:', data);
    if (error) {
      console.error('Supabase upload error:', error);
      return res.status(500).json({ message: 'Failed to upload image to Supabase.' });
    }

    // 4️⃣ Get public URL of the uploaded image
    const { data: publicUrlData } = supabase.storage
      .from('profile-images')
      .getPublicUrl(fileName);

    const publicUrl = publicUrlData.publicUrl;
    console.log("public url: ", publicUrl);
    

    // 5️⃣ Update user's profile with new image URL
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ photo_url: publicUrl })
      .eq('id', id);

    if (updateError) {
      console.error('Error updating profile:', updateError);
      return res.status(500).json({ message: 'Failed to update profile photo URL.' });
    }

    res.status(200).json({ message: 'Image uploaded and profile updated successfully!', publicUrl });
  } catch (error) {
    console.error('Unexpected error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

export const addUserWishlist = async (req, res) => {
  try {
    const { userId, likedProfileId } = req.body;
    
    

    if (!userId || !likedProfileId) {
      return res.status(400).json({ error: 'userId and likedProfileId are required' });
    }

    const { data, error } = await supabase
      .from('user_wishlist')
      .insert([{ user_id: userId, liked_profile_id: likedProfileId }]);

    if (error) {
      // Handle unique constraint error
      if (error.code === '23505') {
        return res.status(400).json({ error: 'Profile already in wishlist' });
      }
      return res.status(500).json({ error: error.message });
    }

    res.status(201).json({ message: 'Profile added to wishlist', data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getUserWishlist = async (req, res) => {
  const { userId } = req.params;
  // console.log(userId);
  

  try {
    const { data, error } = await supabase
      .from("user_wishlist")
      .select(`
        id,
        created_at,
        liked_profile_id,
        profiles (
          id,
          first_name,
          last_name,
          city,
          height_feet,
          photo_url,
          height_inches,
          created_at,
          dob,
          occupation
        )
      `)
      .eq("user_id", userId);

    if (error) {
      throw error;
    }

    // console.log(data);
    

    res.status(200).json({ wishlist: data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
