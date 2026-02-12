import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "./favourites.css"

function Favorites() {
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || []
    setFavorites(storedFavorites)
  }, [])
  const reomveFavorite=(id)=>{
    const updatedArray = favorites.filter((fav)=>fav.id!==id)
        setFavorites(updatedArray)
        localStorage.setItem("favorites", JSON.stringify(updatedArray))
  }

  return (
    <div className="container mt-5 text-light">
      <h2 className="my-5 ">⭐ My Favorites</h2>
      {favorites.length === 0?(
        <p className="h3">No favorites added yet.</p>
      ):(
        <div className="row">
          {favorites.map((fav) => (
            <div key={fav.id} className="col-lg-3 col-md-4  col-sm-6 mb-4">
              <div className="card bg-dark text-light">
                <img
                  src={`https://image.tmdb.org/t/p/w500${fav.poster}`}
                  className="card-img-top"
                  alt={fav.title}
                />
                <div className="card-body">
                  {fav.title.length>24?<h5 style={{fontSize:"18px"}} className="card-title">{fav.title||fav.original_title}</h5>:<h5 className="card-title mb-4">{fav.title||fav.original_title}</h5>}
                  <Link to={`/${fav.type}/${fav.id}`} className="btn btn-primary">
                    View Details
                  </Link>
                  <button key={fav.id} onClick={()=>reomveFavorite(fav.id)} className="btn btn-danger ms-2">Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Favorites
