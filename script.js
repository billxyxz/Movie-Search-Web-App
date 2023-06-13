const form = document.querySelector("form");
const search = document.querySelector("input")
const main = document.querySelector("main");

//API requirements
const API_URL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=0f3c305fa61ab212ee37d37b39a4bb9e&page=1";
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=0f3c305fa61ab212ee37d37b39a4bb9e&page=1&query="'

getMovies(API_URL)//calling the function the get the API data and display


//fectching request from the API using async await function
async function getMovies(url){
    const res = await fetch(url)
    const data = await res.json()
     
    showMovies(data.results)
    const movieCards = document.querySelectorAll(".card");
    movieCards.forEach((movieCard) => {
        movieCard.addEventListener("mouseover", () => {
            movieCard.lastChild.classList.add("-translate-y-full")
        });
        movieCard.addEventListener("mouseleave", () => {
            movieCard.lastChild.classList.remove("-translate-y-full")
        })
    })
}

//function to display all the results from the API in the HTML 'main' element
function showMovies(movies){
    main.innerHTML = "";
    movies.forEach((movie) => {
        const {title, vote_average, overview, backdrop_path} = movie;
        
        const movieEl = document.createElement("div");
        movieEl.classList = "w-[300px] bg-secondary relative card overflow-hidden cursor-pointer";
        movieEl.innerHTML = `<img src="${IMG_PATH + backdrop_path}" alt="${title}" class="h-[180px] w-full object-center"><!--Movie image-->
        <div class="p-4 flex justify-between">
          <h2 class="font-bold text-lg">${title}</h2>
          <div class="bg-primary p-2 w-auto text-center font-bold text-[16px] ${checkRating(vote_average)} h-full">${vote_average}</div><!--Rating-->
        </div>
        <div class="overview bg-white px-4 py-4 absolute top-full h-full transition-all duration-300"><!--Overview-->
           <h3 class="font-bold text-lg mb-2">Overview</h3>
           <p class="text-[14px] overflow-y-scroll h-full">${overview}</p>
        </div>`
        main.appendChild(movieEl)
    })
}


function checkRating(vote){
    if(vote >= 8){
        return "text-green-400";
    }else if(vote >= 5){
        return "text-yellow-500"
    }else{
        return "text-red-500";
    }
};


//Function to call the asunc function with the search query term from the form input
form.addEventListener("submit", (e) => {
    e.preventDefault()
    if(search.value){
        getMovies(SEARCH_API + search.value);
    }else{
        getMovies(API_URL)
    }
})





