

const cardSection = document.getElementById('cards-section')

document.addEventListener("DOMContentLoaded", () => {
    fetch("/appointments/cancelled-appointments", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    })
    .then((response) => response.json())
    .then((returnedData) => {
        let appointmentList = returnedData.data
        appointmentList.forEach((appointment) => {
            const card = document.createElement("div")
            card.className = "card";
            card.id = `${appointment._id}`;
            card.innerHTML = `
                <span id="name">${appointment.user.fullName}</span>
                <span id="email">${appointment.user.email}</span>
                <span id="service">${appointment.service}</span>
                <span id="date">${appointment.date}</span>
                <span id="time">${appointment.time}</span>
                <span id="status">${appointment.status}</span>
            `;

            cardSection.appendChild(card);
        })
    })
    .catch((error) => {
        console.log("Error occured while fetching cancelled appointments: ", error);
    })
})