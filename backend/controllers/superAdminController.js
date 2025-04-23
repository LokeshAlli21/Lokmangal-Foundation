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

  export const blockUserByAdmin = async (req, res) => {
    const { adminId, userId } = req.body;
  
    if (!adminId || !userId) {
      return res.status(400).json({ error: "Missing adminId or userId" });
    }
  
    // Optional: check if adminId belongs to an admin
    const { data: admin, error: adminError } = await supabase
      .from("users")
      .select("role")
      .eq("id", adminId)
      .single();
  
    if (adminError || admin.role !== "super_admin") {
      return res.status(403).json({ error: "Only admins can block users." });
    }
  
    // Block user (store in a separate table or a blocked flag)
    const { error: blockError } = await supabase
      .from("admin_blocked_users")
      .upsert([{ admin_id: adminId, user_id: userId }]);
  
    if (blockError) {
      return res.status(500).json({ error: "Failed to block user." });
    }
  
    return res.status(200).json({ message: "User blocked by admin successfully" });
  };