import React, { useEffect, useState } from 'react';
import Header from '../../Header/Header';
import { Container } from '@material-ui/core';
import axios from 'axios';
import MyPagination from '../../MyPagination/MyPagination';
import SingleContent from '../../SingleContent/SingleContent';
import Genres from '../../Genre/Genres';
import useGenre from '../../Genre/useGenre';

const Movies = () => {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPage, setNumOfPage] = useState();
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genres, setGenres] = useState([]);
  const genreforURL = useGenre(selectedGenres);

  const fetchMovies = async() =>{
    const{ data } = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_MY_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`)
   
    setContent(data.results);
    setNumOfPage(data.total_pages);
  };

   useEffect(()=>{
     fetchMovies();
     // eslint-disable-next-line
   },[page,genreforURL]);

  return (
    <>
    <Header/>
    <Container>
      <span className='page_title'>Movies</span>
      <Genres
        type='movie'
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
        setPage={setPage} />

      <div className='trending_part'>
        {content && content.map((c)=> 
        (<SingleContent key={c.id} 
        id={c.id} 
        poster={c.poster_path} 
        title={c.title || c.name} 
        date={c.first_air_date || c.release_date} 
        media_type='movie'
        vote_average={c.vote_average}
        /> ))}
      </div>
      {numOfPage > 1 &&( <MyPagination setPage={setPage} numOfPage={numOfPage} />)}
    </Container>
    </>
  )
}

export default Movies