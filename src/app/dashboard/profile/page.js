"use client"

import React from 'react';
import Link from 'next/link';
import {useState, useEffect} from 'react'
import { fetchUserProfile } from '../../apiService'; 

export default function Profile() {

  const [userProfile, setUserProfile] = useState(null);
  

  useEffect(() => {
    async function getUserProfile() {
      try {
        const profileData = await fetchUserProfile();
        setUserProfile(profileData.user); // Accessing the user property
      } catch (err) {
        console.log(err);
      }
    }

    getUserProfile();
  }, []);

  if (!userProfile) {
    return <div className="mt-20">Loading...</div>;
  }


  return (
    <div className="min-h-screen bg-gray-800 flex flex-col items-center p-8 mt-20">
      <div className="bg-gray-900 shadow-md rounded-lg p-6 w-full max-w-6xl relative">
        <Link href='/dashboard'>
            <button className="absolute top-4 left-4 bg-blue-600 p-2 ml-1 rounded-full">← Back</button>
        </Link>
        <Link href='/dashboard/profile/edit-profile'>
            <button className="absolute top-4 right-4 text-blue-600 p-2 rounded-full">✎ Edit Profile</button>
        </Link>
        <div className="flex items-center mb-6 mt-12"> 
            <img className="w-60 h-80 rounded bg-gray-600 mr-5" src="#" alt="Profile"></img>
            <div className='flex-1'> 
                <h1 className="text-2xl font-bold">{userProfile.name}</h1> 
                <p className="text-gray-600">{userProfile.pronouns}</p> 
                <p className="text-gray-600">{userProfile.location}</p> 
                <div className="mt-3 mb-4 bg-gray-800 rounded p-3">
                    <h2 className="text-xl font-semibold">I'm looking for</h2>
                    <p className="text-gray-400">{userProfile.first}</p>
                </div>
                <div className="mb-4 bg-gray-800 rounded p-3">
                    <h2 className="text-xl font-semibold">I'm allergic to</h2>
                    <p className="text-gray-400">{userProfile.second}</p>
                </div>
            </div> 
        </div>
        <div className="mb-4 bg-gray-800 rounded p-3">
          <h2 className="text-xl font-semibold">I need my room to be</h2>
          <p className="text-gray-400">{userProfile.third}</p>
        </div>
        <div className="mb-4 bg-gray-800 rounded p-3">
          <h2 className="text-xl font-semibold">I usually sleep from</h2>
          <p className="text-gray-400">{userProfile.fourth}</p>
        </div>
        <div className="mb-4 bg-gray-800 rounded p-3">
          <h2 className="text-xl font-semibold">Something I absolutely cannot live without is</h2>
          <p className="text-gray-400">{userProfile.fifth}</p>
        </div>
      </div>
    </div>
  );
};