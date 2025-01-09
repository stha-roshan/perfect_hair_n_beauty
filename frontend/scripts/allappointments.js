// import { error } from "console";

const cardSection = document.getElementById("cards-section");

document.addEventListener("DOMContentLoaded", () => {
  fetch("/appointments/all", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // console.log(data)   // this is what /appointments/all returns
      let appointmentList = data.data;
      //console.log(appointmentList); // logging just for test

      appointmentList.forEach((appointment) => {
        const card = document.createElement("div");
        card.className = "card";
        card.id = `${appointment._id}`;
        // console.log(appointment._id);
        card.innerHTML = `
            <span id="name">${appointment.user.fullName}</span>
            <span id="email">${appointment.user.email}</span>
            <span id="service">${appointment.service}</span>
            <span id="date">${appointment.date}</span>
            <span id="time">${appointment.time}</span>
            <span id="status">${appointment.status}</span>

            <div class="buttons">
                <button id="accept" class="confirm">Confirm</button>
                <button id="reject" class="cancle">Cancle</button>
            </div>
      `;

        card.addEventListener("click", (e) => {
          e.stopPropagation();
          const clickedElement = e.target;

          if (clickedElement.id === "accept") {
            fetch(`/appointments/confirm/${card.id}`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
              },
            })
              .then((response) => {
                if (response.ok) {
                  // console.log(`Appointment ${card.id} confirmed successfully!`);
                  location.reload();
                } else {
                  console.error("Failed to confirm the appointment");
                }
                return response.json();
              })
              .catch((error) => {
                console.error(
                  "Error occurred while confirming the appointment:",
                  error
                );
              });
          }

          if (clickedElement.id === "reject") {
            fetch(`/appointments/cancle/${card.id}`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
              },
            })
              .then((response) => {
                if (response.ok) {
                  // console.log(`Appointment ${card.id} cancled successfully`)
                  location.reload();
                } else {
                  console.error("Failed to cancle the appointment");
                }
                return response.json();
              })
              .catch((error) => {
                console.error(
                  "Error occured while cancling the appointment: ",
                  error
                );
              });
          }
        });

        cardSection.appendChild(card);
      });
    })
    .catch((error) => {
      console.log("Error occured while fetching appointments: ", error);
    });
});
