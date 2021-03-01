setInterval(setClock, 1000);

let hoursEl= document.querySelector('.hours')
let minutesEl= document.querySelector('.minutes')
let secondsEl= document.querySelector('.seconds')
const number = document.querySelectorAll('.number');
const clockContainer = document.querySelector('.container');
let timezone = 0;

const tzContainer = document.querySelector('.timezone-container');
const btnsArray = tzContainer.querySelectorAll('button')

btnsArray.forEach(btn=>{
    btn.addEventListener('click', (e)=>{
        timezone = Number(e.target.dataset.time)
        clockContainer.style.backgroundColor = e.target.dataset.color;
    });
})

btnsArray.forEach(btn =>{
    console.log(btn.dataset.color)
    btn.style.background = btn.dataset.color;
})

function setClock(){
    let day = new Date();
    let seconds = (day.getSeconds())/ 60;
    let minutes = (seconds + day.getMinutes()) / 60;
    let hours = (minutes + day.getHours() + timezone) / 12;


    setRotation(secondsEl, seconds);
    setRotation(minutesEl, minutes);
    setRotation(hoursEl, hours);
}

function setRotation(element, rotationRatio){
    element.style.setProperty('--rotation', rotationRatio * 360)
}
    
setClock();