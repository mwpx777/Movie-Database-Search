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
    // go to the spot on the html -- document.getElementById("main-content").innerHTML = ` !HTML `
    movieInfoContainer.textContent = '';
    var movieName = results.title
    var releaseDate = results.year
    var movieLength = results.length
    var movieOverview = results.plot
    var poster = results.poster
    var movieTrailer = results.trailer.link

// creates the div to hold everything
    var movieTitleDiv = document.createElement('div');
    movieTitleDiv.classList = "movie-card";
    movieInfoContainer.appendChild(movieTitleDiv)
// creates the movie title
    var movieTitle = document.createElement('span');
    movieTitle.classList = "movieDetails movie-title"
    movieTitle.textContent = "Movie Title: " + movieName
    movieTitleDiv.appendChild(movieTitle);
    // movieInfoContainer.appendChild(movieTitleDiv);

// creates the movie date
    var movieDateDiv = document.createElement('div');

    var movieDate = document.createElement('span');
    movieDateDiv.classList = "movieDetails movie-date"
    movieDate.textContent = "Release Date: " + releaseDate
    movieDateDiv.appendChild(movieDate)
    movieTitleDiv.appendChild(movieDateDiv);
    // movieInfoContainer.appendChild(movieDateDiv);
// creat the movie run length
    var movieRunTimeDiv = document.createElement('div');

    var movieRunTime = document.createElement('span');
    movieRunTimeDiv.classList = "movieDetails movie-runtime"
    movieRunTime.textContent = "Run Time:  " + movieLength
    movieRunTimeDiv.appendChild(movieRunTime);
    movieTitleDiv.appendChild(movieRunTimeDiv);

// create movie synopsis
    var movieSynopsisDiv = document.createElement('div');

    var movieSynopsis = document.createElement('span');
    movieSynopsisDiv.classList = "movieDetails movie-overview"
    movieSynopsis.textContent = "Movie Overview:  " + movieOverview
    movieSynopsisDiv.appendChild(movieSynopsis);
    movieTitleDiv.appendChild(movieSynopsisDiv);

// var movieTrailerDiv = document.createElement('div');
//     movieTitleDiv.classList="trailer";
//     movieTitleDiv.appendChild(movieTrailerDiv);
// create movie poster
    var moviePosterDiv = document.createElement('div');

    var moviePoster = document.createElement('img')
    moviePosterDiv.classList = "moviePosterImg movie-img";
    moviePoster.classList= "img-size";
    moviePoster.src = poster;
    moviePosterDiv.appendChild(moviePoster);
    movieTitleDiv.appendChild(moviePosterDiv);

    // movieInfoContainer.appendChild(moviePosterDiv);

    var movieTrailerDiv = document.createElement('div');
    // var movieTrailerDiv = $("<div>");


    var movieTrailerEl = document.createElement('a')
    movieTrailerEl.href = movieTrailer;
    movieTrailerEl.target = "_blank";
    movieTrailerEl.classList = "trailerText"
    movieTrailerEl.textContent ="Click Here for " + movieName + "trailer"
<<<<<<< HEAD
   

    movieTrailerDiv.appendChild(movieTrailerEl);
  
=======
    movieTitleDiv.appendChild(movieTrailerEl);
   
>>>>>>> 424b6fbd71d6bba7446043088c4e0bd791999cb2

   

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

