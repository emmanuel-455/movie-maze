import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './page/Home';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [query, setQuery] = useState('');

  const fetchResults = async (page: number, searchQuery: string = '') => {
    try {
      const queryParam = searchQuery ? `&query_term=${searchQuery}` : '';
      const response = await fetch(`https://yts.mx/api/v2/list_movies.json?page=${page}${queryParam}`);
      const res = await response.json();
      console.log('Fetched data:', res);
      if (res && res.data && res.data.movies) {
        setMovies(res.data.movies);
        setTotalPages(Math.ceil(res.data.movie_count / res.data.limit));
      } else {
        setMovies([]);
        console.log('No movies found');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchResults(currentPage, query);
  }, [currentPage, query]);

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    setCurrentPage(1); // Reset to the first page for new search
  };

  return (
    <BrowserRouter>
      <div className="">
        <Routes>
          <Route
            path="/"
            element={<Home movies={movies} currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} onSearch={handleSearch} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
