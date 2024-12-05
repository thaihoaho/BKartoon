import { useState } from 'react'
import styles from './ratingform.module.css'

export default function RatingForm() {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the rating and comment to your backend
    console.log('Rating:', rating, 'Comment:', comment)
    // Reset form
    setRating(0)
    setComment('')
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h3>Rate This Anime</h3>
      <div className={styles.ratingInput}>
        <label htmlFor="rating">Your Rating (0-10):</label>
        <input
          type="number"
          id="rating"
          min="0"
          max="10"
          step="0.1"
          value={rating}
          onChange={(e) => setRating(parseFloat(e.target.value))}
          required
        />
      </div>
      <div className={styles.commentInput}>
        <label htmlFor="comment">Your Comment:</label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
      </div>
      <button type="submit" className={styles.submitButton}>Submit Rating</button>
    </form>
  )
}