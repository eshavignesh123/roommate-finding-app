"use client";

import React, { useEffect, useState } from 'react';
import { fetchUserProfile, updateUserProfile } from '../../../apiService'; 
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import UploadForm from '../../../components/uploadForm';
import ImageDisplay from '../../../components/imageDisplay.js';

export default function UserProfile() {
  const router = useRouter();

  const [userProfile, setUserProfile] = useState(null);
  const [imageId, setImageId] = useState(null);
  const [pronouns, setPronouns] = useState(null);
  const [location, setLocation] = useState(null);
  const [first, setFirst] = useState(null);
  const [second, setSecond] = useState(null);
  const [third, setThird] = useState(null);
  const [fourth, setFourth] = useState(null);
  const [fifth, setFifth] = useState(null);

  useEffect(() => {
    async function getUserProfile() {
      try {
        const profileData = await fetchUserProfile();
        setUserProfile(profileData.user); // Accessing the user property
        setPronouns(profileData.user.pronouns);
        setLocation(profileData.user.location);
        setFirst(profileData.user.first);
        setSecond(profileData.user.second);
        setThird(profileData.user.third);
        setFourth(profileData.user.fourth);
        setFifth(profileData.user.fifth);
      } catch (err) {
        console.log(err);
      }
    }

    getUserProfile();
  }, []);

  const handleSave = async () => {
    try {
      await updateUserProfile(pronouns, location, first, second, third, fourth, fifth);
      router.push("/dashboard/profile")
    } catch (err) {
      console.log(err);
    }
  };

  const handleUploadSuccess = (id) => {
    setImageId(id);
  };

  if (!userProfile) {
    return <div className="mt-20">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-800 flex flex-col items-center p-8 mt-20 py-7">
      <div className="bg-gray-900 shadow-md rounded-lg p-6 w-full max-w-6xl relative">
        <Link href='/dashboard/profile'>
          <button className="absolute top-4 left-4 text-blue-600 p-2 ml-1 rounded-full">← Back</button>
        </Link>
        <button onClick={handleSave} type="button" className="absolute top-4 right-4 bg-blue-600 p-2 rounded-full">Save</button>
        <div className="flex items-center mb-6 mt-12">
          <div>
            <img className="ml-14 w-60 h-80 rounded bg-gray-600 mr-5" src="#" alt="Profile"></img>
            <div className="flex-1 flex-col space-y-2 mt-2">
              <UploadForm onSuccess={handleUploadSuccess} />
              {imageId && <ImageDisplay imageId={imageId} />}
            </div>
          </div>
          <div className='flex-1'>
            <h1 className="text-2xl font-bold mb-3">{userProfile.name}</h1>
            <div className="mb-3">
              <label htmlFor="pronouns" className="block mb-0 text-sm font-medium text-gray-900 dark:text-white">{userProfile.pronouns}</label>
              <input type="text" id="pronouns" onChange={(e) => setPronouns(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={userProfile.pronouns} />
            </div>
            <div className="mb-5">
              <label htmlFor="location" className="block mb-0 text-sm font-medium text-gray-900 dark:text-white">Location</label>
              <input type="text" id="location" onChange={(e) => setLocation(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={userProfile.location} />
            </div>
            <div className="mt-3 mb-3 bg-gray-800 rounded p-3">
              <h2 className="text-xl font-semibold mb-3">I'm looking for</h2>
              <input type="text" id="room-type" onChange={(e) => setFirst(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={userProfile.first} />
            </div>
            <div className="mb-4 bg-gray-800 rounded p-4">
              <h2 className="text-xl font-semibold mb-3">I'm allergic to</h2>
              <input type="text" id="allergens" onChange={(e) => setSecond(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={userProfile.second} />
            </div>
          </div>
        </div>
        <div className="mb-4 bg-gray-800 rounded p-3">
          <h2 className="text-xl font-semibold mb-3">I need my room to be</h2>
          <input type="text" id="cleanliness" onChange={(e) => setThird(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={userProfile.third} />
        </div>
        <div className="mb-4 bg-gray-800 rounded p-3">
          <h2 className="text-xl font-semibold mb-3">I usually sleep from</h2>
          <input type="text" id="sleep" onChange={(e) => setFourth(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={userProfile.fourth} />
        </div>
        <div className="mb-4 bg-gray-800 rounded p-3">
          <h2 className="text-xl font-semibold mb-3">Something I absolutely cannot live without is</h2>
          <input type="text" id="convo-starter" onChange={(e) => setFifth(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={userProfile.fifth} />
        </div>
      </div>
    </div>
  );
}
