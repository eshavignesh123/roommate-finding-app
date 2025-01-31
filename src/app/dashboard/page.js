"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import MatchProfile from '../components/profiles/profile-content';
import { fetchAllUserData, updateMatches, fetchUserProfile } from '../apiService';

export default function Profile() {
  const [token, setToken] = useState(null);
  const [users, setUsers] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [isMounted, setIsMounted] = useState(false);
  const [userNumber, setUserNumber] = useState(null);
  const [userMatches, setUserMatches] = useState([]); 
  const [noMoreProfiles, setNoMoreProfiles] = useState(false);
  const router = useRouter();

  const handleAccept = async () => {
    if (!noMoreProfiles) {
      const userInfo = users[userNumber]; 
      if (userInfo) {
        await updateMatches(userInfo);

        // Add user to matches to prevent duplicates
        setUserMatches(prevMatches => [...prevMatches, userInfo]);

        if (userNumber + 1 < users.length) {
          setUserNumber(userNumber + 1);
        } else {
          setNoMoreProfiles(true);
        }
      }
    }
  };

  const handleDecline = async () => {
    if (!noMoreProfiles) {
      const userInfo = users[userNumber]; 
      if (userInfo) {
        if (userNumber + 1 < users.length) {
          setUserNumber(userNumber + 1);
        } else {
          setNoMoreProfiles(true);
        }
      }
    }
  };

  // Fetch token on component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
      } else {
        router.push('/login');
      }

      setIsMounted(true);
    }
  }, [router]);

  useEffect(() => {
    if (!token) return;
  
    async function getUserProfiles() {
      try {
        setLoading(true);
  
        const currentUser = await fetchUserProfile();
        const userMatchesFromDB = currentUser?.user?.match || [];
        setUserMatches(userMatchesFromDB);
  
        const allData = await fetchAllUserData();
        console.log("API Response:", allData);
  
        const validUsers = allData?.users?.filter(user => 
          
          user.pronouns && 
          user.location && 
          user.first && 
          user.second && 
          user.third && 
          user.fourth && 
          user.fifth &&
          user.email !== currentUser.user.email &&
          !userMatchesFromDB.some(match => match.email === user.email)
        ) ?? [];
  
        setUsers(validUsers);
        console.log(validUsers);
  
        if (validUsers.length > 0) {
          setUserNumber(0);
        } else {
          setNoMoreProfiles(true);
        }
  
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    }
  
    getUserProfiles(); // Initial fetch
  
    // Set up polling to refetch data every 10 seconds
    const interval = setInterval(getUserProfiles, 10000);
  
    return () => clearInterval(interval); // Cleanup interval on unmount
  
  }, [token]);
  
  const matchDisplay = !noMoreProfiles && users.length > 0 ? users[userNumber] : null;

  return (
    <div className="bg-gray-800 flex flex-col items-center py-7 mx-20 mt-20">
      <div className="bg-gray-900 shadow-md rounded-lg p-6 w-full relative max-w-6xl">
        

      {matchDisplay ? (
        <>
        <Link href={`/dashboard/view-full/?email=${matchDisplay.email}`}>
          <button className="absolute top-4 left-4 text-blue-600 p-2 ml-1 rounded-full">
            View Full Profile
          </button>
        </Link>

        <button onClick={handleAccept} className="absolute top-7 right-36 px-8 bg-green-600 p-2 rounded">
          Accept
        </button>

        <button onClick={handleDecline} className="absolute top-7 right-6 px-7 bg-red-600 p-2 rounded">
          Decline
        </button>

        {/* Match Profile Details */}
        <MatchProfile 
          name={matchDisplay.name} 
          pronouns={matchDisplay.pronouns} 
          location={matchDisplay.location} 
          first={matchDisplay.first} 
          second={matchDisplay.second} 
        />
        </>
      ) : (
        noMoreProfiles ? (
          <p className="text-white text-center mt-4">No more profiles available. Check back later.</p>
        ) : (
          <p className="text-white text-center mt-4">Loading profiles...</p>
        )
      )}

      </div>
    </div>
  );
}
