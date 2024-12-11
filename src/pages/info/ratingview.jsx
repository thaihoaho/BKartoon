import { Img } from "react-image";
import styles from "./ratingview.module.css";

export default function ReviewCard({ review }) {
  return (
    <div className={styles.reviewCard}>
      <div className={styles.reviewHeader}>
        <div className={styles.userInfo}>
          <Img
            src={review.userAvatar || "/placeholder.svg"}
            alt=""
            width={50}
            height={50}
            className={styles.avatar}
          />
          <div>
            <h3 className={styles.username}>{review.username}</h3>
            <div className={styles.rating}>Rating: {review.rating}/10</div>
          </div>
        </div>
        <div className={styles.date}>{review.date}</div>
      </div>

      <div className={styles.content}>{review.comment}</div>
    </div>
  );
}
