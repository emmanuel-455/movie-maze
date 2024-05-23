import React from 'react';
import Star from "../assets/star.svg";
import { Link } from 'react-router-dom';

interface Movie {
  id: number;
  url: string;
  imd_code: string;
  title: string;
  title_english: string;
  title_long: string;
  slug: string;
  year: number;
  rating: number;
  runtime: number;
  genres: string[];
  summary: string;
  description_full: string;
  synopsis: string;
  yt_trailer_code: string;
  language: string;
  mpa_rating: string;
  background_image: string;
  background_image_original: string;
  small_cover_image: string;
  medium_cover_image: string;
  large_cover_image: string;
  state: string;
  torrents: {
    url: string;
    hash: string;
    quality: string;
    type: string;
    seed: number;
    peers: number;
    size: string;
    size_bytes: number;
    date_uploaded: string;
    date_uploaded_unix: number;
  }[];
}

interface MovieListProps {
  movies: Movie[];
  noMoviesFound: boolean;
}

const MovieList: React.FC<MovieListProps> = ({ movies, noMoviesFound }) => {
  return (
    <div className="flex bg-white pt-2 md:pt-10 bg-opacity-20 backdrop-blur-lg rounded-xl border border-white border-opacity-30 shadow-lg gap-[45px] flex-wrap mb-[150px] justify-center items-center">
      {noMoviesFound ? (
        <div className="text-white text-xl">Movie not found</div>
      ) : (
        movies.map((movie) => (
          <Link to={`./movie/${movie.id}`} key={movie.id}
          className="flex border-b m-3 md:border-[1px] rounded-xl md:border-[#5e5e5e] w-full md:w-[31%]"
          >
            
            <img className="md:w-[100px] md:h-full h-[100px] md:rounded-tl-xl" src={movie.medium_cover_image} alt={movie.title_english} />
            <div className="ml-1 pl-1 md:pr-4">
              <h1 className="font-semibold mb-3 text-[15px] pt-2 text-white">{movie.title_english}</h1>
              <div className="flex flex-wrap mb-3 items-center mt-1">
                <div className="gap-1 mr-1 flex  items-center">
                  {movie.genres.map((genre, index) => (
                    <span key={index} className="text-[10px] text-white bg-[#757575] bg-opacity-50 rounded-full px-2 py-1 mx-[2px]">
                      {genre}
                    </span>
                  ))}
                </div>
                <p className="text-xs">{movie.runtime}mins</p>
              </div>
              <p className="mb-3 text-[13px] line-clamp-3">{movie.description_full}</p>
              <div className="flex mb-2 justify-between items-center">
                <div className="flex items-center">
                  <img className="w-[13px]" src={Star} alt="Rating" />
                  <p className="text-xs flex items-center text-gray-300 ml-1">{movie.rating}</p>
                </div>
                <p className="text-sm font-medium">{movie.year}</p>
              </div>
            </div>
          
          </Link>
        ))
      )}
    </div>
  );
};

export default MovieList;
