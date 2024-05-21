import Star from "../assets/star.svg";

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

const MovieList = ({ movies }: { movies: Movie[] }) => {
  return (
    <div className="flex flex-wrap mb-[150px] justify-center items-center">
      {movies.map((movie) => (
        <div className="flex m-3 bg-white bg-opacity-20 backdrop-blur-lg rounded-xl border border-white border-opacity-30 shadow-lg w-[28%]" key={movie.id}>
          <img className="w-[120px] rounded-l-xl" src={movie.medium_cover_image} alt={movie.title_english} />
          <div className="ml-1 pl-1 pr-4">
            <h1 className="font-semibold text-[15px] pt-2 text-white">{movie.title_english}</h1>
            <div className="flex mb-3 items-center flex-wrap mt-1">
              <div className="mr-1 flex items-center">
              {movie.genres.map((genre, index) => (
                <span key={index} className="text-xs text-white  bg-[#757575] bg-opacity-50 rounded-full px-2 py-1 mx-[2px]">{genre}</span>
                
              ))}
              </div>
              <p className="text-xs">{ movie.runtime}mins</p>
            </div>
            <p className="mb-3 text-[14px] line-clamp-3">{movie.description_full}</p>
            <div className="flex mb-2 items-center">
              <img className="w-[13px]" src={Star} alt="Rating" />
              <p> </p>
            <p className="text-xs flex items-center text-gray-300">{ movie.rating}</p>
           </div>
            
          </div>
        </div>
      ))}
    </div>
  );
}

export default MovieList;
