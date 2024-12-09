import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Heart, HeartOff } from 'lucide-react';
import styles from './buttonfollower.module.css';

const FollowButton = ({ listId, initialIsFollowing, onFollowChange }) => {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  const [isLoading, setIsLoading] = useState(false);

  // Lấy sharer_id từ localStorage
  const sharerId = JSON.parse(localStorage.getItem('user'))?.id;

  // Xác định shared_id (id của trang profile hoặc từ props listId)
  const getSharedId = () => {
    const pathParts = window.location.pathname.split('/');
    return pathParts[pathParts.length - 1]; // Luôn lấy ID từ URL
  };

  // Khôi phục trạng thái từ localStorage khi component được tải lại
  useEffect(() => {
    const savedStatus = localStorage.getItem(`followStatus-${getSharedId()}`);
    if (savedStatus !== null) {
      setIsFollowing(JSON.parse(savedStatus));
    }
  }, []);

  const handleFollow = async () => {
    if (!sharerId) {
      console.error('User is not logged in.');
      return;
    }

    setIsLoading(true);
    try {
      const sharedId = getSharedId(); // Lấy shared_id (linh động từ URL hoặc props)
      const response = await axios.post('http://127.0.0.1:8000/api/toggle-follow', {
        sharer_id: sharerId, // Lấy từ localStorage
        shared_id: sharedId, // Lấy shared_id từ URL hoặc listId
        fav_id: listId, // Nếu listId là fav_id, truyền nó vào
      });

      const { error, message } = response.data;
      if (!error) {
        // Lưu trạng thái mới vào localStorage
        const newStatus = !isFollowing;
        setIsFollowing(newStatus);
        localStorage.setItem(`followStatus-${sharedId}`, JSON.stringify(newStatus));

        if (onFollowChange) {
          onFollowChange(newStatus);
        }
      } else {
        console.error(message);
      }
    } catch (error) {
      console.error('Error toggling follow status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      className={`${styles['follow-button']} ${isFollowing ? styles.following : ''}`}
      onClick={handleFollow}
      disabled={isLoading}
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
