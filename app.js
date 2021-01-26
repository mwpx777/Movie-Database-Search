let searchButton = document.querySelector("#searchButton")
let movieTitle = document.querySelector("#movieTitle")
let movieSynopsis = document.querySelector("#movieSynopsis")
let moviePoster = document.querySelector("#moviePoster")
let movieSearchForm = document.querySelector("#movieSearchForm")
let savedSearchesContainer = document.querySelector(".savedSearchesContainer")
let movieDate = document.querySelector("#movieDate")

var searchArray = [];

function formSubmitHandler(event) {
    console.log('button clicked')

    event.preventDefault();
    // get value from input element
    var searchFormText = movieSearchForm.value.trim();

    if (searchFormText) {
        console.log(searchFormText)
        // this will take user input and assign it searchFormText variable
        movieSearchForm.textContent = searchFormText
        //this will pass searchForm.value into movieSearch function as argument
        //  movieSearch(searchFormText);
         movieSearch(searchFormText);
       

        // create new <li> tag
        var savedSearchButton = document.createElement("button");
        // give <div> a class
        savedSearchButton.classList = "savedSearch"
        // add text to the element
        savedSearchButton.textContent = searchFormText;
        // append cityNameText to citySearches
        savedSearchesContainer.appendChild(savedSearchButton)
        searchArray.push(searchFormText)
        localStorage.setItem("savedSearch", JSON.stringify (searchArray))
        
    

        // this clears the movieSearchForm
        movieSearchForm.value = "";


    } else {                            //change this to a modal popup window
        alert("Please enter a movie");
    }
};

function movieSearch(keyword){
console.log("success");
let baseURL = 'https://api.themoviedb.org/3/';
let apiKey = "3e7d82fcb86e4e69fdfe0c810341a3fd";
var movie = ''.concat(baseURL, 'search/movie?api_key=', apiKey, '&query=', keyword);

console.log(movie);


fetch(movie).then(function (response) {
    if (response.ok) {
        response.json().then(function (data) {
            displayMovieContent(data.results)
            console.log('fetch works');
        });
    }
})
    .catch(function (error) {
        alert("There was a network error")
    })

};

function displayMovieContent (results){
    var movieName = results[0].title
    var movieOverview = results[0].overview
    var releaseDate = results[0].release_date
    console.log(movieName);
    console.log(movieOverview);

    movieTitle.textContent= movieName
    movieSynopsis.textContent = movieOverview
    movieDate.textContent = releaseDate
}


searchButton.addEventListener('click', formSubmitHandler)
