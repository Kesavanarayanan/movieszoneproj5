import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import axios from 'axios';
import { img_500, unavailable,unavailableLandscape } from '../Config/config';
import { Button } from '@material-ui/core';
import YouTubeIcon from "@material-ui/icons/YouTube";
import Carousel from './Carousel/Carousel';
import './ContentModal.css';


const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    width:'90%',
    height:'80%',
    backgroundColor:'#282c34',
    border: '1px solid #000',
    borderRadius: 10,
    color: 'white',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1, 1, 3),
  },
}));

export default function ContentModal({children, media_type, id}) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState();
  const [uVideo, setUvideo] = useState();


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchInnerData = async() =>{
    const{data} = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_MY_API_KEY}&language=en-US`);
    
    setContent(data);
    console.log(data);
};
  
const fetchVideo = async () => {
     const { data } = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_MY_API_KEY}&language=en-US`);
       
     
     setUvideo(data.results[0]?.key);
     
};

useEffect(() => {
 fetchInnerData();
 fetchVideo();
// eslint-disable-next-line
}, []);

  return (
    <>
      <div className='media' onClick={handleOpen} style={{cursor:'pointer'}}>
        {children}
      </div> 
      
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
         {content && (
          <div className={classes.paper}>
            <div className='innercontent'>
              
              <img className='content_potrait' alt={content.name||content.title} src={content.poster_path? `${img_500}/${content.poster_path}` :unavailable} />
              
              <img className='content_landscape' alt={content.name||content.title} src={content.backdrop_path? `${img_500}/${content.backdrop_path}` :unavailableLandscape} />
            
              <div className='inner-about'>
                <span className='content-title'>
                 {content.name || content.title} ({(content.first_air_date || content.release_date || '-----')})
                </span>

                  {content.tagline && (<i className='content-tagline'> {content.tagline} </i>)}

                <span className='content-description'>
                   {content.overview}                 
                </span>  
                 <div>
                   <Carousel media_type={media_type} id={id}/>
                 </div>

                 <Button 
                   variant='contained'
                   startIcon={<YouTubeIcon/>}
                   color='secondary'
                   target='_blank'
                   href={`https://www.youtube.com/watch?v=${uVideo}`}
                   >
                   Watch the Trailer
                 </Button>
              </div>
            </div>
          </div>
)}
        </Fade>
      </Modal>
    </>
  );
}