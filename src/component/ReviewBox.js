import "../style/productDetail.style.css";

const ReviewBox = ({ name, review }) => {
  return (
    <div className="review-box">
      <div className="review-author">작성자: {name}</div>
      <div className="review-content">{review}</div>
    </div>
  );
};

export default ReviewBox;
