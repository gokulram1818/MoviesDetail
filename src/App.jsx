import { Route, Routes } from "react-router-dom";
import Header from "./components/header";
import Home from "./pages/home";
import Movies from "./pages/movies";
import TvSeries from "./pages/tvSeries";
import Favourites from "./pages/favourites";
import MovieDetail from "./pages/movieDetails";
import Footer from "./components/footer";


function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<><Home /><Footer/></>} />
        <Route path="/movies" element={<><Movies /><Footer/></>} />
        <Route path="/TVseries" element={<><TvSeries /><Footer/></>} />
        <Route path="/favourites" element={<><Favourites /><Footer/></>} />
        <Route path="/:type/:id" element={<MovieDetail />} />
        </Routes>
      
    </div>
  );
}

export default App;
