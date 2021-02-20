const container = document.getElementById('main-lab-section');

const divArray = container.querySelectorAll('.box');

let time = 50;

let index = 0;

window.addEventListener('load', ()=>{

    divArray.forEach(div=>{
        
        setTimeout(()=>{
            delay(div);
        }, time);
        time+=70;
    })
        

})

function delay(div) {
    div.classList.remove('tilt-class-for-atag');
}