"use client";

import Link from 'next/link';
import { fetchUserProfileEmail } from '@/app/apiService';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation'; // Use useParams instead

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const searchParams = useSearchParams();  
  const email = searchParams.get('email'); // Get email from search params

  console.log("Email from search params:", email); // Debugging
  useEffect(() => {
    if (!email) return; // Don't fetch until email is available

    const getUserProfile = async () => {
      try {
        const data = await fetchUserProfileEmail(email);
        setUser(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError("Failed to load user profile. Please try again later.");
      }
    };

    getUserProfile();
  }, [email]);

  // Handle the loading state or error
  if (!email) {
    return <h1>Loading...</h1>; // Waiting for the email to be available
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!user) {
    return <p>Loading profile...</p>;
  }

  return (
    <div className="h-screen bg-gray-800 flex flex-col items-center py-7 m-20">
      <div className="bg-gray-900 shadow-md rounded-lg p-6 w-full relative max-w-6xl">
        <Link href='/dashboard'>
          <button className="absolute top-4 left-4 bg-blue-600 p-2 ml-1 rounded-full">← Back</button>
        </Link>



        <div className="flex items-center mb-6 mt-12">
          <img className="w-60 h-80 rounded bg-gray-600 mr-5" src={user.image || "#"} alt="Profile" />
          <div className='flex-1'>
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-gray-600">{user.pronouns}</p>
            <p className="text-gray-600">{user.location}</p>
            <div className="mt-3 mb-4 bg-gray-800 rounded p-3">
              <h2 className="text-xl font-semibold">I'm looking for</h2>
              <p className="text-gray-400">{user.first}</p>
            </div>
            <div className="mb-4 bg-gray-800 rounded p-3">
              <h2 className="text-xl font-semibold">I'm allergic to</h2>
              <p className="text-gray-400">{user.second}</p>
            </div>
          </div>
        </div>

        <div className="mb-4 bg-gray-800 rounded p-3">
          <h2 className="text-xl font-semibold">I need my room to be</h2>
          <p className="text-gray-400">{user.third}</p>
        </div>

        <div className="mb-4 bg-gray-800 rounded p-3">
          <h2 className="text-xl font-semibold">I usually sleep from</h2>
          <p className="text-gray-400">{user.fourth}</p>
        </div>

        <div className="mb-4 bg-gray-800 rounded p-3">
          <h2 className="text-xl font-semibold">Something I absolutely cannot live without is</h2>
          <p className="text-gray-400">{user.fifth}</p>
        </div>
      </div>
    </div>
  );
}
