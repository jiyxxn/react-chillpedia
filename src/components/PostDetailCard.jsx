import FoodCategoryTag from './foodCategoryTag';
import { StDetailSection, StDetailBox } from '../styles/detailCard.styled';

const PostDetailCard = (post) => {
  return (
    <StDetailSection>
      <div className="userRow">
        <div>
          <img
            src={post.profiles.image}
            className="userProfile"
            alt="작성자 프로필"
          />
          <span>{post.profiles.nickname}</span>
        </div>
      </div>

      <StDetailBox>
        <div className="detail-left">
          <img src={post.image_url} alt="음식 이미지" />
          <div>
            <h2>{post.restaurant_name}</h2>
            <span>{post.restaurant_location}</span>
          </div>
          <span>{post.created_at.split('T')[0]}</span>
        </div>
        <ul>
          <li>
            <h3>추천 메뉴</h3>
            <p>{post.recommended_menu}</p>
          </li>
          <li>
            <h3>가격대</h3>
            <p>{post.price_range}</p>
          </li>
          <li>
            <h3>주소</h3>
            <p>{post.restaurant_address}</p>
          </li>
          <li>
            <h3>내용</h3>
            <p>{post.content}</p>
          </li>
        </ul>
        <FoodCategoryTag category={post.category} />
      </StDetailBox>
    </StDetailSection>
  );
};

export default PostDetailCard;
