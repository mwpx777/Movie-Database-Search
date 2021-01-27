let searchButton = document.querySelector("#searchButton")
let movieTitle = document.querySelector("#movieTitle")
let movieSynopsis = document.querySelector("#movieSynopsis")
let moviePoster = document.querySelector("#moviePoster")
let movieSearchForm = document.querySelector("#movieSearchForm")
let searchHistory = document.querySelector(".searchHistory")
let movieDate = document.querySelector("#movieDate")
let movieInfoContainer = document.querySelector("#movieInfoContainer")
let clearSearches = document.querySelector("#clearSearches")
let dataCloseButton= document.querySelector('[data-close-button]')
let modal = document.querySelector("#modal")
let overlay = document.querySelector("#overlay")

var searchArray = [];

function formSubmitHandler(event) {
    // console.log('button clicked')

    event.preventDefault();
    // get value from input element
    var searchFormText = movieSearchForm.value.trim();

    if (searchFormText) {
        // console.log(searchFormText)
        // this will take user input and assign it searchFormText variable
        movieSearchForm.textContent = searchFormText
        //this will pass searchForm.value into movieSearch function as argument
        //  movieSearch(searchFormText);
         movieSearch(searchFormText);
        
       

        // create new <button> tag
        var savedSearchButton = document.createElement("button");
        // give <div> a class
        savedSearchButton.classList = "savedSearch"
        // add text to the element
        savedSearchButton.textContent = searchFormText;
        
        searchHistory.appendChild(savedSearchButton)
        searchArray.push(searchFormText)
        localStorage.setItem("Saved Search", JSON.stringify (searchArray))
        
    

        // this clears the movieSearchForm
        movieSearchForm.value = "";


    } else {                          
        // alert("Please enter a movie");
        movieSearchForm.value = "";
        openModal();
    }
};

function openModal(){
    console.log('openModal clicked')
     // document.getElementById("modal").style.zIndex="10";
    
    modal.classList.add('active');
    overlay.classList.add('active');

   
}

function closeModal(){  
    
    console.log('closeModal clicked')
    modal.classList.remove('active');
    overlay.classList.remove('active');
  

  

}

function movieSearch(keyword){
// console.log("success");
let baseURL = 'https://api.themoviedb.org/3/';
let apiKey = "3e7d82fcb86e4e69fdfe0c810341a3fd";
var movie = ''.concat(baseURL, 'search/movie?api_key=', apiKey, '&query=', keyword);

// console.log(movie);


fetch(movie).then(function (response) {
    if (response.ok) {
        response.json().then(function (data) {
            displayMovieContent(data.results)
            // console.log('fetch works');
        });
    }
})
    .catch(function (error) {
        alert("There was a network error")
    })

};

function displayMovieContent (results){
    movieInfoContainer.textContent= '';
    var poster = results[0].poster_path
    var movieName = results[0].title
    var movieOverview = results[0].overview
    var releaseDate = results[0].release_date
    // var movieId = results[0].id
    // console.log(movieName);
    // console.log(movieOverview);


    var movieTitleDiv = document.createElement('div');

    var movieTitle = document.createElement('span');
    movieTitle.classList = "movieDetails"
    movieTitle.textContent= "Movie Title: " +  movieName
    movieTitleDiv.appendChild(movieTitle);
    movieInfoContainer.appendChild(movieTitleDiv);

    var movieSynopsisDiv = document.createElement('div');

    var movieSynopsis = document.createElement('span');
    movieSynopsis.classList= "movieDetails"
    movieSynopsis.textContent = "Movie Overview:  " + movieOverview
    movieSynopsisDiv.appendChild(movieSynopsis);
    movieInfoContainer.appendChild(movieSynopsisDiv);

    var movieDateDiv = document.createElement('div');

    var movieDate = document.createElement('span');
    movieDate.classList= "movieDetails"
    movieDate.textContent = "Release Date: " + releaseDate
    movieDateDiv.appendChild(movieDate)
    movieInfoContainer.appendChild(movieDateDiv);

    var moviePosterDiv = document.createElement('div');

    var moviePoster = document.createElement('img')     
    moviePoster.src = "https://image.tmdb.org/t/p/w500/" + poster
    moviePosterDiv.appendChild(moviePoster);

    movieInfoContainer.appendChild(moviePosterDiv);

    //
}

function loadSearchData(){
    //if no saved data in localStorage, create new searchArray
    if(localStorage.getItem("Saved Search") === null){
        var searchArray = [];   
    }else{
        searchArray = JSON.parse(localStorage.getItem('Saved Search'))
    }

    searchArray.forEach(function(stored){
          // create new <button> tag
          var savedSearchButton = document.createElement("button");
          // give <div> a class
          savedSearchButton.classList = "savedSearch"
          // add text to the element
          savedSearchButton.textContent = stored;
          
          searchHistory.appendChild(savedSearchButton)
        
    })
    
}
function clearLocalStorage(){   //need to delete the buttons
    localStorage.clear()
}


//variable for sending searchHistory to savedSearches function
$('.searchHistory').on('click', 'button', function () {
    var savedSearchButton = $(this).text();
    // console.log('saved button')
    // currentCityName.innerHTML = "";
    // weatherIcon.innerHTML = "",
    savedSearches(savedSearchButton);
    // console.log(savedSearchButton);
    
});

function savedSearches(savedButton){
    // console.log(savedButton)
    // console.log('button clicked')
    movieSearch(savedButton);
    
}

searchButton.addEventListener('click', formSubmitHandler)
clearSearches.addEventListener('click', clearLocalStorage)
dataCloseButton.addEventListener('click', closeModal)

loadSearchData()