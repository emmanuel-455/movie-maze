import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './page/Home';

const App = () => {
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const request = await fetch(`https://yts.mx/api/v2/list_movies.json?page=1`);
        const res = await request.json();
        if (res && res.data && res.data.movies) {
          setResults(res.data.movies);
          console.log(results); // Log the movies array
        } else {
          setResults([]);
          console.log('No movies found'); // Log if no movies are found
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchResults();
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home movies={results} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
