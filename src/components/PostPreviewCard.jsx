import { StPreviewCard } from '../styles/myPage.styled';
import { formatDate } from '../utils/formatDate';

const PostPreviewCard = ({
  post,
  postEditButtonHandler,
  postDeleteButtonHandler,
}) => {
  return (
    <StPreviewCard>
      <img src={post.image_url} />
      <div className="post-info">
        <div className="title-location">
          <h3>{post.restaurant_name}</h3>
          <span>{post.restaurant_location}</span>
        </div>
        <div className="date-button">
          <span>{formatDate(post.created_at, 'dots')}</span>
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
