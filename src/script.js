console.log('Silver Screen')


async function fetchData() {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=aac3cf6bb5b21faafb2e8a1c96baf14d&append_to_response=videos,images`)
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
    }

}


const popularMovies = document.getElementsByClassName('popularMovies')
const moviesList = document.getElementsByClassName('movieList')
const movieListItems = document.querySelector('.movieListItems')

async function movieData() {
    let data = await fetchData()

    data.results.map((e) => {
        const { backdrop_path, title, poster_path, id, origin_country, original_language, first_air_date } = e
 
 
        // Popular movie poster element.
        const moviePoster = document.createElement('div');
        moviePoster.className = 'moviesPoster';
        moviePoster.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.8)), url(https://image.tmdb.org/t/p/original${backdrop_path})`;

        // Add inner content
        moviePoster.innerHTML = `
          <div style="position: absolute; left: 50px; top: 180px; display: flex; color: white; justify-content: center; align-items: center;">
            <img src="../rsrc/Icons/play.png" alt="" style="width: 50px; margin-right: 10px;">
            <h1 style="font-weight: 100;">${title}</h1>
          </div>
        `;

        popularMovies[0].appendChild(moviePoster);

        

        // All movies element.
            const movies = document.createElement('div');
            movies.className = 'movies';
            movies.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 1)), url(https://image.tmdb.org/t/p/original${poster_path})`;
            movies.innerHTML = `<div class="moviesData"  ><p>${title}</p><p>Popularity - 9.4</p></div>`
            moviesList[0].appendChild(movies)


        // Show movies list container
        let lists = `  <div class="lists" style="background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 1)), url(https://image.tmdb.org/t/p/original${poster_path});background-position: center;background-size: cover;background-repeat: no-repeat; border-radius: 20px; position: relative; min-width: 200px; max-width: fit-content;padding-left:10px;padding-right:20px;">
            <div style="position: absolute; position: absolute; height: 50px; top: 170px;background: none; color: white; ">
                <h3 style="width:85%;  font-size:1em;font-weight: 300;">${title}</h3>
                <p style="font-weight: 200;">Rating-9.4</p>
            </div>
        </div>`
        movieListItems.innerHTML +=lists



    })

    searchMovie()


}

let mainPage = document.querySelector('.contentContainer')
let movieListPage = document.querySelector('.moviesListContainer')
function seeMoivesList (){
mainPage.style.display = 'none'
movieListPage.style.display = 'block'

}


function previousPage (){
mainPage.style.display = 'block'
movieListPage.style.display = 'none'

}

let searchMovieInput = document.getElementById('searchMovie')
function searchMovie(){

searchMovieInput.addEventListener('click',()=>{
mainPage.style.display = 'none'
movieListPage.style.display = 'block'
})

let lists = document.querySelectorAll('.lists')
searchMovieInput.addEventListener('input',(e)=>{
    lists.forEach((Element)=>{
        // moviesArray.push(Element.firstElementChild.firstElementChild.innerText)
        if(Element.firstElementChild.firstElementChild.innerText.toLowerCase().includes(e.target.value.toLowerCase())){
            Element.style.display='block'
        }else{
            Element.style.display='none'
        }
    
    })     

})
console.log()

}





movieData()
