import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import "./movieDetails.css"

function Details() {
  const { type, id }=useParams()
  const [Data, setData]=useState({})
  const[imdb_id,setImdb_id]=useState(null)
  const API_KEY = import.meta.env.VITE_API_KEY


  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/${type}/${id}?api_key=${API_KEY}`)
      .then((res) => res.json())
      .then((d) => setData(d))
  }, [type, id]) 
  useEffect(()=>{
    if(type==="tv"){
    fetch(`https://api.themoviedb.org/3/tv/${id}/external_ids?api_key=${API_KEY}`)
    .then((res)=>res.json())
    .then((data)=>setImdb_id(data.imdb_id))
    }
    else if(type==="movie"){
        setImdb_id(Data.imdb_id)
    }
  },[type,id,Data.imdb_id])
   const addToFavorites = () => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || []
    const alreadyExists = storedFavorites.some((item) => item.id === Data.id)

    if (!alreadyExists) {
      storedFavorites.push({
        id: Data.id,
        title: Data.title || Data.name,
        poster: Data.poster_path,
        type: type
      })
      localStorage.setItem("favorites", JSON.stringify(storedFavorites))
      alert("Added to Favorites ")
    } else {
      alert("Already in Favorites ")
    }
  }
  return (
    <div className=" container mt-5">
        <div className="">
            <div className="backdrop_div ">
           <img className=" backdrop" src={`https://image.tmdb.org/t/p/original${Data.backdrop_path}`} alt="" />
           </div>
           <div className=" poster_div  container row">
           <div className=" col-lg-3 col-md-12 col-sm-12 ">
           <img className="poster" src={`https://image.tmdb.org/t/p/original${Data.poster_path}`} alt="" />
           </div>
           <div className=" col-lg-8 col-md-12 col-sm-12 text-light">
           <p className="h1 fs-1">{Data.title||Data.name}</p>
           <p>{Data.tagline||Data.title||Data.name}</p>
           <p>{Math.round(Data.vote_average * 10) / 10} ⭐<span className="ms-2">({Data.vote_count}) votes</span></p>
           {Data.runtime&&<p>{Data.runtime} mins</p>}
           <p>Release Date : {Data.release_date||Data.first_air_date}</p>
           <div className="genres d-flex gap-2 mt-3">
               {Data.genres && Data.genres.map((g) => (
               <span key={g.id} className="btn btn-outline-light rounded-pill bg-secondary">{g.name}</span>
            ))}
           </div>
           {Data.movie?<p className="h4">Description</p>:<p className="h4 mt-5">Description</p>}
           <p>{Data.overview}</p>
           <a href={`https://www.imdb.com/title/${imdb_id}`} className="btn btn-secondary">View in IMDB</a>
           <a onClick={addToFavorites} className="btn btn-secondary ms-2"> Add to favourites</a>
           </div>
           </div>
        </div>
    </div>
  )
}
export default Details