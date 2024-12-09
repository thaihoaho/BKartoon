import { useState, useEffect } from 'react'
import { Img } from 'react-image'
import { Calendar, Film, Users } from 'lucide-react'
import classNames from 'classnames/bind'
import styles from './profile.module.css'
import defaultAvatar from '../../assets/user.png'
import axios from 'axios';
import FollowButton from './buttonfollower.jsx'

const cx = classNames.bind(styles)

export default function Profile() {
  // Mock data - replace with actual data from your backend
  const [user, setUser] = useState(null);
  useEffect(() => {
    // Lấy thông tin người dùng từ localStorage
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      // Gọi API để lấy chi tiết hồ sơ
      axios
        .get(`http://127.0.0.1:8000/api/user-profile/${storedUser.id}`)
        .then((response) => {
          setUser({
            username: response.data.username,
            joinDate: response.data.joinDate,
            profileImage: defaultAvatar, // API không trả ảnh, dùng ảnh mặc định
            favoriteLists: response.data.favoriteLists,
            reputationScore: response.data.reputationScore,
          });
        })
        .catch((error) => {
          console.error('Error fetching user profile:', error);
        });
    }
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className={cx('container')}>
      <div className={cx('header')}>
        <div className={cx('profileImage')}>
          <Img
            src={user.profileImage}
            alt={user.username}
            className={cx('avatar')}
          />
        </div>
        
        <div className={cx('userInfo')}>
          <h1 className={cx('username')}>{user.username}</h1>
          
          <div className={cx('stats')}>
            <div className={cx('statItem')}>
              <Film className={cx('icon')} />
              <span>{user.favoriteLists.length} danh sách yêu thích</span>
            </div>
            <div className={cx('statItem')}>
              <Calendar className={cx('icon')} />
              <span>Ngày tham gia: {new Date(user.joinDate).toLocaleDateString('vi-VN')}</span>
            </div>
          </div>
          <div className={cx('reputationWidget')}>
            <div className={cx('reputationScore')}>
              <span className={cx('scoreValue')}>{user.reputationScore}</span>
              <span className={cx('scoreLabel')}>Điểm uy tín</span>
            </div>
          </div>
        </div>
      </div>

      <div className={cx('content')}>
        <h2 className={cx('sectionTitle')}>Danh sách yêu thích</h2>
        
        <div className={cx('favoritesList')}>
          {user.favoriteLists.map(list => (
            <div key={list.id} className={cx('listItem')}>
              <div className={cx('listHeader')}>
                <h3 className={cx('listName')}>{list.name}</h3>
                <div className={cx('listMeta')}>
                  <div className={cx('metaItem')}>
                    <Film className={cx('icon')} />
                    <span>{list.movieCount} phim</span>
                  </div>
                  <div className={cx('metaItem')}>
                    <Users className={cx('icon')} />
                    <span>{list.followerCount} người theo dõi</span>
                  </div>
                </div>
              </div>
              <FollowButton 
                  listId={list.id}
                  initialIsFollowing={false}
                  onFollowChange={(isFollowing) => {
                    console.log('Follow status changed:', isFollowing);
                    // Ở đây bạn có thể cập nhật UI hoặc gọi thêm API nếu cần
                  }}
                />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
