import React from 'react';
import Link from 'next/link';

export default function Profile() {
  return (
    <div className="h-screen bg-gray-800 flex flex-col items-center py-7 m-20">
        <div className="bg-gray-900 shadow-md rounded-lg p-6 w-full relative max-w-6xl">
        <Link href='/dashboard'>
            <button className="absolute top-4 left-4 bg-blue-600 p-2 ml-1 rounded-full">← Back</button>
        </Link>
        <Link href='/dashboard/view-full'>
            <button className="absolute top-5 right-40 px-10 bg-green-600 p-2 rounded">Accept</button>
        </Link>
        <Link href='/dashboard/view-full'>
            <button className="absolute top-5 right-4 px-10 bg-red-600 p-2 rounded">Decline</button>
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
        <div className="mb-4 bg-gray-800 rounded p-3">
          <h2 className="text-xl font-semibold">I need my room to be</h2>
          <p className="text-gray-400">pretty clean. I don’t really like messes</p>
        </div>
        <div className="mb-4 bg-gray-800 rounded p-3">
          <h2 className="text-xl font-semibold">I usually sleep from</h2>
          <p className="text-gray-400">11 PM to 8 AM, so I’m kind of a morning person</p>
        </div>
        <div className="mb-4 bg-gray-800 rounded p-3">
          <h2 className="text-xl font-semibold">Something I absolutely cannot live without is</h2>
          <p className="text-gray-400">my 6 stuffed animals. I like my squishmallows the best.</p>
        </div>
      </div>
    </div>
  );
};