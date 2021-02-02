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
            getStreamingData(response.id);


        })
        .catch(err => {
            // console.error(err);
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
    var rating = results.rating


    //                MOVIE TITLE START             //
    // creates the div to hold everything
    var movieTitleDiv = document.createElement('div');
    movieTitleDiv.classList = "movie-card";
    movieInfoContainer.appendChild(movieTitleDiv);
    // creates the movie title tag
    var movieTitle = document.createElement('span');
    movieTitle.classList = "movieDetails movie-title";
    movieTitleDiv.appendChild(movieTitle);
    //  connect  title info to title tag name
    var movieTitleInfo = document.createElement('span');
    movieTitleInfo.classList = "movie-title-info";
    movieTitleInfo.textContent = movieName;
    movieTitle.appendChild(movieTitleInfo);
    //                MOVIE TITLE END               //

    //                MOVIE DATE START             //
    // creates the movie date div
    var movieDateDiv = document.createElement('div');
    movieDateDiv.classList = "movieDetails movie-date"
    // creates the movie date TAG
    var movieDate = document.createElement('span');
    movieDate.classList = "movie-date-tag"
    movieDate.textContent = "Release Date: "
    movieDateDiv.appendChild(movieDate)
    // connect the date info to movie date TAG
    var movieDateInfo = document.createElement('span')
    movieDateInfo.classList = "movie-date-info"
    movieDateInfo.textContent = releaseDate;
    movieDateDiv.appendChild(movieDateInfo)
    movieTitleDiv.appendChild(movieDateDiv);
    //                MOVIE DATE END             //

    //                MOVIE RUNTIME START           //    
    // create the movie run length DIV
    var movieRunTimeDiv = document.createElement('div');
    movieRunTimeDiv.classList = "movieDetails movie-runtime"
    // create the movie runtime TAG
    var movieRunTime = document.createElement('span');
    movieRunTime.classList = "movie-runtime-tag"
    movieRunTime.textContent = "Run Time:  "
    movieRunTimeDiv.appendChild(movieRunTime);
    // connect the movie run time info and connect to TAG
    var movieRunTimeInfo = document.createElement('span');
    movieRunTimeInfo.classList = "movie-runtime-info";
    movieRunTimeInfo.textContent = movieLength;
    movieRunTimeDiv.appendChild(movieRunTimeInfo);
    movieTitleDiv.appendChild(movieRunTimeDiv);
    //                MOVIE RUNTIME END             //


    //                MOVIE SYNOPSIS START          //
    // create movie synopsis DIV
    var movieSynopsisDiv = document.createElement('div');
    movieSynopsisDiv.classList = "movieDetails movie-overview"
    // creat movie synopsis TAG
    var movieSynopsis = document.createElement('span');
    movieSynopsis.classList = "movie-overview-tag"
    movieSynopsis.textContent = "Movie Overview:  "
    movieSynopsisDiv.appendChild(movieSynopsis);
    movieTitleDiv.appendChild(movieSynopsisDiv);
    // connect movie synopsis info  to TAG
    var movieSynopsisInfo = document.createElement('span')
    movieSynopsisInfo.classList = "movie-overview-info"
    movieSynopsisInfo.textContent = movieOverview;
    movieSynopsisDiv.appendChild(movieSynopsisInfo);
    //                MOVIE SYNOPSIS END             // 

    //                MOVIE POSTER START             //

    var moviePosterDiv = document.createElement('div');
    var moviePoster = document.createElement('img')
    moviePosterDiv.classList = "moviePosterImg movie-img";
    moviePoster.classList = "img-size";
    moviePoster.src = poster;
    moviePosterDiv.appendChild(moviePoster);
    movieTitleDiv.appendChild(moviePosterDiv);
    //                MOVIE POSTER END              //

    //                MOVIE TRAILER START            //
    var movieTrailerDiv = document.createElement('div');
    movieTrailerDiv.classList = "trailer"
    var movieTrailerEl = document.createElement('a')
    movieTrailerEl.href = movieTrailer;
    movieTrailerEl.target = "_blank";
    movieTrailerEl.classList = "trailerText "
    movieTrailerEl.textContent = "Click Here for " + movieName + "Trailer"
    movieTrailerDiv.appendChild(movieTrailerEl);
    movieTitleDiv.appendChild(movieTrailerDiv);

    // add a  play button on the image
    var playButton = document.createElement("i")
    playButton.classList = "fas fa-play";
    movieTrailerEl.appendChild(playButton);
    //                MOVIE TRAILER END             //

    //                MOVIE RATING START           //
    // create the movie rating TAG and DIV
    var movieRatingDiv = document.createElement('div');
    var movieRating = document.createElement('span');
    movieRatingDiv.classList = "movieDetails movie-rating"
    movieRating.classList = "movie-rating-info"
    if (rating >= 7) {
        movieRating.innerHTML = "Rating: " + rating + " 🔥🔥🔥"
    }
    else if (rating <= 6.9 || rating >= 3.1) {
        movieRating.innerHTML = "Rating: " + rating + " 😐"
    }
    else if (rating <= 3) {
        movieRating.innerHTML = "Rating: " + rating + " 🥔"
    }
    else if (rating === null) {
        movieRating.textContent = "";
    }

    movieRatingDiv.appendChild(movieRating);
    movieTitleDiv.appendChild(movieRatingDiv);
}
    //                  MOVIE RATING END           //

    //                  GET STREAMING DATA START          //
    
    function getStreamingData(result) {
        console.log(result)
        console.log('get streaming success')
        fetch("https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/idlookup?source_id=" + result + "&source=imdb&country=us", {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "da0cdc4952msh45d257d4e85230ep1fceddjsn2f034e24d454",
                "x-rapidapi-host": "utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com"
            }
        })
            .then(response => {
                return (response.json());

            })

            .then(response => {
                console.log(response);
                displayStreamContent(response.collection);
            })
    }
    //                  GET STREAMING DATA END         //

    //                  DISPLAY STREAM CONTENT START        //
    function displayStreamContent(collection){
        for(var i = 0; i < 5; i++){
            
            let siteName = collection.locations[i].display_name
            let siteUrl = collection.locations[i].url
             console.log(siteName)
             console.log(siteUrl)
            // let streamUrl = collection.

                       
            // create new span
            var sourceName= document.createElement("span");
            // create class list
            sourceName.classList =  "movieDetails movie-stream"
            // give textContent the sitename variable
            sourceName.textContent =  siteName ;
            // append siteNameEl to movieContainer
            movieInfoContainer.appendChild(sourceName);

           
            var sourceButton= document.createElement("a");
            sourceButton.classList =  "movieDetails movie-button"
            sourceButton.href = siteUrl
            sourceButton.target = "_blank";
            sourceButton.textContent =  "CLICK TO STREAM"
            movieInfoContainer.appendChild(sourceButton);
      
} 
}
   
    //                  DISPLAY STREAMING DATA END        //


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
        searchHistory.innerHTML = "";
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

