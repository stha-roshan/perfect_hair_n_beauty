/*const services = [
    {
        serviceName: "Facial",
        description: "this is service description",
        price: 999,
        imageUrl: "../assets/images/facial.jpg"
    },
    {
        serviceName: "Haircut",
        description: "this is service description",
        price: 999,
        imageUrl: "../assets/images/haircut.jpg"
    },
    {
        serviceName: "Pedicure",
        description: "this is service description",
        price: 999,
        imageUrl: "../assets/images/pedicure.jpg"
    },
    {
        serviceName: "Menicure",
        description: "this is service description",
        price: 999,
        imageUrl: "../assets/images/menicure.jpg"
    },
    {
        serviceName: "Massage",
        description: "this is service description",
        price: 999,
        imageUrl: "../assets/images/massage.jpeg"
    },
    {
        serviceName: "Makeup",
        description: "this is service description",
        price: 999,
        imageUrl: "../assets/images/makeup.jpg"
    },
    {
        serviceName: "Hair coloring",
        description: "this is service description",
        price: 999,
        imageUrl: "../assets/images/haircoloring.jpg"
    }

]

services.forEach((service) => {
    const card = document.createElement('div')
    card.className = 'card'
    card.innerHTML = `
        
        <div class="infoBox">
                <h2 class="serviceName">${service.serviceName}</h2>

                <div>
                    <p class="serviceDes">${service.description}</p>
                    <button>Book Now</button>
                </div>
        </div>
    `

    const imgBox = document.createElement('div');
    imgBox.className = 'imgBox'
    imgBox.style.background = url()
})

*/
const cardSection = document.getElementById('cards-section')
const services = [
    {
        serviceName: "Facial",
        description: "Rejuvenate your skin with a relaxing and refreshing facial treatment.",
        price: 999,
        imageUrl: "../assets/images/facial.jpg"
    },
    {
        serviceName: "Haircut",
        description: "Get the perfect look with a trendy and stylish haircut tailored just for you.",
        price: 999,
        imageUrl: "../assets/images/haircut.jpg"
    },
    {
        serviceName: "Pedicure",
        description: "Pamper your feet with a soothing pedicure for ultimate relaxation.",
        price: 999,
        imageUrl: "../assets/images/pedicure.jpg"
    },
    {
        serviceName: "Menicure",
        description: "Nourish and beautify your hands with a luxurious manicure session.",
        price: 999,
        imageUrl: "../assets/images/menicure.jpg"
    },
    {
        serviceName: "Massage",
        description: "Melt away stress with a calming and revitalizing massage experience.",
        price: 999,
        imageUrl: "../assets/images/massage.jpeg"
    },
    {
        serviceName: "Makeup",
        description: "Enhance your beauty with professional makeup for any occasion.",
        price: 999,
        imageUrl: "../assets/images/makeup.jpg"
    },
    {
        serviceName: "Hair coloring",
        description: "Transform your look with vibrant and long-lasting hair coloring.",
        price: 999,
        imageUrl: "../assets/images/haircoloring.jpg"
    }
];

services.forEach((service) => {

    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <div class="infoBox">
            <h2 class="serviceName">${service.serviceName}</h2>
            <div>
                <p class="serviceDes">${service.description}</p>
                <p>Price : ${service.price}</p>
                <button>Book Now</button>
            </div>
        </div>
    `;


    const imgBox = document.createElement('div');
    imgBox.className = 'imgBox';
    imgBox.style.backgroundImage = `url(${service.imageUrl})`;
    imgBox.style.backgroundSize = 'cover'; 
    imgBox.style.backgroundPosition = 'center'; 

    card.prepend(imgBox);

    cardSection.appendChild(card);
});
