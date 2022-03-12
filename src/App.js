import './App.css';
import SimpleBottomNavigation from './Components/Footer/MainNav';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './Components/Pages/Home/Home';
import Trending from './Components/Pages/Trending/Trending';
import Series from './Components/Pages/Series/Series';
import Movies from './Components/Pages/Movies/Movies';
import Search from './Components/Pages/Search/Search';


function App() {
  return (
  <BrowserRouter>
    
       <div className="app">
         <Routes>
            <Route path='/' exact  element={<Home/>}></Route>
            <Route path='trending' element={<Trending/>} />
            <Route path='movies' element={<Movies/>} />
            <Route path='series' element={<Series/>} />
            <Route path='search' element={<Search/>} />
          </Routes>
       </div>
    <SimpleBottomNavigation/>
  </BrowserRouter>
  );
}

export default App;
