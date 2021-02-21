
const main = document.querySelector('.main')
const main1 = document.querySelector('.main1')
const main2 = document.querySelector('.main2')
const main3 = document.querySelector('.main3')
const main4 = document.querySelector('.main4')

//chevron buttons
const main1DownBtn = main1.querySelector('.btn_down')
const main2BtnUp = main2.querySelector('.btn_up')
const main2BtnDown = main2.querySelector('.btn_down')
const main3BtnUp = main3.querySelector('.btn_up')
const main3BtnDown = main3.querySelector('.btn_down')
const main4BtnUp = main4.querySelector('.main4BtnUp')
const main4BtnDown = main4.querySelector('.main4BtnDown')

//hamburger buttons
const main1_ham_btn = main1.querySelector('#main1_ham_btn')
const main2_ham_btn = main2.querySelector('.main2_ham_btn')
const main3_ham_btn = main3.querySelector('.main3_ham_btn')
const main4_ham_btn = main4.querySelector('#main4_ham_btn')

//main4 div images
const main4img1 = main4.querySelector('#main4img1')
const main4img2 = main4.querySelector('#main4img2')
const main4img3 = main4.querySelector('#main4img3')
const main4img4 = main4.querySelector('#main4img4')


const main4ImgArray = main4.querySelectorAll('img')
const main1ImgArray = main1.querySelectorAll('img')


const canvas = document.getElementById('canvas');
const drawing_content = main3.querySelector('.drawing_content')
const side = document.querySelector('.side');
const wrapper  = document.querySelector('.wrapper')

const arrayOfDivs = [main1, main2, main3, main4]
const arrayofButtons = [main1DownBtn, main2BtnDown, main2BtnUp, main3BtnDown, main3BtnUp, main4BtnUp, main4BtnDown];
let colors = ['#0652DD', '#EE5A24', '#6F1E51', '#006266', '#2C3A47', '#82589F', '#20bf6b', '#eb3b5a'];
let color = colors[Math.floor(Math.random()* colors.length)] ;


// CHEVRON BUTTONS CLICK EVENTS
arrayofButtons.forEach(btn =>{
    btn.addEventListener('click', (e)=>{
        let ev = e.target.classList
        if(ev.contains('main2BtnDown')){
             main2.classList.add('slideup')
             delayAddindCursorClass()
            }
        if(ev.contains('main2BtnUp')){ main1.classList.remove('slideup') }
        if(ev.contains('main1DownBtn')){ main1.classList.add('slideup') }
        if(ev.contains('main3BtnDown')){ 
            main3.classList.add('slideup')
            resetCanvas()
        }
        if(ev.contains('main3BtnUp')){ 
            main2.classList.remove('slideup')
            resetCanvas()
         }
        if(ev.contains('main4BtnUp')){ main3.classList.remove('slideup') }
    })
})

// HAMBURGER MENU CLICK EVENTS
const animateHamburger = (div1, div2)=>{
    div1.querySelector('.buttons_area').classList.toggle('black_background_btm_border')

    div1.querySelector('.buttons_area').classList.toggle('hamburgerToTop')
    div2.querySelector('.fa').classList.toggle('ham_turn')

    div1.querySelector('.pop_up_from_hamburger').classList.toggle('pop_up_from_hamburger_utility')
    div1.querySelector('.pop_up_from_hamburger_ul').classList.toggle('display_none')
    div1.querySelector('.pop_up_from_hamburger_ul').querySelectorAll('*').forEach(item =>{ item.classList.toggle('display_none')})

}

main1_ham_btn.addEventListener('click', ()=>{
    animateHamburger(main1, main1_ham_btn)
})
main2_ham_btn.addEventListener('click', ()=>{
    animateHamburger(main2, main2_ham_btn)
})
main3_ham_btn.addEventListener('click', ()=>{
    animateHamburger(main3, main3_ham_btn)
})
main4_ham_btn.addEventListener('click', ()=>{
    animateHamburger(main4, main4_ham_btn)
})


// HAMBURGER MENU ANCHOR TAG EVENTS
//for div main1

main1.querySelectorAll('a').forEach(link =>{
    link.addEventListener('click', (e)=>{
        e.preventDefault()
        link.className === 'main1Link1' ? main1.classList.add('slideup') : '';
        if(link.className === 'main1Link2' ) {
            main1.classList.add('slideup');
            main2.classList.add('slideup')}
        if(link.className === 'main1Link3'){
            main1.classList.add('slideup');
            main2.classList.add('slideup')
            main3.classList.add('slideup')
        }
    })
})

//for div main2
main2.querySelectorAll('a').forEach(link =>{
    link.addEventListener('click', (e)=>{
        e.preventDefault()
        if(link.className === 'main2Link1'){return}
        if(link.className === 'main2Link2' ) {
            main2.classList.add('slideup')}
        if(link.className === 'main2Link3'){
            main2.classList.add('slideup')
            main3.classList.add('slideup')
        }
    })
})

