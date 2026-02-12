import { Link } from "react-router-dom"
import "./header.css"
import logo from "../assets/film-solid-full.svg"
function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container-fluid">
        
          <Link className="navbar-brand fs-3" to="/"><img src={logo} className="logo me-1 mb-1" alt="" />MovieLove</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link"   to="/movies">Movies</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link"   to="/TVseries">TV Series</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Favourites">Favourites</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
