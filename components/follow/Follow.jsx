"use client"
import React, { useState, useEffect } from 'react';

const Follow = ({ userEmail, authorEmail }) => {
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    // Aquí debes verificar si el usuario actual está siguiendo al autor del post
    // Esta lógica dependerá de cómo estés almacenando esta información
  }, []);

  const handleFollow = async () => {
    try {
      const response = await fetch('/api/follow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ followerEmail: userEmail, followingEmail: authorEmail }),
      });

      if (response.ok) {
        setIsFollowing(!isFollowing); // Cambiar el estado de seguimiento
      } else {
        console.error('Failed to follow/unfollow');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <button onClick={handleFollow}>
      {isFollowing ? 'Unfollow' : 'Follow'}
    </button>
  );
};

export default Follow;