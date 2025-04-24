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

  export const unBlockUserByAdmin = async (req, res) => {
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
      return res.status(403).json({ error: "Only admins can unblock users." });
    }
  
    // Unblock user (remove from blocked users table)
    const { error: unblockError } = await supabase
      .from("admin_blocked_users")
      .delete()
      .eq("admin_id", adminId)
      .eq("user_id", userId);
  
    if (unblockError) {
      return res.status(500).json({ error: "Failed to unblock user." });
    }
  
    return res.status(200).json({ message: "User unblocked by admin successfully" });
  };  

  export const getBlockedUsersList = async (req, res) => {
    try {
      const { data, error } = await supabase
        .from('admin_blocked_users')
        .select('*');
  
      if (error) {
        console.error('Error fetching blocked users:', error.message);
        return res.status(500).json({ success: false, message: 'Failed to fetch blocked users', error: error.message });
      }
  
      res.status(200).json({ success: true, blockedUsers: data });
    } catch (err) {
      console.error('Unexpected error:', err);
      res.status(500).json({ success: false, message: 'Unexpected server error' });
    }
  };

  export const checkIsUserIdBlockedByAdmin = async (req, res) => {

    console.log('user hit checkIsUserIdBlockedByAdmin /////////////////////////////////////////////////');
    
    const { userId } = req.query;  // Get userId from query parameters
    console.log(userId);
  
    if (!userId) {
      return res.status(400).json({ error: "Missing userId" });
    }
  
    try {
      // Check if the user is blocked by any admin
        const { data: blockedUser, error } = await supabase
        .from("admin_blocked_users")
        .select("*")
        .eq("user_id", userId)
        .limit(1); // Ensure that you only get one row (limit is optional but can help avoid issues)

      if (error) {
        console.log("error: ", error);
        return res.status(500).json({ error: "Failed to check blocked user." });
      }

      // Check if any user is found
      if (blockedUser.length > 0) {
        return res.status(200).json({ isBlocked: true, message: "User is blocked by an admin." });
      } else {
        return res.status(200).json({ isBlocked: false, message: "User is not blocked." });
      }
    } catch (err) {
      return res.status(500).json({ error: "Internal server error." });
    }
  };
  