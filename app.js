let searchButton = document.querySelector("#searchButton")
let movieTitle = document.querySelector("#movieTitle")
let movieSynopsis = document.querySelector("#movieSynopsis")
let moviePoster = document.querySelector("#moviePoster")
let movieSearchForm = document.querySelector("#movieSearchForm")
let searchHistory = document.querySelector(".searchHistory")
let movieDate = document.querySelector("#movieDate")
let movieInfoContainer = document.querySelector("#movieInfoContainer")
let clearSearches = document.querySelector("#clearSearches")
let dataCloseButton = document.querySelector('[data-close-button]')
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
        localStorage.setItem("Saved Search", JSON.stringify(searchArray))



        // this clears the movieSearchForm
        movieSearchForm.value = "";


    } else {
        // alert("Please enter a movie");
        movieSearchForm.value = "";
        openModal();
    }
};

function openModal() {
    // console.log('openModal clicked')    
    modal.classList.add('active');
    overlay.classList.add('active');

}

function closeModal() {
    // console.log('closeModal clicked')
    modal.classList.remove('active');
    overlay.classList.remove('active');

}

function movieSearch(keyword) {
    // console.log("success");
    fetch("https://imdb-internet-movie-database-unofficial.p.rapidapi.com/search/" + keyword, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "0f5a126af5msh08292e68334f9c6p1b79aejsnddfbd878acb5",
            "x-rapidapi-host": "imdb-internet-movie-database-unofficial.p.rapidapi.com"
        }
    })
        .then(response => {
            return (response.json());


        }).then(response => {
            console.log(response)
            getMovieId(response);

        })
        .catch(err => {
            // console.error(err);
        });


};
function getMovieId(titles) {
    console.log(titles);
    console.log("movieid success")
    var movieId = titles.titles[0].id  //need the movieID number here to pass into fetch 
    console.log(movieId);


    fetch("https://imdb-internet-movie-database-unofficial.p.rapidapi.com/film/" + movieId, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "0f5a126af5msh08292e68334f9c6p1b79aejsnddfbd878acb5",
            "x-rapidapi-host": "imdb-internet-movie-database-unofficial.p.rapidapi.com"
        }
    })
        .then(response => {
            return (response.json());

        }).then(response => {
            console.log(response)
            displayMovieContent(response);
        })
        .catch(err => {
            console.error(err);
        });
}


function displayMovieContent(results) {
    movieInfoContainer.textContent = '';
    var movieName = results.title
    var releaseDate = results.year
    var movieLength = results.length
    var movieOverview = results.plot
    var poster = results.poster
    var movieTrailer = results.trailer.link


    var movieTitleDiv = document.createElement('div');

    var movieTitle = document.createElement('span');
    movieTitle.classList = "movieDetails"
    movieTitle.textContent = "Movie Title: " + movieName
    movieTitleDiv.appendChild(movieTitle);
    movieInfoContainer.appendChild(movieTitleDiv);

    var movieDateDiv = document.createElement('div');

    var movieDate = document.createElement('span');
    movieDate.classList = "movieDetails"
    movieDate.textContent = "Release Date: " + releaseDate
    movieDateDiv.appendChild(movieDate)
    movieInfoContainer.appendChild(movieDateDiv);

    var movieRunTimeDiv = document.createElement('div');

    var movieRunTime = document.createElement('span');
    movieRunTime.classList = "movieDetails"
    movieRunTime.textContent = "Run Time:  " + movieLength
    movieRunTimeDiv.appendChild(movieRunTime);
    movieInfoContainer.appendChild(movieRunTimeDiv);


    var movieSynopsisDiv = document.createElement('div');

    var movieSynopsis = document.createElement('span');
    movieSynopsis.classList = "movieDetails"
    movieSynopsis.textContent = "Movie Overview:  " + movieOverview
    movieSynopsisDiv.appendChild(movieSynopsis);
    movieInfoContainer.appendChild(movieSynopsisDiv);


    var moviePosterDiv = document.createElement('div');

    var moviePoster = document.createElement('img')
    moviePoster.classList = "moviePosterImg";
    moviePoster.src = poster
    moviePosterDiv.appendChild(moviePoster);

    movieInfoContainer.appendChild(moviePosterDiv);

    var movieTrailerDiv = document.createElement('div');

    var movieTrailerEl = document.createElement('a')
    movieTrailerEl.href = movieTrailer + '?"' + ( ' target="_blank')
    movieTrailerEl.classList = "trailerText"
    movieTrailerEl.textContent ="Click Here for " + movieName + "trailer"
    movieTrailerDiv.appendChild(movieTrailerEl);
    

    movieInfoContainer.appendChild(movieTrailerDiv);

    //
}

function loadSearchData() {
    //if no saved data in localStorage, create new searchArray
    if (localStorage.getItem("Saved Search") === null) {
        var searchArray = [];
    } else {
        searchArray = JSON.parse(localStorage.getItem('Saved Search'))
    }

    searchArray.forEach(function (stored) {
        // create new <button> tag
        var savedSearchButton = document.createElement("button");
        // give <div> a class
        savedSearchButton.classList = "savedSearch"
        // add text to the element
        savedSearchButton.textContent = stored;

        searchHistory.appendChild(savedSearchButton)

    })

}
function clearLocalStorage() {   
    searchHistory.innerHTML="";
    localStorage.clear()
}


//variable for sending searchHistory to savedSearches function
$('.searchHistory').on('click', 'button', function () {
    var savedSearchButton = $(this).text();

    savedSearches(savedSearchButton);
    // console.log(savedSearchButton);

});

function savedSearches(savedButton) {
    // console.log(savedButton)
    // console.log('button clicked')
    movieSearch(savedButton);

}

searchButton.addEventListener('click', formSubmitHandler)
clearSearches.addEventListener('click', clearLocalStorage)
dataCloseButton.addEventListener('click', closeModal)

loadSearchData()

