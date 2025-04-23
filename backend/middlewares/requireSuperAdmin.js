import { supabase } from '../supabase/supabaseClient.js';

export const requireSuperAdmin = async (req, res, next) => {
    const userId = req.user?.id;
  
    const { data: user, error } = await supabase
      .from("users")
      .select("role")
      .eq("id", userId)
      .single();
  
    if (error || !user) {
      return res.status(403).json({ error: "Access denied" });
    }
  
    if (user.role !== "super_admin") {
      return res.status(403).json({ error: "Super Admin access only" });
    }
  
    next();
  };
  