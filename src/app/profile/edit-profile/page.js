import React from 'react';
import Link from 'next/link';

export default function Profile() {
  return (
    <div className="min-h-screen bg-gray-800 flex flex-col items-center p-8">
      <div className="bg-gray-900 shadow-md rounded-lg p-6 w-full max-w-6xl relative">
        <Link href='/profile'>
            <button className="absolute top-4 left-4 text-blue-600 p-2 ml-1 rounded-full">← Back</button>
        </Link>
        <Link href='/profile/edit-profile'>
            <button className="absolute top-4 right-4 bg-blue-600 p-2 rounded-full">Save</button>
        </Link>
        <div className="flex items-center mb-6 mt-12"> 
            <div>
                <img className="w-60 h-80 rounded bg-gray-600 mr-5" src="#" alt="Profile"></img>
                <div className="flex flex-col space-y-2 mt-2">
                    <button type="button"
                        className="w-60 py-2 text-base font-medium text-white focus:outline-none bg-blue-600 rounded-lg focus:z-10 focus:ring-4 ">
                        Change picture
                    </button>
                    <button type="button"
                        className="w-60 py-2 text-base font-medium text-gray-200 focus:outline-none bg-gray-600 rounded-lg ">
                        Delete picture
                    </button>
                </div>

            </div>
            <div className='flex-1'> 
                <h1 className="text-2xl font-bold">
                    <div className="grid gap-6 mb-1 md:grid-cols-2">
                        <div>
                            <label htmlFor="first_name" className="block mb-0 text-sm font-medium text-gray-900 dark:text-white">First name</label>
                            <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Jane" />
                        </div>
                        <div>
                            <label htmlFor="last_name" className="block mb-0 text-sm font-medium text-gray-900 dark:text-white">Last name</label>
                            <input type="text" id="last_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Doe" />
                        </div>
                    </div> 
                </h1> 
                <div>
                    <label htmlFor="pronouns" className="block mb-0 text-sm font-medium text-gray-900 dark:text-white">Pronouns</label>
                    <input type="text" id="pronouns" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="she/her" />
                </div>
                <div>
                    <label htmlFor="location" className="block mb-0 text-sm font-medium text-gray-900 dark:text-white">Location</label>
                    <input type="text" id="location" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="South Brunswick, NJ" />
                </div>                <div className="mt-3 mb-4 bg-gray-800 rounded p-3">
                    <h2 className="text-xl font-semibold">I'm looking for</h2>
                    <input type="text" id="room-type" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="a single roommate for a double!" />
                </div>
                <div className="mb-4 bg-gray-800 rounded p-3">
                    <h2 className="text-xl font-semibold">I'm allergic to</h2>
                    <input type="text" id="allergens" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="nothing" />
                </div>
            </div> 
        </div>
        <div className="mb-4 bg-gray-800 rounded p-3">
          <h2 className="text-xl font-semibold">I need my room to be</h2>
          <input type="text" id="cleanliness" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="pretty clean. I don't really like messes" />
        </div>
        <div className="mb-4 bg-gray-800 rounded p-3">
          <h2 className="text-xl font-semibold">I usually sleep from</h2>
          <input type="text" id="sleep" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="11 PM to 8 AM, so I'm kind of a morning person" />
        </div>
        <div className="mb-4 bg-gray-800 rounded p-3">
          <h2 className="text-xl font-semibold">Something I absolutely cannot live without is</h2>
          <input type="text" id="convo-starter" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="my 6 stuffed animals. I like my squishmallows the best." />
        </div>
      </div>
    </div>
  );
};