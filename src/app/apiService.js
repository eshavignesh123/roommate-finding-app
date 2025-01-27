// Separate file, e.g., apiService.js
export async function fetchUserProfile() {
    const token = localStorage.getItem("token"); // or where you store your token
  
    const response = await fetch("/api/users/profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, // Include the token
      },
    });
  
    if (!response.ok) {
      throw new Error("Failed to fetch user profile");
    }
  
    const data = await response.json();
    return data;
  }
  