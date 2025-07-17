import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../App";
import axios from "axios";

function Profile() {
  const { user } = useContext(AppContext);
  const [profile, setProfile] = useState(null);

  const url = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${url}/api/users/${user._id}/profile`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    if (user && user._id) {
      fetchProfile();
    }
  }, [user]);

  if (!user || !user._id) {
    return (
      <div className="text-center mt-10 text-xl text-red-500">
        Please login to view profile.
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center mt-10 text-xl text-gray-500">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow-lg mt-10 text-center">
      {/* Avatar Placeholder */}
      <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl font-bold text-white">
        {profile.name.charAt(0).toUpperCase()}
      </div>

      <h2 className="text-2xl font-bold mb-2">{profile.name}</h2>
      <p className="text-gray-600 mb-1">
        <strong>Email:</strong> {profile.email}
      </p>
      <p className="text-gray-600 mb-1">
        <strong>Role:</strong> {profile.role}
      </p>
      <p className="text-gray-600 mb-4">
        <strong>Joined:</strong>{" "}
        {new Date(profile.createdAt).toLocaleDateString()}
      </p>

      <div className="flex justify-center gap-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
          Update Profile
        </button>
        <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition">
          Update Password
        </button>
      </div>
    </div>
  );
}

export default Profile;
