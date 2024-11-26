const images = ["home1.png", "home2.jpg", "home3.jpg"]

const homeSection = document.getElementById('home-section')
console.log(homeSection)

let currentIndex = 0

function changeBg(){
    homeSection.style.backgroundImage = `url(../assets/images/${images[currentIndex]})`
    currentIndex = (currentIndex + 1) % images.length
}

changeBg()

setInterval(changeBg, 5000)