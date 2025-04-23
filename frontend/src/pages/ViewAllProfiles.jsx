import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import databaseService from '../backend-services/database/database';

function ViewAllProfiles() {
  const userData = useSelector((state) => state.auth.userData);
  const userId = userData?.id;
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notAllowed, setNotAllowed] = useState(false);

  useEffect(() => {
    const fetchProfiles = async () => {
      if (!userId) return;

      try {
        const data = await databaseService.getProfilesForSuperAdmin(userId);
        setProfiles(data);
      } catch (error) {
        if (error.message.includes("Access denied")) {
          setNotAllowed(true);
        } else {
          console.error("❌ Error fetching profiles:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, [userId]);

  if (loading) return <p>Loading profiles...</p>;

  if (notAllowed) {
    return (
      <div className="p-4 text-red-600 font-semibold">
        🚫 You are not authorized to view this page.
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">👥 All User Profiles</h2>
      {profiles.length === 0 ? (
        <p>No profiles found.</p>
      ) : (
        <ul className="space-y-2">
          {profiles.map((profile) => (
            <li key={profile.id} className="border p-2 rounded shadow">
              <p><strong>Name:</strong> {profile.full_name}</p>
              <p><strong>Email:</strong> {profile.email}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ViewAllProfiles;
