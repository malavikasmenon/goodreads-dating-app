import React, { useState, useEffect } from 'react';
import { HeartIcon, XMarkIcon } from '@heroicons/react/24/outline';

export default function ProfileSwipe() {
  const [profiles, setProfiles] = useState([]);
  const [currentProfile, setCurrentProfile] = useState(null);

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    console.log(localStorage.getItem('access_token'))
    try {
      const response = await fetch('http://localhost:8000/profiles/recommend/', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setProfiles(data);
        setCurrentProfile(data[0]);
      }
    } catch (error) {
      console.error('Failed to fetch profiles:', error);
    }
  };

  const handleSwipe = async (liked) => {
    try {
      let action = liked ? "like" : "pass";
      await fetch('http://localhost:8000/profiles/interact/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify({
          "target_username": currentProfile.username,
          "action": action
        })
      });

      // Remove current profile and show next
      setProfiles(prev => prev.slice(1));
      setCurrentProfile(profiles[1]);
    } catch (error) {
      console.error('Failed to process swipe:', error);
    }
  };

  if (!currentProfile) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl text-gray-600">No more profiles to show!</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 swipescreen">
      <div className="max-w-sm mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="relative image">
          {/* <img
            src={currentProfile.photo}
            alt={currentProfile.username}
            className="w-full h-96 object-cover profile-image"
          /> */}
          <small>Profile Picture</small>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
          </div>
        </div>
        <h2 className="text-white text-2xl font-bold profile-name">
              {currentProfile.username}
            </h2>
{/*         
        <div className="p-4">
          <p className="text-gray-600 mb-4">{currentProfile.bio}</p>
          <div className="border-t pt-4">
            <h3 className="font-semibold mb-2">Favorite Books:</h3>
            <ul className="text-sm text-gray-600">
              {currentProfile.favoriteBooks?.map((book, index) => (
                <li key={index} className="mb-1">• {book}</li>
              ))}
            </ul>
          </div>
        </div> */}

        <div className="flex justify-center gap-8 p-4 border-t">
          <button
            onClick={() => handleSwipe(false)}
            className="p-4 rounded-full bg-red-100 hover:bg-red-200 transition-colors pass-button"
          >
            <XMarkIcon className="h-8 w-8 text-red-600" /> Pass
          </button>
          <button
            onClick={() => handleSwipe(true)}
            className="p-4 rounded-full bg-green-100 hover:bg-green-200 transition-colors like-button"
          >
            <HeartIcon className="h-8 w-8 text-green-600" /> Like
          </button>
        </div>
      </div>

    </div>
  );
}
