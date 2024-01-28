"use client"
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHeart  } from '@fortawesome/free-regular-svg-icons';
import styles from "./like.module.css"



const LikeButton = ({ userEmail, slug }) => {
  const [liked, setLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(0);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
   
    const checkIfLiked = async () => {
      try {
        const response = await fetch(`/api/posts/${slug}/like`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          cache: 'no-cache', 
        });

        if (response.ok) {
          const data = await response.json()
          setLiked(data.isLiked)
          setLikesCount(data.likesCount)
          console.log(data, "daaatatatatatatata");
          
        } else {
          console.error("Failed to Like")
          setLiked(false)
        }
      } catch (error) {
        console.error("Error:", error)
        setLiked(false)
      }
    };

    checkIfLiked()
  }, [userEmail, slug, setLiked, setLikesCount, liked, likesCount])

console.log( likesCount, "765785875785745745754754");
console.log(liked,  "11111111111111111111111111");


  const handleLike = async () => {
    
    setLoading(true);
    try {
      const response = await fetch(`/api/posts/${slug}/like`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userEmail , slug}),
      });

      if (response.ok) {
        setLiked(!liked);
        setLikesCount(prev => liked ? prev - 1 : prev + 1);
      } else {
        console.log("error");
      }
    } catch (error) {
      // Manejar errores
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleLike} disabled={loading} className={styles.heart}>
      {liked ?  <FontAwesomeIcon icon={faHeart} style={{ fontSize: '20px', color: 'orange' }} /> :  <FontAwesomeIcon icon={faHeart} style={{ fontSize: '20px', color: '#d5d5d5' }} /> } {""} {likesCount}
    </button>
  );
};

export default LikeButton;
