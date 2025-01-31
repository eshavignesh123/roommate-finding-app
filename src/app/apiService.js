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

  export async function fetchUserProfileEmail(email) {
    const token = localStorage.getItem("token"); // Fetch token from localStorage
    console.log(email);
  
    const response = await fetch(`/api/users/${email}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Include the token if necessary
      }
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

  export async function updateMatches(user) {
    const token = localStorage.getItem("token");
    console.log("user before fetch:", user);
  
    const response = await fetch("/api/users/profile", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ match: user }), // Pass the entire user object
    });
  
    const data = await response.json();
    console.log("Response data:", data);
    return data;
  }

  export async function fetchAllUserData() {
    const token = localStorage.getItem("token");
    const response = await fetch("/api/general", {
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