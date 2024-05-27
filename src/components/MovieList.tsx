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
    <div className="flex pt-2 md:pt-10 bg-opacity-20 backdrop-blur-lg rounded-xl border-white border-opacity-30 shadow-lg gap-[45px] flex-wrap mb-[40px] justify-center items-center">
      {noMoviesFound ? (
        <div className="text-white text-xs">Movie not found</div>
      ) : (
        movies.map((movie) => (
          <Link to={`/movie/${movie.id}`} key={movie.id} className="flex border-b border-[#5f5f5f] w-full md:w-[40%]">
            <img className="md:w-[120px] md:h-full h-[200px]" src={movie.medium_cover_image} alt={movie.title_english} />
            <div className="ml-1 pl-1 pr-1 md:pr-4">
              <h1 className="font-extrabold text-[18px] pt-2 text-white">{movie.title_english}</h1>
              <div className='flex mb-2 justify-between items-center pr-16'>
              <div className='flex gap-1 items-center'>
                <p className="text-xs font-medium">{movie.year}</p>
                -
                <p className="text-xs">{movie.runtime}mins</p>
                </div>
                <div className="flex items-center">
                  <img className="w-[13px]" src={Star} alt="Rating" />
                  <p className="text-xs flex items-center text-gray-300 ml-1">{movie.rating}</p>
                </div>
              </div>
              <div className="flex flex-wrap mb-3 items-center mt-1">
                <div className="gap-1 flex-wrap mr-1 flex items-center">
                  {movie.genres.map((genre, index) => (
                    <Link key={index} to={`/genre/${genre}`} className="text-[10px] text-white bg-[#757575] bg-opacity-50 rounded-full px-2 py-1 mx-[2px]">
                      {genre}
                    </Link>
                  ))}
                </div>
              </div>
              <p className="mb-3 text-[#adadad] text-[13px] line-clamp-3">{movie.description_full}</p>
              <div className="flex mb-2 justify-between items-center">
                
              </div>
            </div>
          </Link>
        ))
      )}
    </div>
  );
};

export default MovieList;
