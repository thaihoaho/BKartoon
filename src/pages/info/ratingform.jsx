import React, { useState } from "react";
import classNames from "classnames/bind";
import { Star } from "lucide-react";
import styles from "./ratingform.module.css";
import axios from "axios"; // Nếu bạn cần dùng axios thay vì fetch

const cx = classNames.bind(styles);

export default function RatingForm({ onClose, filmId }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false); // Để theo dõi trạng thái gửi yêu cầu

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra xem người dùng đã đăng nhập chưa
    if (!userId) {
      setErrorMessage("User không được tìm thấy. Vui lòng đăng nhập lại.");
      return;
    }

    // Cấu trúc payload
    const payload = {
      user_id: userId,
      film_id: filmId, // Nhận từ props
      point: rating,
      comment: review,
    };

    setLoading(true); // Bắt đầu quá trình gửi dữ liệu

    try {
      const response = await fetch("http://127.0.0.1:8000/api/addrating", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Không thể gửi đánh giá");
      }

      // Xử lý thông báo thành công
      setSuccessMessage(data.message || "Đánh giá của bạn đã được gửi!");
      setErrorMessage("");
      setRating(0); // Reset rating
      setReview(""); // Reset review
    } catch (err) {
      // Xử lý lỗi
      setErrorMessage(err.message || "Có lỗi xảy ra, vui lòng thử lại sau.");
      setSuccessMessage("");
    } finally {
      setLoading(false); // Kết thúc quá trình gửi dữ liệu
    }
  };

  return (
    <div className={cx("overlay")}>
      <div className={cx("modal", "compactModal")}>
        <button className={cx("closeButton")} onClick={onClose}>
          ×
        </button>
        <h2 className={cx("title")}>Your Rating</h2>

        <form onSubmit={handleSubmit} className={cx("form")}>
          <div className={cx("scrollableContent")}>
            {/* Hiển thị rating */}
            <div className={cx("starRating")}>
              {[...Array(10)].map((_, index) => {
                const starValue = index + 1;
                return (
                  <button
                    type="button"
                    key={starValue}
                    className={cx("starButton")}
                    onClick={() => setRating(starValue)}
                    onMouseEnter={() => setHover(starValue)}
                    onMouseLeave={() => setHover(rating)}
                  >
                    <Star
                      className={cx("star", {
                        filled: starValue <= (hover || rating),
                      })}
                    />
                  </button>
                );
              })}
              <span className={cx("ratingNumber")}>{rating || 0}</span>
            </div>

            {/* Hiển thị input nhận xét */}
            <div className={cx("inputGroup")}>
              <textarea
                placeholder="Write your review here"
                className={cx("reviewInput")}
                value={review}
                onChange={(e) => setReview(e.target.value)}
                
              />
              <div className={cx("characterCount")}>
                Required characters: {150 - review.length}
              </div>
            </div>
          </div>

          {/* Hiển thị lỗi hoặc thành công */}
          {errorMessage && <p className={cx("error-message")}>{errorMessage}</p>}
          {successMessage && <p className={cx("success-message")}>{successMessage}</p>}

          {/* Nút submit */}
          <button type="submit" className={cx("submitButton")} disabled={loading}>
            {loading ? "Đang gửi..." : "Submit Review"}
          </button>
        </form>

        <p className={cx("terms")}>
          By submitting, you agree to our Terms of Use. The data submitted is
          true and not copyrighted by any third party.
        </p>
      </div>
    </div>
  );
}
