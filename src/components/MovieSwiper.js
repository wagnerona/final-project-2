import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard.js";
// import MoviePicker from "./MoviePicker.js";
import { Link } from "react-router-dom";
import useLocalStorage from '../Utils/useLocalStorage'



function MovieSwiper({ movies, onMovieSubmit }) {

  const [swipeDirection, setSwipeDirection] = useState(null);
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
  const [shortlist, setShortlist] = useState([]);
  


  const handleShortList = () => {
    // event.preventDefault();
    // updating the shortlist data
    // setChosenMovie([...shortlist, chosenMovie]);
    onMovieSubmit(shortlist);
    console.log(shortlist);  
  };

  useEffect(() => {
        // const jsonShortlist = JSON.stringify(shortlist); // convert new data to JSON format
        const storedShortlist = localStorage.getItem('movie'); // retrieve existing data from localStorage
        let parsedStoredShortlist = null;
          if (storedShortlist) {
              parsedStoredShortlist = JSON.parse(storedShortlist); // parse existing data if present
              }
  
  const movieArray = Array.isArray(parsedStoredShortlist) ? parsedStoredShortlist : (parsedStoredShortlist ? [parsedStoredShortlist] : []); // check if parsed data is an array and create an array with single movie object if not
  const combinedData = [...movieArray, ...shortlist]; // combine existing and new data
    localStorage.setItem('movie', JSON.stringify(combinedData)); // save combined data to localStorage
}, [shortlist]);

  function handleSwipe(direction) {
    if (direction === "right") {
      const currentMovie = movies[currentMovieIndex];
      setShortlist([...shortlist, currentMovie]); // add current movie to shortlist
    }
    setCurrentMovieIndex(currentMovieIndex + 1); // show next movie
  }


  if (currentMovieIndex >= movies.length) {
    // end of movie list, show some message or redirect to another page
    return <p>No more movies to display</p>;
  }

  const currentMovie = movies[currentMovieIndex];

  return (
    <div name="picks" className='w-full md:h-screen text-[#212529]'>
      <div className="mx-auto px-8 flex flex-col justify-center h-full">
        <h1>Swipe right to keep or left to dismiss the movie</h1>
        <div className="movie-card">
        <div className="movie-details">
          <h2>{currentMovie.title}</h2>

         
          <img className="mx-auto w-72 h-128" src={`http://image.tmdb.org/t/p/w185${currentMovie.poster_path}`} alt={currentMovie.title} />
         
          <p className="movie-detail">{currentMovie.overview}</p>
          <p className="movie-detail"><strong>Release Date:</strong> {currentMovie.release_date}</p>
          <p className=" movie-detail"><strong>Language:</strong> {currentMovie.original_language}</p>
          <p className=" movie-detail"><strong>Rating:</strong> {currentMovie.vote_average}</p>

           </div>
          <div className="swipe-buttons">
            <button className="leftButton" onClick={() => handleSwipe("left")}>Swipe left</button>
            <button className="rightButton" onClick={() =>  handleSwipe("right") }>Swipe right</button>
          </div>
          <div className="shortlist">
            <h3>Shortlist</h3>
          </div>
        </div>
        <div>
          <Link to="/my-movies">
          <button className="FinishButton block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-gray hover:bg-transparent hover:text-gray focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
            onClick={handleShortList}>
            Done! Show me my movies
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MovieSwiper;