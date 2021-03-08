const elements = {
    dayInput: document.querySelector('#day'),
    monthInput: document.querySelector('#month'),
    getFactBtn: document.querySelector('.get_date_fact'),
    paragraphFact: document.querySelector('.paragraph_fact'),
    h5YearFact: document.querySelector('.h5_year'),
    getYearBtn: document.querySelector('.get_year_fact'),
    yearInput: document.querySelector('#year'),
    yearContainer: document.querySelector('.year_container'),
    spinningIcon: document.querySelector('.fa'),
    dateContainer: document.querySelector('.date_container'),
    mathButton: document.querySelector('.get_math_fact'),
    mathInput: document.querySelector('#math'),
    mathH5: document.querySelector('.h5_math'),
    triviaButton: document.querySelector('.get_trivia_fact'),
    triviaInput: document.querySelector('#trivia'),
    triviaH5: document.querySelector('.h5_trivia'),
    randomButton: document.querySelector('.get_random_fact'),
    randomH5: document.querySelector('.h5_random')
}

//     MATH FUNCTION
async function mathFact(num, el) {
    fetch(`https://numbersapi.p.rapidapi.com/${num}/math?&json=false`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "numbersapi.p.rapidapi.com",
            "x-rapidapi-key": "851ca715bfmshb5987ed11d2207dp1b6f4ajsnbba4e6b543bf"
        }
    })
    .then(response => {
        return response.json();
    }).then(data =>{
        el.innerHTML = data.text;
        //console.log(data.text)
    })
    .catch(err => {
        console.log(err);
    });
};


//    RANDOM FUNCTION

async function randomFact(el) {
    fetch("https://numbersapi.p.rapidapi.com/random/trivia?max=20&min=1&json=true", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "numbersapi.p.rapidapi.com",
            "x-rapidapi-key": "851ca715bfmshb5987ed11d2207dp1b6f4ajsnbba4e6b543bf"
        }
    })
    .then(response => {
        return response.json();
    }).then(data => {
        el.innerHTML = data.text;
    })
    .catch(err => {
        console.log(err);
    });
};

//      TRIVIA FUNCTION
async function triviaFact(num, el) {
    fetch(`https://numbersapi.p.rapidapi.com/${num}/trivia?&notfound=floor&json=true`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "numbersapi.p.rapidapi.com",
            "x-rapidapi-key": "851ca715bfmshb5987ed11d2207dp1b6f4ajsnbba4e6b543bf"
        }
    })
    .then(response => {
        return response.json();
    }).then(data =>{
        el.innerHTML = data.text;
    })
    .catch(err => {
        console.log(err);
    });
};

const state = {};
window.state = state;

class Date {
    constructor(month, day, year){
        this.month = month,
        this.day = day,
        this.year = year
    }
    async dateFact(el) {
       fetch(`https://numbersapi.p.rapidapi.com/${this.month}/${this.day}/date?&json=true`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "numbersapi.p.rapidapi.com",
                "x-rapidapi-key": "851ca715bfmshb5987ed11d2207dp1b6f4ajsnbba4e6b543bf"
            }
        }).then(response => {
            return response.json(); 
        }).then(data =>{
            //console.log(data)
          el.innerHTML = data.text;
          return data;
        })
        .catch(err => {
            console.log(err);
        })
    }
    async yearFact(el) {
        fetch(`https://numbersapi.p.rapidapi.com/${this.year}/year?&json=true`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "numbersapi.p.rapidapi.com",
                "x-rapidapi-key": "851ca715bfmshb5987ed11d2207dp1b6f4ajsnbba4e6b543bf"
            }
        })
        .then(response => {
           return response.json();
        }).then(data =>{
            //console.log(data)
            el.innerHTML = data.text
        })
        .catch(err => {
            console.log(err);
        });
    }

}

const renderLoader = (el)=> {
    const markup = `<i class="fa fa-refresh" aria-hidden="true"></i>`;
    el.insertAdjacentHTML('beforeend', markup);
}

const removeLoader = (el) =>{
    const last =  el.lastChild;
    el.removeChild(last)   
}

elements.getFactBtn.addEventListener('click', async (e) =>{
    e.preventDefault();
    let month = parseInt(elements.monthInput.value, 10);
    let day = parseInt(elements.dayInput.value, 10);
    if(!day || !month){
        alert(`Please choose a valid date.`)
    }else if( day && month){
        elements.paragraphFact.innerHTML = '';
        state.Date = new Date(month, day);
    if(state.Date){
        try{
            renderLoader(elements.dateContainer)
            const res = await state.Date.dateFact(elements.paragraphFact);
            removeLoader(elements.dateContainer);
        }catch(err){
            console.log(err)
       }
    }   
    }  
})

elements.getYearBtn.addEventListener('click', async (e)=>{
    e.preventDefault();
    let year = parseInt(elements.yearInput.value, 10);
    if(year){
        state.Date = new Date(month, day, year);
        try{
            renderLoader(elements.yearContainer);
            await state.Date.yearFact(elements.h5YearFact);
            removeLoader(elements.yearContainer);
        }catch(err){
            console.log( err)
        }
    }
})

elements.mathButton.addEventListener('click', async (e) =>{
    e.preventDefault();
    let num = parseInt(elements.mathInput.value, 10);
    if(num){
        try{
            await mathFact(num, elements.mathH5)
        }catch(err){
            console.log(err)
        }
    }
})

elements.triviaButton.addEventListener('click', async (e) =>{
    e.preventDefault();
    let num = parseInt(elements.triviaInput.value, 10);
    if(num){
        try{
            await triviaFact(num, elements.triviaH5)
        }catch(err){
            console.log(err)
        }
    }
})

elements.randomButton.addEventListener('click', async (e) =>{
    e.preventDefault();
    try{   
        await randomFact(elements.randomH5);

    }catch(err){
        console.log(err)
    }

})