import { StPreviewCard } from '../styles/myPage.styled';

const PostPreviewCard = ({
  post,
  postEditButtonHandler,
  postDeleteButtonHandler,
}) => {
  // * 날짜 형식을 바꾸는 함수
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}. ${month}. ${day}.`;
  };

  return (
    <StPreviewCard>
      <img src={post.image_url} />
      <div className="post-info">
        <div className="title-location">
          <h3>{post.restaurant_name}</h3>
          <span>{post.restaurant_location}</span>
        </div>
        <div className="date-button">
          <span>{formatDate(post.created_at)}</span>
          <button
            className="edit-button"
            onClick={() => postEditButtonHandler(post)}
          >
            수정
          </button>
          <button
            className="delete-button"
            onClick={() => postDeleteButtonHandler(post)}
          >
            삭제
          </button>
        </div>
      </div>
    </StPreviewCard>
  );
};

export default PostPreviewCard;