// for div main3
main3.querySelectorAll('a').forEach(link =>{
    link.addEventListener('click', (e)=>{
        e.preventDefault()
        if(link.className === 'main3Link1'){ 
            main2.classList.remove('slideup')
            resetCanvas()
        }
        if(link.className === 'main3Link2' ) {return}
        if(link.className === 'main3Link3'){
            main3.classList.add('slideup')
        }
    })
})

main4.querySelectorAll('a').forEach(link =>{
    link.addEventListener('click', (e)=>{
        e.preventDefault()
        if(link.className === 'main4Link1'){ 
            main2.classList.remove('slideup')
            resetCanvas()
        }
        if(link.className === 'main4Link2' ) { main3.classList.remove('slideup') }
        if(link.className === 'main4Link3' ){return}
    })
})



// DIV IMAGE CAROUSEL WITH CURSOR MOVEMENT
const makeCarousel = (e, div, imgArray )=>{
    const contentDivWidth = div.querySelector('.content').clientWidth
    const contentFraction = contentDivWidth / imgArray.length;
    const mouseXPos = e.clientX;
    imgArray.forEach(item => item.classList.remove('slideImgRight'))

    if(mouseXPos > 0 && mouseXPos < contentFraction){
       imgArray[0].classList.add('slideImgRight')
    }
    else if(mouseXPos > contentFraction && mouseXPos < contentFraction * 2){
        imgArray[1].classList.add('slideImgRight')
    }
    else if(mouseXPos > contentFraction * 2 && mouseXPos < contentFraction * 3){
        imgArray[2].classList.add('slideImgRight')
    }
    else if(mouseXPos > contentFraction * 3 && mouseXPos < contentFraction * 4){
        imgArray[3].classList.add('slideImgRight')
    }else{ imgArray[0].classList.add('slideImgRight')}
}

main4.addEventListener('mousemove', (e)=>{ makeCarousel(e, main4, main4ImgArray)  });
main1.addEventListener('mousemove', (e)=>{ makeCarousel(e, main1, main1ImgArray) })

//scrolling event

const isBrowser = ()=>{
    let usrA = window.navigator.userAgent;
    let saf = usrA.indexOf('Safari')
    let chro = usrA.indexOf('Chrome')
    let ff = usrA.indexOf('Firefox')
    if(ff=== -1 && chro === -1 ) {return 'safari'}
    if(saf === -1 && chro === -1){return 'ff'}
    else{return 'chrome'}
}

var mousewheelevt = (/Firefox/i.test(navigator.userAgent)) ? "DOMMouseScroll" : "wheel";
let scrollTimer
let lastScrollFireTime = 0;

arrayOfDivs.forEach((div)=> { div.addEventListener(mousewheelevt, function(e){
        function processScroll(){
            var evt = window.event || e //equalize event object     
            evt = evt.originalEvent ? evt.originalEvent : evt; //convert to originalEvent if possible               
            var delta = evt.detail ? evt.detail*(-40) : evt.wheelDelta //check for detail first, because it is used by Opera and FF
            //scroll up
            if(delta > 0){
                if(div === main1){ return }
                if(div=== main2){  main1.classList.remove('slideup') }
                if(div===main3){  main2.classList.remove('slideup')
                                resetCanvas()}
                if(div===main4){  main3.classList.remove('slideup')  }
            }
            //scroll down
            if(delta < 0){
                if(div === main1){ main1.classList.add('slideup') }
                if(div=== main2){  main2.classList.add('slideup')
                delayAddindCursorClass() }
                if(div===main3){  
                    main3.classList.add('slideup')
                    resetCanvas()
                }
                if(div===main4){ return}
            }
        }

        if(isBrowser()=== 'safari' || isBrowser() === 'ff'){
            let minScrollTime = 100
            let now = new Date().getTime()
           
            if(!scrollTimer){
                processScroll()
                if(now-lastScrollFireTime > (40 * minScrollTime)){
                    processScroll()
                    lastScrollFireTime = now;
                    }
                scrollTimer = setTimeout(function(){
                        scrollTimer = 0
                    
                        lastScrollFireTime = new Date().getTime()
                    }, minScrollTime * 20)
                    
                }
        }else{processScroll()}
                 
    })
})


//  -----------------CALCULATOR SCRIPT !!!!!----------------------------
// ------------------C A L C U L A T O R ---C A L C U L A T O R----C A L C U L A T O R----


const numbers = document.querySelectorAll('[data-number]');
const operations = document.querySelectorAll('[data-operation]');
const prevOperand = document.querySelector('[data-previous-operand]')
const currentOperand = document.querySelector('[data-current-operand]')
const delBtn = document.querySelector('[data-delete]')
const clearBtn = document.querySelector('[data-all-clear]')
const equalBtn = document.querySelector('[data-equal]')
const periodBtn = document.querySelector('[data-decimal]')



// event listeners
numbers.forEach(numb =>{
    numb.addEventListener('click', updateDisplay);
})
delBtn.addEventListener('click', deleteNumb);

clearBtn.addEventListener('click', clearAll);

operations.forEach(operation =>{
    operation.addEventListener('click', selectOperation)
})

equalBtn.addEventListener('click', doTheMath);

periodBtn.addEventListener('click', addDecimal)


