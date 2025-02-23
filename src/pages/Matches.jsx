import React, { useState, useEffect } from 'react';

export default function Matches() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    try {
      const response = await fetch('http://localhost:8000/matches', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setMatches(data);
        console.log("Matches", matches)
      }
    } catch (error) {
      console.error('Failed to fetch matches:', error);
    }
  };

  const setupReadingDate = () => {
    alert("Feature yet to be implemented")
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Your Matches</h1>
        <div className="space-y-4">
          {matches.map(match => (
            <div key={match.username} className="bg-white rounded-lg shadow p-4 flex items-center">
              {/* <img
                src={match.photo}
                alt={match.username}
                className="w-16 h-16 rounded-full object-cover"
              /> */}
              <div class="profile-image">
              </div>
              <div className="ml-4 flex-1">
                <h2 className="text-lg font-semibold text-gray-900">{match.username}</h2>
                {/* <p className="text-sm text-gray-500">
                  {match.goodreads_score} Goodreads Score
                </p> */}
              </div>
              <button
                className="ml-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors button"
                onClick={() => alert("Feature yet to be implemented")}
              >
                Setup Reading Date
              </button>
            </div>
          ))}
          {matches.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-600">No matches yet. Keep swiping!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
