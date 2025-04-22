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

  try {
    const { data, error } = await supabase
      .from('blocked_users')
      .select('1')
      .eq('blocker_id', blocker_id)
      .eq('blocked_id', blocked_id)
      .single();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    if (data) {
      return res.status(200).json({ message: "User is blocked" });
    }

    return res.status(200).json({ message: "User is not blocked" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
