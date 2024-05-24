import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './page/Home';
import MovieDetails from './page/MovieDetails';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState('');
  const [totalPages, setTotalPages] = useState(0);

  const fetchResults = async (page: number, searchQuery: string = '') => {
    try {
      const queryParam = searchQuery ? `&query_term=${searchQuery}` : '';
      const response = await fetch(`https://yts.mx/api/v2/list_movies.json?page=${page}${queryParam}`);
      const res = await response.json();
      if (res && res.data && res.data.movies) {
        setMovies(res.data.movies);
        setTotalPages(Math.ceil(res.data.movie_count / res.data.limit)); // assuming API returns movie_count and limit
      } else {
        setMovies([]);
        setTotalPages(0);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setMovies([]);
      setTotalPages(0);
    }
  };

  const handleSearch = (searchQuery: string) => {
    console.log('Search query:', searchQuery);
    setQuery(searchQuery);
    setCurrentPage(1); // Reset to the first page for new search
  };
  
  const handlePageChange = (page: number) => {
    console.log('Page change:', page);
    setCurrentPage(page);
  };
  
  useEffect(() => {
    fetchResults(currentPage, query);
  }, [currentPage, query]);
  
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                movies={movies}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                onSearch={handleSearch}
              />
            }
          />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
