import { useState } from 'react'
import { Img } from 'react-image'
import { Calendar, Film, Users } from 'lucide-react'
import classNames from 'classnames/bind'
import styles from './profile.module.css'
import defaultAvatar from '../../assets/user.png'

const cx = classNames.bind(styles)

export default function Profile() {
  // Mock data - replace with actual data from your backend
  const user = {
    username: "Illian",
    joinDate: "2023-12-01",
    profileImage: defaultAvatar,
    favoriteLists: [
      {
        id: 1,
        name: "Anime Hay",
        movieCount: 24,
        followerCount: 156
      },
      {
        id: 2,
        name: "Phim Hành Động",
        movieCount: 18,
        followerCount: 89
      },
      {
        id: 3,
        name: "Phim Kinh Dị",
        movieCount: 12,
        followerCount: 45
      }
    ],
    reputationScore: 850
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
              <span>87 danh sách yêu thích</span>
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
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
