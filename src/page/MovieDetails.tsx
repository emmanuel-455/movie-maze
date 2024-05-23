import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

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

const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`);
        const res = await response.json();
        if (res && res.data && res.data.movie) {
          setMovie(res.data.movie);
        }
      } catch (error) {
        console.error('Error fetching movie details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!movie) {
    return <div>Movie not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-xl border border-white border-opacity-30 shadow-lg p-6">
        <h1 className="text-3xl font-bold text-white">{movie.title_english}</h1>
        <img src={movie.large_cover_image} alt={movie.title_english} className="w-full h-auto mt-4 rounded-lg" />
        <p className="mt-4 text-white">{movie.description_full}</p>
        <p className="mt-2 text-white">Year: {movie.year}</p>
        <p className="mt-2 text-white">Rating: {movie.rating}</p>
        <p className="mt-2 text-white">Runtime: {movie.runtime} minutes</p>
        <p className="mt-2 text-white">Genres: {movie.genres.join(', ')}</p>
      </div>
    </div>
  );
};

export default MovieDetails;
