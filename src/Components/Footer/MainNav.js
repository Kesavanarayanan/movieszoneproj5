import React, {useEffect}  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import MovieIcon from '@material-ui/icons/Movie';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import TvIcon from '@material-ui/icons/Tv';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    width:'100%',
     position:'fixed',
     bottom:0,
     background:'#000',
     zIndex:100,
   
  },
});

export default function SimpleBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  useEffect(() => {
  if (value === 0) {navigate('/');}
  else if(value === 1) {navigate('/trending');}
  else if(value === 2) {navigate('/movies');}
  else if(value === 3) {navigate('/series');}
  else if(value === 4) {navigate('/search');}
  }, [value, navigate] );
  
   

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction  style={{color:"silver"}} label="Home" icon={<HomeIcon />} />
      <BottomNavigationAction  style={{color:"silver"}} label="Trending" icon={<WhatshotIcon />} />
      <BottomNavigationAction  style={{color:"silver"}} label="Movies" icon={<MovieIcon />} />
      <BottomNavigationAction  style={{color:"silver"}} label="Tv Series" icon={<TvIcon />} />
      <BottomNavigationAction  style={{color:"silver"}} label="Search" icon={<SearchIcon />} />
    </BottomNavigation>
  );
}