//functions for the event listeners
function updateDisplay(e){
    if(currentOperand.innerText.includes('=')) {currentOperand.innerText = ''}
    currentOperand.innerText =  currentOperand.innerText + e.target.innerText;
    
}

function formatNumber(number){
    const stringNumber = number.toString();
    console.log(stringNumber)
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let display;

    if(isNaN(integerDigits)){
        display = ''
    }else{
        display = integerDigits.toLocaleString('en', {maximumFractionDigits: 0})
        return display
        }

    if(decimalDigits!= null){
       return display = `${integerDigits}.${decimalDigits}`
    }else{
        return integerDigits}

}

function deleteNumb(){
    currentOperand.innerText = currentOperand.innerText.slice(0, -1);
}

function clearAll(){
    currentOperand.innerText = '';
    prevOperand.innerText = '';
}

function selectOperation(e){
    if(currentOperand.innerText.includes('=')){
        currentOperand.innerText = currentOperand.innerText.slice(1)}
    if(prevOperand.innerText.includes('+') || prevOperand.innerText.includes('-')|| 
            prevOperand.innerText.includes('*') || prevOperand.innerText.includes('/')){return}
    if(currentOperand.innerText == '') { return }
    prevOperand.innerText = currentOperand.innerText + e.target.innerText;
    currentOperand.innerText = '';
}


function doTheMath(){
    if(prevOperand.innerText == '')return 
    let signAtEnd = Array.from(prevOperand.innerText).pop();
    switch(signAtEnd){
        case signAtEnd = '+':
           currentOperand.innerText =  `= ${Number(prevOperand.innerText.slice(0, -1)) + Number(currentOperand.innerText)}`;
           prevOperand.innerText = '';
            break;
        case signAtEnd = '-':
           currentOperand.innerText =  `= ${Number(prevOperand.innerText.slice(0, -1)) - Number(currentOperand.innerText)}`;
           prevOperand.innerText = '';
            break;
        case signAtEnd = '/':
                currentOperand.innerText = `= ${Number(prevOperand.innerText.slice(0, -1)) / Number(currentOperand.innerText)}`;
                prevOperand.innerText = '';
                 break;
        case signAtEnd = '*':
                    currentOperand.innerText =  `= ${Number(prevOperand.innerText.slice(0, -1)) * Number(currentOperand.innerText)}`;
                    prevOperand.innerText = '';
                     break;
    }
}

function addDecimal(e){
    if(currentOperand.innerText.includes('=')) {currentOperand.innerText = '';  updateDisplay(e)
    }else(updateDisplay(e))
}


// ...........DRAWING SCRIPT ...... !!!!!!!!!!!!!!!!!!
// ----- D R A W I N G --- D R A W I N G--- D R A W I N G--- D R A W I N G--- 

function delayAddindCursorClass(){
   // setTimeout(()=>{
   //     side.classList.remove('cursorOff')
   //     side.classList.add('cursorOn')
   //     wrapper.classList.remove('cursorOff')
   //     wrapper.classList.add('cursorOn')
   // },7000)
}
 
function resetCanvas(){
    setTimeout(()=>{
        side.classList.remove('cursorOn')
        side.classList.add('cursorOff')
        wrapper.classList.remove('cursorOn')
        wrapper.classList.add('cursorOff')
        onScreenResize()
    }, 500)  }


function onScreenResize(){
    canvas.height = drawing_content.clientHeight;
    canvas.width = drawing_content.clientWidth;
    color = colors[Math.floor(Math.random()* colors.length)] ;

}

window.addEventListener('load', ()=>{ handleDrawing();  })

function handleDrawing (){
    drawing_content.classList.add('cursorOn')
    wrapper.classList.add('cursorOff')
    side.classList.add('cursorOff')
    const ctx = canvas.getContext('2d');
    
    delayAddindCursorClass()

    canvas.height = drawing_content.clientHeight;
    canvas.width = drawing_content.clientWidth;
    let painting = false

    
    window.addEventListener('resize', onScreenResize)

    function startPos (e){
        painting = true;
        draw(e)
    }
    function endPos (){
        painting = false;
       ctx.beginPath()
    }
    
    function draw (e){
       // if( !painting)return
        ctx.lineWidth = 300;
        ctx.lineCap = 'round';
        ctx.strokeStyle = color
        ctx.lineTo(e.clientX, e.clientY - 90); // - 90 because cursor isn't centered on the Y AXIS
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(e.clientX, e.clientY - 90);
        
    }

    canvas.addEventListener('mousedown', startPos);
    canvas.addEventListener('mouseup', endPos);
    canvas.addEventListener('mousemove', draw);

    canvas.addEventListener('touchstart', startPos);
    canvas.addEventListener('touchend', endPos);
    canvas.addEventListener('touchmove', draw);
}



document.body.addEventListener("touchstart", function (e) {
    if (e.target == canvas) {
      e.preventDefault();
    }
  });
  document.body.addEventListener("touchend", function (e) {
    if (e.target == canvas) {
      e.preventDefault();
    }
  });
  document.body.addEventListener("touchmove", function (e) {
    if (e.target == canvas) {
      e.preventDefault();
    }
  });
