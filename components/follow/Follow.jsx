"use client"

import {useEffect, useState} from 'react'
import FollowList from '../followList/FollowList';


const Follow = ({ userEmail, authorEmail, profile }) => {
  
  const [isFollowing, setIsFollowing] = useState(false);  
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    const fetchFollowers = async () => {
        try {
            const response = await fetch(`/api/users/${profile}follow`, { method: 'GET' });
            if (response.ok) {
                const data = await response.json();
                setFollowers(data);
                console.log(data, 'data////////////////////')
            } else {
                throw new Error('error');
            }
        } catch (error) {
            console.error( error);
        }
    };

    fetchFollowers();
},[userEmail, authorEmail]);




  const toggleFollow = async () => {
    try {
      const response = await fetch(`/api/users/${profile}/follow`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userEmail, authorEmail }),
      });
      const data = await response.json();
      setIsFollowing(data.isFollowing);
      
      console.log(data, 'data3323232323')
    } catch (error) {
      // Maneja los errores
    }
  };

  



  return (
    <div>
      <button onClick={toggleFollow}>
        {isFollowing ? 'Unfollow' : 'Follow'}
      </button>
      <p>Author: {authorEmail}</p>
      <p>User: {userEmail}</p>
      <p>id: {profile}</p>
    
    </div>
  );
}


export default Follow;