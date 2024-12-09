import React, { useState } from 'react';
import { Heart, HeartOff } from 'lucide-react';
import styles from './buttonfollower.module.css';

const FollowButton = ({ listId, initialIsFollowing, onFollowChange }) => {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  const [isLoading, setIsLoading] = useState(false);

  const handleFollow = async () => {
    setIsLoading(true);
    try {
      // Ở đây bạn sẽ gọi API
      // const response = await axios.post(`/api/lists/${listId}/${isFollowing ? 'unfollow' : 'follow'}`);
      
      setIsFollowing(!isFollowing);
      if (onFollowChange) {
        onFollowChange(!isFollowing);
      }
    } catch (error) {
      console.error('Error following list:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button 
  onClick={handleFollow}
  disabled={isLoading}
  className={`follow-button ${isFollowing ? 'following' : ''}`}
>
  {isFollowing ? (
    <>
      <HeartOff className="icon" />
      Bỏ theo dõi
    </>
  ) : (
    <>
      <Heart className="icon" />
      Theo dõi
    </>
  )}
</button>
  );
};

export default FollowButton;