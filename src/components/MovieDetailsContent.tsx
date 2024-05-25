import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Ytdetails from './Ytdetails';
import Footer from './Footer';

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

const MovieDetailsContent: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedTorrent, setSelectedTorrent] = useState<Movie['torrents'][0] | null>(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`);
        const res = await response.json();
        if (res && res.data && res.data.movie) {
          setMovie(res.data.movie);
        } else {
          navigate('/');
        }
      } catch (error) {
        console.error('Error fetching movie details:', error);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <svg
          className="w-8 h-8 text-gray-300 animate-spin"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24">
          <path
            d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"></path>
          <path
            d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-900"></path>
        </svg>
      </div>
    );
  }

  if (!movie) {
    return <div>Movie not found</div>;
  }

  const handleTorrentSelect = (torrent: Movie['torrents'][0]) => {
    setSelectedTorrent(torrent);
  };

  return (
    <div className="container mx-auto pt-2 px-2">
      <p className='block md:hidden text-sm pl-1 py-2'><a href="/Home">Back</a></p>
      <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-xl border border-white border-opacity-30 shadow-lg p-3">
        <div className="md:flex items-center">
          <div className='flex justify-evenly items-center'>
            <img
            src={movie.large_cover_image}
            alt={movie.title_english}
            className="w-[200px] mr-1 md:mr-0 md:w-[900px] h-auto mt-4 rounded-lg"
            />
            <div className="block md:hidden mt-4">
              <ul className="mt-2 gap-2 flex flex-wrap">
                {movie.torrents.map((torrent, index) => (
                  <li key={index} className="text-white mb-2">
                    <button
                      onClick={() => handleTorrentSelect(torrent)}
                      className={`w-full md:w-auto ${selectedTorrent === torrent ? 'font-semibold' : ''}`}>
                      <div className='flex rounded py-1 bg-[#198f23] flex-col items-center justify-center px-2'>
                        <p className='text-xs md:text-sm'>{torrent.quality}</p>
                        <p className='text-xs'>{torrent.size}</p>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
              {selectedTorrent && (
                <div className="mt-1 flex text-sm justify-center">
                  <a
                    href={selectedTorrent.url}
                    className="bg-blue-500 font-medium flex flex-col items-center text-white px-4 py-2 rounded hover:bg-blue-600">
                    Download<p className='text-xs'>{selectedTorrent.quality}</p>
                  </a>
                  
                </div>
              )}
            </div>
          </div>
          <div className="md:ml-6 pb-10 mt-4 md:mt-0">
            <h1 className="text-xl md:text-3xl font-semibold text-white">{movie.title_english}</h1>
            <p className="text-[15px] font-medium text-white">{movie.year}</p>
            <div className="flex flex-wrap mb-3 items-center mt-1">
              <div className="gap-1 mr-1 flex-wrap flex items-center">
                {movie.genres.map((genre, index) => (
                  <span
                    key={index}
                    className="text-sm md:text-[14px] text-white bg-[#757575] bg-opacity-50 rounded-full px-2 py-1 mx-[2px]">
                    {genre}
                  </span>
                ))}
              </div>
              <p className="text-sm text-white">{movie.runtime} mins</p>
            </div>
            <div className='my-5'>
            <Ytdetails />
            </div>
            <p className="text-white md:text-base text-sm">{movie.description_full}</p>
            <div className="hidden md:block mt-4">
              <ul className="mt-2 gap-4 flex flex-wrap">
                {movie.torrents.map((torrent, index) => (
                  <li key={index} className="text-white mb-2">
                    <button
                      onClick={() => handleTorrentSelect(torrent)}
                      className={`w-full md:w-auto ${selectedTorrent === torrent ? 'font-semibold' : ''}`}>
                      <div className='flex rounded py-1 bg-[#198f23] flex-col items-center justify-center px-4'>
                        <p>{torrent.quality}({torrent.type})</p>
                        <p className='text-xs'>{torrent.size}</p>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
              {selectedTorrent && (
                <div className="mt-4">
                  <a
                    href={selectedTorrent.url}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Download {selectedTorrent.quality}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div>
      </div>
      <div className='mt-[150px]'>
      <Footer />
      </div>
    </div>
  );
};

export default MovieDetailsContent;
