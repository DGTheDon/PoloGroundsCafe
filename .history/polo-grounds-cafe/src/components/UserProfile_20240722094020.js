import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

const UserProfile = ({ user }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        try {
          const userRef = doc(db, 'users', user.uid);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            setProfile(userSnap.data());
          } else {
            setError("Profile not found. Please try logging out and in again.");
          }
        } catch (err) {
          console.error("Error fetching profile:", err);
          setError("An error occurred while fetching your profile. Please try again later.");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProfile();
  }, [user]);

  if (loading) {
    return <div>Loading profile...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!profile) {
    return <div>No profile found.</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>
      <p><strong>Name:</strong> {profile.name || 'Not set'}</p>
      <p><strong>Email:</strong> {profile.email}</p>
      <p><strong>Member since:</strong> {profile.createdAt ? new Date(profile.createdAt.seconds * 1000).toLocaleDateString() : 'Unknown'}</p>
      {/* Add more profile information as needed */}
    </div>
  );
};

export default UserProfile;