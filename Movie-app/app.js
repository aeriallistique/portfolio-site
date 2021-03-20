
const APIKEY =  '04c35731a5ee918f014970082a0088b1';
const api_url = 'https://api.themoviedb.org/3/';
const imgURL = 'https://image.tmdb.org/t/p/w300';
const apiurl = 'https://api.themoviedb.org/3';
const imgURL500 = 'https://image.tmdb.org/t/p/w500';

const wrapper = document.getElementById('wrapper');
const form = document.getElementById('form')
const input = document.getElementById('input');
const page = document.getElementById('page');
const overlay = document.querySelector('.overlay');
const homeLink = document.querySelector('.home_link');
let pageNumber = 0;

input.addEventListener('focus', ()=> input.placeholder = '')


form.addEventListener('submit', (e)=>{
    e.preventDefault();
    let term = input.value;
    wrapper.innerHTML = '';
    getMovie(term);
    input.value = '';

});

homeLink.addEventListener('click', (e)=>{
    wrapper.innerHTML = '';
    getMovie();
});


page.addEventListener('click', (e)=>{
    if(e.target.id === 'next'){
        wrapper.innerHTML = '';
        pageNumber++; 
        getMovie(pageNumber);
        if(pageNumber > 0){document.getElementById('prev').classList.remove('hide');}
    }
    if(e.target.id === 'prev' && pageNumber > 0){
        wrapper.innerHTML = '';
        pageNumber--;
        getMovie(pageNumber);
        if(pageNumber === 0){
            document.getElementById('prev').classList.add('hide');
        }
    }
});

wrapper.addEventListener('click', (e)=>{
    const idEl = parseInt(e.target.parentElement.id, 10);
    
    //wrapper.innerHTML = '';
    getSingleMovie(idEl);
  
});

const getSingleMovie = async (id)=>{
    const resp =  await fetch(`${api_url}movie/${id}?api_key=${APIKEY}&append_to_response=videos,images`);
    const res = await resp.json();
    const results = res.results;
    const image = res.backdrop_path;
    const vote_average = res.vote_average;
    const voteCount = res.vote_count;
    const title = res.original_title;
    const duration = res.runtime;
    const description = res.overview;

    // convert duration to hours and minutes
    const convertDuration = (num)=>{
        let hour = Math.floor(num / 60);
        let minutes = num % 60;
        if(hour > 0){return `${hour}hr ${minutes}min`;}
        if(hour < 1){return `${minutes}minutes`}
        
    }
    const newDuration = convertDuration(duration);

    // fix the length of the description
    let aray=[];
    let count = 0;
    let newDescription = description.split(' ').map((el)=>{ 
        if(el.length + count <= 250){
            aray.push(el);
            count= count +el.length;
        }else{return}
    });

    let finaldescription = aray.join(' ');
    
    //solve lack of video links
    if(res.videos.results.length > 0){
        let link = res.videos.results[0].key;
        renderSingleMovie(image, vote_average, voteCount, title, newDuration, finaldescription, link)
    }
    if(res.videos.results.length === 0){
        renderSingleMovie(image, vote_average, voteCount, title, newDuration, finaldescription)
    }

};

const renderSingleMovie = (img, voteAvg, voteCount, title, duration, overview, link)=>{
    const markup = `
    <div class="modal" id="modal">
        <button class="close" id="close_btn"><i class="fa fa-times-circle"></i></button>
        <div class="movie_card" style="background-image: url(${imgURL500}${img})">
            <div class="forthebackground">
                <div class="movie_info">
                    <figure>
                        <img class="movie_image" src="${imgURL500}${img}">
                    </figure>
                    <div class="info">
                        <div class="rating">
                            <h6 class="rating_number">${voteAvg}</h6>
                            <div class="rating_stars">
                                <div class="stars">
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                </div>
                                <div class="votes">${voteCount}</div>
                            </div>
                        </div>
                        <div class="movie_title">${title}</div>
                        <div class="movie_duration">${duration}</div>
                    </div>
                </div>
                <div class="movie_description">${overview}...</div>
            </div>
            <button class="watch_now" id="watch_now"><a href="https://www.youtube.com/watch?v=${link}" id="link_id"> WATCH TRAILER </a> </button>
        </div>
    </div>
    `;

    // show modal
    document.body.insertAdjacentHTML('beforeend', markup);
    // show overlay and addeventlistener
    overlay.classList.remove('hide');
    overlay.addEventListener('click', closeModal);
    //add event listener to close button
    document.getElementById('close_btn').addEventListener('click', closeModal);

};

const closeModal = ()=>{
    document.getElementById('modal').parentElement.removeChild(document.getElementById('modal'));
    overlay.classList.add('hide');
};

const getMovie = async (term, page)=>{

    if(term){
        const resp =  await fetch(`${api_url}search/movie?api_key=${APIKEY}&query=${term}&page=${page}`);
        const res = await resp.json();
        //console.log(res);
        const results = res.results;
        renderMovies(results);
        
    }
    if(!term){
        const resp =  await fetch(`${api_url}discover/movie?sort_by=popularity.desc&api_key=${APIKEY}&page=${page}`);
        const res = await resp.json();
        //console.log(res);
        const results = res.results;
        renderMovies(results);
   }
   
}

getMovie();

const chooseColor = (vote)=>{
    if(vote >= 7){
        return 'green';
    }if(vote <= 6.9 && vote >= 6){
        return 'orange';
    }if(vote <= 5.9){
        return 'red';
    }
};

const renderMovies = (res)=>{

    res.forEach((movie)=>{
        const {poster_path, title, vote_average, overview, id} = movie;
        if(poster_path){
            let preTitle = title.split(' ');
        
            let newTitle =[];
            let count = 0;
    
            preTitle.forEach(el =>{
                if((el.length) + count <= 20){
                    newTitle.push(el);
                    count += el.length;
                }else{return}
            })
            let finalTitle = `${newTitle.join(' ')}`;
            finalTitle = finalTitle.length > 18 ? `${finalTitle}...` : finalTitle;
        
    
            const markup = `
            <div class="container" id="${id}">
                <img class="image" src="${imgURL}${poster_path}" alt="${title}">
                <div class="title">
                    <h5 class="title-h5">${finalTitle}</h5>
                    <span class="${chooseColor(vote_average)}">${vote_average}</span>
                </div>
                <div class="overview">
                    <h3 class="overview_title">${title}</h3>
                    <p class="overview_para">${overview}</p>
                </div>
            </div>`;
    
            wrapper.insertAdjacentHTML('afterbegin', markup);
        }else{return}
        
    });
}