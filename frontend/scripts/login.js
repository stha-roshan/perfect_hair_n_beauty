const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent form from reloading the page

  // Get the values from the form
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    // Send a POST request to the backend
    const response = await fetch('http://localhost:8000/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();

    if (response.ok) {
      // Successfully logged in
      alert('Login successful');
      console.log(result); // Contains user info, accessToken, etc.

      // Store tokens in localStorage (optional)
      localStorage.setItem('accessToken', result.data.accessToken);
      localStorage.setItem('refreshToken', result.data.refreshToken);

      // Redirect to another page if needed
      window.location.href = '/perfecthairnbeauty/home';
    } else {
      // Show error message
      alert(result.message || 'Login failed');
    }
  } catch (error) {
    console.error('Error logging in:', error);
    alert('Something went wrong. Please try again later.');
  }
});
