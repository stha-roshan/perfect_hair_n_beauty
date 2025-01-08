const cardsWrapper = document.getElementById('cards-wrapper')

document.addEventListener('DOMContentLoaded', () => {
    fetch('/users/getusers', {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
    })
    .then((response) => response.json())
    .then((data) => {
        let costumerList = data.data;

        costumerList.forEach((costumer) => {
            const card = document.createElement('div')
            card.className = "card";
            
            card.innerHTML = `
                <span id="name">${costumer.fullName}</span>
                <span id="email">${costumer.email}</span>
                <span id="phone">${costumer.phone}</span>
            `

            cardsWrapper.appendChild(card)
        })
    })
    .catch((error) => {
        console.log("Error occured while fetching all costmer list ", error);
    })
})