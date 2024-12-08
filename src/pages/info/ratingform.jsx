import React, { useState } from 'react'
import classNames from 'classnames/bind'
import { Star } from 'lucide-react'
import styles from './ratingform.module.css'

const cx = classNames.bind(styles)

export default function RatingForm({ onClose }) {
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const [review, setReview] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle submission logic here
    onClose()
  }

  return (
    <div className={cx('overlay')}>
      <div className={cx('modal', 'compactModal')}>
        <button className={cx('closeButton')} onClick={onClose}>×</button>
        <h2 className={cx('title')}>Your Rating</h2>

        <form onSubmit={handleSubmit} className={cx('form')}>
          <div className={cx('scrollableContent')}>
            <div className={cx('starRating')}>
              {[...Array(10)].map((_, index) => {
                const starValue = index + 1
                return (
                  <button
                    type="button"
                    key={starValue}
                    className={cx('starButton')}
                    onClick={() => setRating(starValue)}
                    onMouseEnter={() => setHover(starValue)}
                    onMouseLeave={() => setHover(rating)}
                  >
                    <Star
                      className={cx('star', {
                        'filled': starValue <= (hover || rating)
                      })}
                    />
                  </button>
                )
              })}
              <span className={cx('ratingNumber')}>{rating || 0}</span>
            </div>

            <div className={cx('inputGroup')}>
              <textarea
                placeholder="Write your review here"
                className={cx('reviewInput')}
                value={review}
                onChange={(e) => setReview(e.target.value)}
                required
              />
              <div className={cx('characterCount')}>
                Required characters: {600 - review.length}
              </div>
            </div>
          </div>
          <button type="submit" className={cx('submitButton')}>
            Submit Review
          </button>
        </form>
        <p className={cx('terms')}>
          By submitting, you agree to our Terms of Use. The data submitted is true and not copyrighted by any third party.
        </p>
      </div>
    </div>
  )
}
