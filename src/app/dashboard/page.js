"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Profile() {
  const [token, setToken] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined"){
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
      } else {
        router.push('/login');
      }
    }
  }, [router]);

  if (!token) {
    return null; // or a loading indicator
  }

  return (
    <div className="bg-gray-800 flex flex-col items-center py-7 mx-20 mt-20">
      <div className="bg-gray-900 shadow-md rounded-lg p-6 w-full relative max-w-6xl">
        <Link href='/dashboard/view-full'>
          <button className="absolute top-4 left-4 text-blue-600 p-2 ml-1 rounded-full">View Full Profile</button>
        </Link>
        <Link href='/dashboard'>
          <button className="absolute top-7 right-36 px-8 bg-green-600 p-2 rounded">Accept</button>
        </Link>
        <Link href='/dashboard'>
          <button className="absolute top-7 right-6 px-7 bg-red-600 p-2 rounded">Decline</button>
        </Link>
        <div className="flex items-center mb-6 mt-12">
          <img className="w-60 h-80 rounded bg-gray-600 mr-5" src="#" alt="Profile"></img>
          <div className='flex-1'>
            <h1 className="text-2xl font-bold">Jane Doe</h1>
            <p className="text-gray-600">she/her</p>
            <p className="text-gray-600">South Brunswick, NJ</p>
            <div className="mt-3 mb-4 bg-gray-800 rounded p-3">
              <h2 className="text-xl font-semibold">I'm looking for</h2>
              <p className="text-gray-400">a single roommate for a double!</p>
            </div>
            <div className="mb-4 bg-gray-800 rounded p-3">
              <h2 className="text-xl font-semibold">I'm allergic to</h2>
              <p className="text-gray-400">nothing</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
