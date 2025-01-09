const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  // Get the values from the form
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    // Send a POST request to the backend
    const response = await fetch("http://localhost:8000/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const result = await response.json();

    if (response.ok) {
      // Successfully logged in
      alert("Login successful");
      console.log(result);
    } else {
      // Show error message
      alert(result.message || "Login failed");
    }
  } catch (error) {
    console.error("Error logging in:", error);
    alert("Something went wrong. Please try again later.");
  }
});
