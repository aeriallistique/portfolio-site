window.addEventListener('load', ()=>{
    const header4 = document.querySelectorAll('.hidden')
    
    header4[0].classList.toggle('pop_up')
    header4[0].classList.toggle('hidden')
    setTimeout(()=>{
        header4[1].classList.toggle('pop_up')
        header4[1].classList.toggle('hidden')
    }, 700)

})