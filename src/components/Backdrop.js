import "./Backdrop.css";
import React, { useState } from 'react';
const Backdrop = ({show,closeResbar}) => {
    const click = () => {
        closeResbar(false);
    }
    return(
        <div className={show?"backdrop backdrop--open":"backdrop"} onClick={click}> 
        </div>
    );
}

export default Backdrop;