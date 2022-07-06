import React, {useState} from 'react';
import {FaArrowCircleUp} from 'react-icons/fa';
import classes from './scrollToTop.module.css'
  
const ScrollButton = () =>{
  
  const [visible, setVisible] = useState(false)
  
  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300){
      setVisible(true)
    } 
    else if (scrolled <= 300){
      setVisible(false)
    }
  };
  
  const scrollToTop = () =>{
    window.scrollTo({
      top: 0, 
      behavior: 'smooth'
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  };
  
  window.addEventListener('scroll', toggleVisible);
  
  return (
        <span className={classes.button} style={{display: visible ?  'inline' : 'none'}}>
            <FaArrowCircleUp  onClick={scrollToTop} />
        </span>
  );
}
  
export default ScrollButton;