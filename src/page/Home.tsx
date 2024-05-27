import React, { useEffect, useState } from "react";
import Hero from "../components/Hero";
import MovieList from "../components/MovieList";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";
import Footer from "../components/Footer";
import Logo from "../assets/Logo.svg"

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

interface HomeProps {
  movies: Movie[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onSearch: (query: string) => void;
}

const Home: React.FC<HomeProps> = ({ movies, currentPage, totalPages, onPageChange, onSearch }) => {
  const [noMoviesFound, setNoMoviesFound] = useState(false);

  useEffect(() => {
    setNoMoviesFound(movies.length === 0);
  }, [movies]);

  return (
    <div>
      <div className="flex items-center md:px-10 justify-between">
        <img className="w-[55px] ml-3 md:w-[70px]" src={Logo} alt="" />
        <SearchBar onSearch={onSearch} />
      </div>
      <Hero />
      <MovieList movies={movies} noMoviesFound={noMoviesFound} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
      <div className='mt-[150px]'>
      <Footer />
      </div>
    </div>
  );
};

export default Home;
