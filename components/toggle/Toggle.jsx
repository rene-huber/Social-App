"use client"
import React, { useContext, useEffect } from 'react';
import { ThemeContext } from '@/context/ThemeContext';


function Toggle() {
    const { theme, toggleTheme } = useContext(ThemeContext);

    useEffect(() => {
      document.body.className = theme;
    }, [theme]);
    return (
   <>
    <button onClick={toggleTheme}>
        {theme === 'light' ? 'Light' : 'Dark'}
        </button>
   </>
    )
}

export default Toggle