import React, { useState, useEffect } from 'react';
import './Search.css';
import Header from '../../Header/Header';
import { Button, Container, Tab, Tabs, ThemeProvider } from '@material-ui/core';
import { createTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios';
import MyPagination from '../../MyPagination/MyPagination';
import SingleContent from '../../SingleContent/SingleContent';

const Search = () => {

  const [type, setType] = useState(0);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [content, setContent] = useState([]);
  const [numOfPage, setNumOfPage] = useState();


  const darkTheme = createTheme({
    palette: {
      type:'light',
      primary:{
        main:'#fff',
      },
    },
  });

  const fetchSearch = async() =>{
    const { data } = await axios.get(`https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${
      process.env.REACT_APP_MY_API_KEY
    }&language=en-US&query=${searchText}&page=${page}&include_adult=false`);

    setContent(data.results);
    setNumOfPage(data.total_pages);
  };

  useEffect(() => {
    window.scroll(0,0);
    fetchSearch();
  // eslint-disable-next-line
  }, [type, page]);
  
  return (
    <>
    <Header/>
    <Container>
      <span className='page_title'>Search</span>

      <ThemeProvider theme={darkTheme}>
        <div style={{display:'flex', margin:'15px 0'}}>
          <TextField style={{flex:1}} 
            className='searchbox' 
            label="Search" 
            variant="filled" 
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button variant='contained' style={{marginLeft:10}} onClick={fetchSearch}><SearchIcon/></Button>
        </div>

        <Tabs value={type} indicatorColor='primary' textColor='dark'
         onChange={(event,newValue)=>{
           setType(newValue);
           setPage(1);
         }}>
          <Tab style={{ width:'50%'}} label='Movies'/>
          <Tab style={{ width:'50%'}} label='TV Series'/>
        </Tabs>
      </ThemeProvider>
     
      <div className='trending_part'>
        {content && content.map((c)=> 
        (<SingleContent key={c.id} 
        id={c.id} 
        poster={c.poster_path} 
        title={c.title || c.name} 
        date={c.first_air_date || c.release_date} 
        media_type={type ? 'tv' :'movie'}
        vote_average={c.vote_average}
        /> ))}

        {searchText && !content && (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
      </div>
      {numOfPage > 1 &&( <MyPagination setPage={setPage} numOfPage={numOfPage} />)}

    </Container>
    </>
  )
}

export default Search