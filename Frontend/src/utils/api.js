const API_BASE_URL = "http://13.233.28.44:8080/api";


// Login user
export async function login(credentials) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(errText || "Login failed");
  }

  return response.json(); // Returns logged-in user info
}

// Signup new user
export async function signup(userData) {
  const response = await fetch(`${API_BASE_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(errText || "Signup failed");
  }

  return response.json(); // Returns signed-up user info
}

// Fetch list of jobs
export async function fetchJobs() {
  const response = await fetch(`${API_BASE_URL}/Jobs`);
  if (!response.ok) throw new Error("Failed to fetch jobs");
  return response.json();
}

// Create a new job posting
export async function createJob(formData) {
  const response = await fetch(`${API_BASE_URL}/Jobs`, {
    method: "POST",
    body: formData,
  });
  if (!response.ok) throw new Error(await response.text() || "Failed to create job");
  return response.json();
}

