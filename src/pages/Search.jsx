import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import requests from "../Requests";
import { BiSearch } from "react-icons/bi";

const Search = () => {
  const [popularMovies, setPopularMovies] = useState([]);

  const getMovieList = async () => {
    const movie = await axios.get(`${requests.requestPopular}`);
    return movie.data.results;
  };

  const searchMovie = async (q) => {
    const search = await axios.get(`${requests.requestSearch}${q}`);
    return search.data;
  };

  useEffect(() => {
    getMovieList().then((result) => {
      setPopularMovies(result);
    });
  }, []);

  const search = async (q) => {
    if (q.length > 3) {
      const query = await searchMovie(q);
      setPopularMovies(query.results);
    }
  };

  const PopularMovieList = () => {
    return popularMovies.map((movie, i) => {
      return (
        <div className=".movie-wrapper text-center bg-black/50 w-[300px] rounded-xl mt-10">
          <div className="">{movie.title}</div>
          <img
            src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
            alt=""
          />
          <div className="">release date : {movie.release_date}</div>
          <div className="">rating : {movie.vote_average}</div>
        </div>
      );
    });
  };

  return (
    <div className="w-full h-full">
      <div className="flex flex-col justify-center items-center pt-[100px]">
        <div className="text-white text-5xl">Cari Film</div>
        <div className="w-[500px] flex flex-row rounded-full bg-black/50 my-3">
          <input
            className="w-full text-xl px-3 my-5 bg-black/0 text-white z-9 focus:outline-none"
            type="text"
            placeholder="Cari film kesayanganmu..."
            onChange={({ target }) => search(target.value)}
          />
          <BiSearch className="text-white text-3xl my-auto mr-4" />
        </div>
      </div>

      <div className="movie-container flex w-full text-white items-center justify-center gap-3 flex-wrap">
        <PopularMovieList />
      </div>
    </div>
  );
};

export default Search;
