import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from "react-responsive-carousel"
import { Link } from "react-router-dom"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { useEffect, useState } from "react"
import "./home.css"

function Home() {
  const[PopularMovies, setPopularMovies]=useState([])
  const[TopRated,setTopRated]=useState([])
  const[PopularSeries,setPopularSeries]=useState([])
  const[TopTv,setTopTv]=useState([])

  useEffect(() => {
    fetch("https://api.themoviedb.org/3/movie/popular?api_key=74d1441879935853e509d09572e6f471")
      .then((data) => data.json())
      .then((M) => setPopularMovies(M.results))
  }, [])
  useEffect(()=>{
    fetch("https://api.themoviedb.org/3/movie/top_rated?api_key=74d1441879935853e509d09572e6f471")
    .then((res)=>res.json())
    .then((tr)=>setTopRated(tr.results))
},[])
  useEffect(()=>{
    fetch("https://api.themoviedb.org/3/tv/popular?api_key=74d1441879935853e509d09572e6f471")
    .then((res)=>res.json())
    .then((tv)=>setPopularSeries(tv.results))
  },[])
  useEffect(()=>{
    fetch("https://api.themoviedb.org/3/tv/top_rated?api_key=74d1441879935853e509d09572e6f471")
    .then((res)=>res.json())
    .then((data)=>setTopTv(data.results))
  },[])
const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 5,
    slidesToScroll: 3,
    swipeToSlide:true,
    variableWidth: true,
    responsive: [
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }}]
  }
  return (
    <div className="main container-fluid mt-5 p-0">
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
              {movie.original_title}
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
  {TopRated.length > 0 && (
  <div className=" top-rated container-fluid  w-100 mt-5">
    <h1 className="mb-4">Top Rated Movies</h1>
    <Slider {...settings}>
      {TopRated.map((tr) => (
        <div className="poster_card_div " style={{width:270}} key={tr.id}>
            <Link to={`/movie/${tr.id}`}>
          <img className="poster-card " src={`https://image.tmdb.org/t/p/original${tr.poster_path}`} alt={tr.title}/>
          </Link>
        </div>
      ))}
      </Slider>
  </div>
)}
 {PopularSeries.length > 0 && (
  <div className=" top-rated container-fluid  w-100 mt-5">
    <h1 className="mb-4">Popular TV Shows</h1>
    <Slider {...settings}>
      {PopularSeries.map((tv) => (
        <div className="poster_card_div " style={{width:270}} key={tv.id}>
            <Link to={`/tv/${tv.id}`}>
          <img className="poster-card " src={`https://image.tmdb.org/t/p/original${tv.poster_path}`} alt={tv.title}/>
          </Link>
        </div>
      ))}
      </Slider>
  </div>
)}
 {TopTv.length > 0 && (
  <div className=" top-rated container-fluid  w-100 mt-5">
    <h1 className="mb-4">Top Rated TV Shows</h1>
    <Slider {...settings}>
      {TopTv.map((tv) => (
        <div className="poster_card_div " style={{width:270}} key={tv.id}>
            <Link to={`/tv/${tv.id}`}>
          <img className="poster-card" src={`https://image.tmdb.org/t/p/original${tv.poster_path}`} alt={tv.title}/>
          </Link>
        </div>
      ))}
      </Slider>
  </div>
)}
</div>
  )
}
export default Home