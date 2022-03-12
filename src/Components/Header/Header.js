import React from 'react';
import './Header.css';


const Header = () => {
  return (
     <div>
          <span onClick={() => window.scroll(0,0)} className='header'>Movies🎬<i className='zonepart'>z<span style={{ color:"#353333"}}>on</span>E</i></span>
     </div>
  )
}

export default Header            