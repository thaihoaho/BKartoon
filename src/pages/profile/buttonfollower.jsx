import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Heart, HeartOff } from 'lucide-react';
import styles from './buttonfollower.module.css';

const FollowButton = ({ listId, initialIsFollowing, onFollowChange }) => {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  const [isLoading, setIsLoading] = useState(false);

  // Lấy sharer_id từ localStorage
  const sharerId = JSON.parse(localStorage.getItem('user'))?.id;

  // Lấy shared_id từ URL
  const getSharedId = () => {
    const pathParts = window.location.pathname.split('/');
    return pathParts[pathParts.length - 1]; // ID của trang profile
  };

  const sharedId = getSharedId();

  // Tạo key lưu trạng thái trong localStorage
  const localStorageKey = `followStatus-${sharedId}-${listId}`;

  // Khôi phục trạng thái từ localStorage khi component được tải
  useEffect(() => {
    const savedStatus = localStorage.getItem(localStorageKey);
    if (savedStatus !== null) {
      setIsFollowing(JSON.parse(savedStatus));
    }
  }, [localStorageKey]);

  const handleFollow = async () => {
    if (!sharerId) {
      console.error('User is not logged in.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/toggle-follow', {
        sharer_id: sharerId, // ID của tài khoản hiện tại
        shared_id: sharedId, // ID của trang profile (lấy từ URL)
        fav_id: listId, // listId của nút hiện tại
      });

      const { error, message } = response.data;
      if (!error) {
        const newStatus = !isFollowing; // Đổi trạng thái
        setIsFollowing(newStatus);

        // Lưu trạng thái mới vào localStorage với key duy nhất
        localStorage.setItem(localStorageKey, JSON.stringify(newStatus));

        // Gọi callback nếu có để cập nhật trạng thái bên ngoài
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
