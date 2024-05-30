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

  const filteredMovies = movies.filter((movie) =>
    movie.genres.map((g) => g.toLowerCase()).includes(genre.toLowerCase())
  );

  return (
    <div className="container mx-auto">
      <h1 className="text-xl font-bold text-white mb-4 text-center capitalize">{genre} Movies on the page</h1>
      <div className="flex flex-wrap justify-center items-center">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <Link to={`/movie/${movie.id}`} key={movie.id} className="m-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
              <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
                <img className="w-full h-auto mb-2 rounded-lg" src={movie.medium_cover_image} alt={movie.title_english} />
                <h2 className="text-lg font-semibold text-white text-center">{movie.title_english}</h2>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-white">No movies found for this genre.</p>
        )}
      </div>
    </div>
  );
};

export default GenrePage;
