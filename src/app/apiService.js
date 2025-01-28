export async function fetchUserProfile() {
    const token = localStorage.getItem("token");
    const response = await fetch("/api/users/profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
  
    if (!response.ok) {
      throw new Error("Failed to fetch user profile");
    }
  
    const data = await response.json();
    return data;
  }
  

  export async function updateUserProfile(pronouns, location, first, second, third, fourth, fifth) {
    const token = localStorage.getItem("token");
    const profileData = {
      pronouns: pronouns,
      location: location,
      first: first,
      second: second,
      third: third,
      fourth: fourth,
      fifth: fifth
    };

    const response = await fetch("/api/users/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(profileData), // Send the form data in the body
    });

    const data = await response.json();
    return data; // Return the response data
  }