const bookAppointment = async (appointmentDetails) => {
    try {
      const token = document.cookie.split("accessToken=")[1]; // Get the token from cookies

      // Sending the appointment request
      const response = await fetch("/appointments/booknow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(appointmentDetails),
      });

      if (!response.ok) {
        const data = await response.json();
        document.getElementById("error-message").textContent =
          data.message || "Failed to book appointment.";
        throw new Error(data.message);
      }

      const data = await response.json();
      // Show success message to user
      document.getElementById("error-message").textContent = "" 
      alert(data.message);
    } catch (error) {
      console.error(error);
    }
  };

  // Event listener for form submission
  document
    .querySelector("#appointmentForm")
    .addEventListener("submit", (e) => {
      e.preventDefault(); // Prevent default form submission

      const formData = new FormData(e.target);

      const appointmentDetails = {
        date: formData.get("date"),
        time: formData.get("time"),
        service: formData.get("service"),
      };

      bookAppointment(appointmentDetails);
    });
