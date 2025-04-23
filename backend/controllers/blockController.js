import {supabase} from '../supabase/supabaseClient.js'

// Block a user
export const blockUser = async (req, res) => {
  const { blocker_id, blocked_id } = req.body;

  if (blocker_id === blocked_id) {
    return res.status(400).json({ error: "You can't block yourself" });
  }

  try {
    const { data, error } = await supabase
      .from('blocked_users')
      .upsert([{ blocker_id, blocked_id }], { onConflict: ['blocker_id', 'blocked_id'] });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ message: "User blocked successfully", data });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Unblock a user
export const unblockUser = async (req, res) => {
  const { blocker_id, blocked_id } = req.body;

  try {
    const { data, error } = await supabase
      .from('blocked_users')
      .delete()
      .match({ blocker_id, blocked_id });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ message: "User unblocked successfully", data });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Check if a user is blocked
export const isBlocked = async (req, res) => {
  const { blocker_id, blocked_id } = req.query;

  console.log("➡️ [isBlocked] Checking block status");
  console.log("🧾 blocker_id:", blocker_id);
  console.log("🧾 blocked_id:", blocked_id);

  if (!blocker_id || !blocked_id) {
    console.warn("⚠️ Missing blocker_id or blocked_id in query");
    return res.status(400).json({ error: "Missing blocker_id or blocked_id in query" });
  }

  try {
    // Check if blocked_id has blocked blocker_id (you are blocked)
    const { data: blockedBy, error: blockedByError } = await supabase
      .from("blocked_users")
      .select("blocked_at")
      .eq("blocker_id", blocked_id)
      .eq("blocked_id", blocker_id)
      .single();

    if (blockedByError && blockedByError.code !== "PGRST116") {
      console.error("❌ Error checking if you are blocked:", blockedByError.message);
      return res.status(500).json({ error: blockedByError.message });
    }

    console.log("🔍 Is user blocked by other:", !!blockedBy);

    // Check if blocker_id has blocked blocked_id (you are blocker)
    const { data: isBlocker, error: isBlockerError } = await supabase
      .from("blocked_users")
      .select("blocked_at")
      .eq("blocker_id", blocker_id)
      .eq("blocked_id", blocked_id)
      .single();

    if (isBlockerError && isBlockerError.code !== "PGRST116") {
      console.error("❌ Error checking if user is blocker:", isBlockerError.message);
      return res.status(500).json({ error: isBlockerError.message });
    }

    console.log("🔍 Is user the blocker:", !!isBlocker);

    return res.status(200).json({
      is_blocked: !!blockedBy,
      is_blocker: !!isBlocker,
    });
  } catch (err) {
    console.error("❌ Unexpected error:", err.message);
    return res.status(500).json({ error: err.message });
  }
};
