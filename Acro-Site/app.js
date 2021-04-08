const $ = (q)=> document.getElementById(q);
const $$ = (q)=> document.querySelector(q);

const headerBtn = $('headerBtn');
const nav = $('nav');
const modal = $('modal');
const insideModal = $('modal-display');
let modalDisplay = modal.querySelector('.modal-display');
const switchOption = $('switch-option');
const navLinks = document.querySelectorAll('nav li a');
let navState = true;

const highlightsButtons = [ $('photos-btn'),$('videos-btn'),$('training-btn'),$('cv-btn')]
const mainContainerDivs= [$$('.main-container .photos'), $$('.main-container .videos'),
$$('.main-container .training'), $$('.main-container .cv')]


// anchor tags handle function 
function handleNavLinks(e){
    let target = e.target.classList.value;
    removeModal();
    mainContainerDivs.forEach(div=> div.classList.add('display-none'));
    scrollIntoView($$('.highlights'))
    if(target === 'first'){ mainContainerDivs[0].classList.remove('display-none')}
    if(target === 'second'){mainContainerDivs[1].classList.remove('display-none')}
    if(target === 'third'){mainContainerDivs[2].classList.remove('display-none')}
    if(target === 'fourth'){mainContainerDivs[3].classList.remove('display-none')}
    if(target === 'fifth'){}

}

function scrollIntoView(element){
    let Y = element.getBoundingClientRect().y;
    window.scrollTo({
        top: Y,
        left: 0,
        behavior: 'smooth'
      });
}

const showMainContainerDiv = (e)=>{
    mainContainerDivs.forEach(el =>{
        if(el.classList.contains(e.target.id)){
            el.classList.remove('display-none')
        }else{el.classList.add('display-none')}
    })
}

function handleHighlightsBtn(e){
    let target = e.target.id;

    if(target === 'photos-btn' || target === 'videos-btn' || 
       target === 'training-btn' || target === 'cv-btn'){
        showMainContainerDiv(e);
    }else{return}
}

function showClickedPhoto(e){
    modal.classList.remove('display-none');
    insideModal.innerHTML = e.target.outerHTML;
}

function showClickedVideo(e){
    modal.classList.remove('display-none');
    insideModal.innerHTML = e.target.dataset.link;
    //making sure both vimeo and youtube videos are centered in the modal
    if(modalDisplay.firstElementChild.childNodes.length === 0){
         modalDisplay.style.display = "flex";
        }

}

function removeModal(){ 
    modal.classList.add('display-none');
    if(navState === false){
        nav.style.transform = "scaleY(0)";
        navState = true;
    }
    if(insideModal.innerHTML !== ''){ 
        modalDisplay.style.display = "block";
        insideModal.innerHTML = '';
    }
}

function handleSwitchOption(){
    let input = $('choose_measurement');
    let label = $('switch-label');
    let imperial = $('imperial');
    let metric = $('metric');
    if(!input.checked){
        metric.classList.add('display-none')
        imperial.classList.remove('display-none')
        label.innerText = 'cm/kg'
    }else{
        metric.classList.remove('display-none')
        imperial.classList.add('display-none')
        label.innerText = 'ft/lbs'

    }
}

const videoItemArray = document.querySelectorAll('.videos .item');
const trainingItemArray = document.querySelectorAll('.training .item');

const videosIframeLinks = [`<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/385643349" style="position:absolute;top:0;left:0;width:100%;height:100%;" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>`,
 `<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/197341276" style="position:absolute;top:0;left:0;width:100%;height:100%;" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>`,
 `<iframe width="560" height="315" src="https://www.youtube.com/embed/-NJBeae6VE0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
 `<iframe width="560" height="315" src="https://www.youtube.com/embed/uWmxYAeEPSo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
 `<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/222960821" style="position:absolute;top:0;left:0;width:100%;height:100%;" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>`,
 `<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/528876255" style="position:absolute;top:0;left:0;width:100%;height:100%;" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>`, 
 `<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/332001366" style="position:absolute;top:0;left:0;width:100%;height:100%;" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>`, 
 `<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/285786177" style="position:absolute;top:0;left:0;width:100%;height:100%;" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>`, 
 `<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/316254603" style="position:absolute;top:0;left:0;width:100%;height:100%;" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>`];

const trainingIframeLinks = [`
  <iframe width="560" height="315" src="https://www.youtube.com/embed/4h1MVcGm1bk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
 `<iframe width="560" height="315" src="https://www.youtube.com/embed/-D3VPiC_oZQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
 `<iframe width="560" height="315" src="https://www.youtube.com/embed/W1Y0aCQkaGI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
 `<iframe width="560" height="315" src="https://www.youtube.com/embed/4s9Vi0Jgj9U" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
 `<iframe width="560" height="315" src="https://www.youtube.com/embed/ZCeNd1M26Ak" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
 `<iframe width="560" height="315" src="https://www.youtube.com/embed/6WG80aQ56kY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
 `<iframe width="560" height="315" src="https://www.youtube.com/embed/RwVcAUrusNs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
 `<iframe width="560" height="315" src="https://www.youtube.com/embed/DTYo5o4RvvI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
 `<iframe width="560" height="315" src="https://www.youtube.com/embed/Azyty8R8DHI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`]

function setDataAttributes(divs, links){
    divs.forEach((el, idx)=>{
        el.setAttribute('data-link', links[idx]);
    })
}
function handleNavButton(){
    if(navState){
        modal.classList.remove('display-none');
        nav.style.transform = "scaleY(1)";
        navState = false;
    }else{
        nav.style.transform = "scaleY(0)";
        navState = true;
    }
}
       


function initialize(){
    headerBtn.addEventListener('click', handleNavButton);
    setDataAttributes(videoItemArray, videosIframeLinks);
    setDataAttributes(trainingItemArray, trainingIframeLinks);
    highlightsButtons.forEach( btn => btn.addEventListener('click', handleHighlightsBtn) );
    switchOption.addEventListener('click', handleSwitchOption);

    mainContainerDivs[0].addEventListener('click', showClickedPhoto);
    mainContainerDivs[1].addEventListener('click', showClickedVideo);
    mainContainerDivs[2].addEventListener('click', showClickedVideo);
    modal.addEventListener('click', removeModal);

    navLinks.forEach(link =>{ link.addEventListener('click', handleNavLinks)});
}
initialize();