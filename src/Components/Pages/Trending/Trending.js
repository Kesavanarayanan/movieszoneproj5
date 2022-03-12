import React, { useEffect, useState } from 'react';
import Header from '../../Header/Header';
import { Container } from '@material-ui/core';
import './Trending.css';
import axios from 'axios';
import SingleContent from '../../SingleContent/SingleContent';
import MyPagination from '../../MyPagination/MyPagination';

const Trending = () => {

  const [content, setContent] = useState([]);
  const [page, setPage] = useState(1);

  const fetchTrending = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_MY_API_KEY}&page=${page}`
      );

      setContent(data.results);
  };

  useEffect( ()=>{
    window.scroll(0, 0);
    fetchTrending();
    // eslint-disable-next-line
  },[page]);

  return (
    <>
    <Header/>
    <Container>
      <span className='page_title'>Trending Today</span>
      <div className='trending_part'>
        {content && content.map((c)=> 
        (<SingleContent key={c.id} 
        id={c.id} 
        poster={c.poster_path} 
        title={c.title || c.name} 
        date={c.first_air_date || c.release_date} 
        media_type={c.media_type}
        vote_average={c.vote_average}
        /> ))}
      </div>
      <MyPagination setPage={setPage} />
    </Container>
    </>
  )
}

export default Trending