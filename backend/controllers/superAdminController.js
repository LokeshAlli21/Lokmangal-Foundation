import {supabase} from '../supabase/supabaseClient.js'

export const getProfilesForSuperAdmin = async (req, res) => {
    const userId = req.user?.id;
  
    // Step 1: Check if the user is a Super Admin
    const { data: user, error: userError } = await supabase
      .from("users")
      .select("role")
      .eq("id", userId)
      .single();
  
    if (userError || !user || user.role !== "super_admin") {
      return res.status(403).json({ error: "Access denied. Super Admins only." });
    }
  
    // Step 2: Fetch all user profiles (excluding super admins if needed)
    const { data: profiles, error: profilesError } = await supabase
      .from("profiles")
      .select("*")
      .neq("role", "super_admin");
  
    if (profilesError) {
      return res.status(500).json({ error: profilesError.message });
    }
  
    return res.status(200).json({ message: "Profiles fetched successfully", data: profiles });
  };

  export const getUserRole = async (req, res) => {
    const userId = req.query.id;
  
    if (!userId) {
      return res.status(400).json({ error: 'Missing user ID' });
    }
  
    const { data: user, error } = await supabase
      .from('users')
      .select('role')
      .eq('id', userId)
      .single();
  
    if (error || !user) {
      return res.status(500).json({ error: 'Failed to verify role' });
    }
  
    // Return user role (super_admin, admin, user, etc.)
    return res.status(200).json({ role: user.role });
  };