import { useEffect, useState } from "react"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from "react-responsive-carousel"
import { Link } from "react-router-dom"
import "./movies.css"

function Movies() {
  const[PopularMovies,setPopularMovies]=useState([])
  const[SearchMovie,setSearchMovie]=useState([])
  const[Query,setQuerry]=useState("")
  const API_KEY = import.meta.env.VITE_API_KEY
  useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`)
    .then((res)=>res.json())
    .then((data)=>setPopularMovies(data.results))

  },[])
  useEffect(() => {
    if (!Query.trim()) {
      fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => setSearchMovie(data.results))
    } else {
      fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${Query}`)
        .then((res) => res.json())
        .then((data) => setSearchMovie(data.results))
    }
  }, [Query])
  return (
    <div className="container-fluid mt-5 p-0 mb-3 ">
      {PopularMovies.length > 0 && (
  <Carousel
    showThumbs={false}
    autoPlay
    infiniteLoop
    interval={2500}
    transitionTime={900}
    showStatus={false}
    stopOnHover={true}
    swipeable={true}
  >
    {PopularMovies.map((movie)=>(
      <Link to={`/movie/${movie.id}`} key={movie.id} className="nav-link">
        <div className="posterImage position-relative">
          <img
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}alt={movie.title}className="w-100 h-100 object-fit-fixed"/>
          <div className="posterImage_overlay position-absolute bottom-0 start-0 end-0 text-white p-4">
            <h2 className="fw-bold d-flex align-items-center display-4 mb-2">
              {movie.title}
            </h2>
            <div className="release_date d-flex align-items-center gap-3 ">
              <span>{movie.release_date}</span>
              <span className="text-warning">⭐ {Math.round(movie.vote_average * 10) / 10}</span>
            </div>
            <p className="description d-flex mt-3 text-light">{movie.overview}</p>
          </div>
        </div>
      </Link>
    ))}
  </Carousel>
)}
    <div className="container">
    <input 
    type="text"
    className=" form-control input-grp w-25 my-5 "
    placeholder="Search movies..."
    value={Query}
    onChange={(e)=>{
      e.preventDefault()
      setQuerry(e.target.value)}} />
    </div>
      <div className="container">
  <div className="row row-cols-2 row-cols-md-4 g-4">
    {SearchMovie.filter((m) => m.poster_path).map((movie) => (
  <div className="col" key={movie.id}>
    <Link to={`/movie/${movie.id}`}>
      <img
        className="w-100 h-auto"
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
    </Link>
  </div>
))}
  </div>
</div>
     
    </div>

    
  )
}

export default Movies
