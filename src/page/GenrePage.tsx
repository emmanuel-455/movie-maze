import React from 'react';
import { useParams, Link } from 'react-router-dom';

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

interface GenrePageProps {
  movies: Movie[];
}

const GenrePage: React.FC<GenrePageProps> = ({ movies }) => {
  const { genre } = useParams<{ genre: string }>();

  if (!genre) {
    return <p className="text-white">Genre is not specified.</p>;
  }

  const filteredMovies = movies.filter((movie) => movie.genres.includes(genre));

  return (
    <div className="flex flex-wrap justify-center items-center">
      {filteredMovies.length > 0 ? (
        filteredMovies.map((movie) => (
          <Link to={`/movie/${movie.id}`} key={movie.id} className="m-4">
            <img className="w-[150px]" src={movie.medium_cover_image} alt={movie.title_english} />
            <h1 className="text-white">{movie.title_english}</h1>
          </Link>
        ))
      ) : (
        <p className="text-white">No movies found for this genre.</p>
      )}
    </div>
  );
};

export default GenrePage;
