"use client";
import React, { useState, useEffect } from 'react';
import MatchComp from '@/app/components/profiles/matches-comp';
import { fetchUserProfile, fetchUserProfileEmail } from '@/app/apiService'; // Import both functions

export default function Matches() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    async function getProfile() {
      try {
        const userData = await fetchUserProfile();
        console.log("Fetched User Data:", userData);

        if (userData && userData.user && userData.user.match) {
          const currentUserEmail = userData.user.email;
          const potentialMatches = userData.user.match; // List of people this user matched with

          // Fetch each match's profile to check if they matched back
          const mutualMatches = await Promise.all(
            potentialMatches.map(async (match) => {
              try {
                const matchProfile = await fetchUserProfileEmail(match.email); // Fetch their profile
                if (matchProfile.match && matchProfile.match.some(match => match.email === currentUserEmail)) {
                  console.log(match)
                  return match;
                }
              } catch (error) {
                console.error(`Error fetching profile for ${match.email}:`, error);
              }
              return null;
            })
          );

          // Filter out null values (non-mutual matches)
          setMatches(mutualMatches.filter(Boolean));
          console.log("Filtered mutual matches:", mutualMatches.filter(Boolean));
        } else {
          console.log("No matches found in response.");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    }

    getProfile();
  }, []);

  return (
    <div className="h-screen bg-gray-800 flex flex-col items-center py-7 m-20">
      <ul className="w-full divide-y divide-gray-200 dark:divide-gray-700">
        {matches.length > 0 ? (
          matches.map((match, index) => (
            <li key={index} className="pt-3 pb-3">
              <MatchComp name={match.name} email = {match.email}/> {/* Display only mutual matches */}
            </li>
          ))
        ) : (
          <li className="pt-3 pb-3 text-white">No mutual matches found</li>
        )}
      </ul>
    </div>
  );
}
