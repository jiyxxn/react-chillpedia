import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FoodCategoryTag from './FoodCategoryTag';
import { UserLoginContext } from '../providers/AuthProvider';
import styled from 'styled-components';
import supabase from '../shared/supabaseClient';
import { locationList } from '../shared/locationList';

const defaultProfileImage = 'default_profile.png';

const PostList = () => {
  const navigate = useNavigate();
  const { isLogin } = useContext(UserLoginContext);
  const [selectedLocation, setSelectedLocation] = useState('전체');
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      let { data: posts, error } = await supabase
        .from('posts')
        .select('* , profiles(nickname, image)')
        .order('created_at', { ascending: false }); // 최신순 정렬

      if (error) {
        console.log('FetchCommentError =====>', error);
        return;
      }
      setPostList(posts);
    };
    getPosts();
  }, []);

  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
  };

  const handlePostClick = (id) => {
    navigate(`/post-detail/${id}`);
  };

  const handleWriteClick = (e) => {
    e.stopPropagation();
    navigate('/post-write');
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}.${month}.${day}`;
  };

  const filteredPosts = postList.filter(
    (post) =>
      selectedLocation === '전체' ||
      post.restaurant_location === selectedLocation,
  );

  return (
    <PageContainer>
      <Header>
        <Logo>GamChillMat</Logo>
        <ButtonGroup>
          <HeaderButton onClick={() => navigate('/mypage')}>
            마이페이지
          </HeaderButton>
          <HeaderButton onClick={() => navigate('/login')}>로그인</HeaderButton>
        </ButtonGroup>
      </Header>

      <Context>
        <SelectWrapper>
          <Select
            id="locationSelect"
            value={selectedLocation}
            onChange={handleLocationChange}
          >
            <option value="전체">전체</option>
            {locationList.map(([key, value], index) => (
              <option key={index} value={value}>
                {value}
              </option>
            ))}
          </Select>
        </SelectWrapper>

        <PostsWrapper>
          {filteredPosts &&
            filteredPosts.map((post) => (
              <CardContainer key={post.id}>
                <AuthorInfoContainer>
                  <ProfileImage
                    src={
                      post.profiles?.image ||
                      post.profile ||
                      defaultProfileImage
                    }
                    alt="작성자 프로필"
                  />
                  <AuthorName>
                    {post.profiles?.nickname || post.author || '작성자'}
                  </AuthorName>
                </AuthorInfoContainer>

                <PostCard onClick={() => handlePostClick(post.id)}>
                  <CategoryBadge>
                    <FoodCategoryTag category={post.category} />
                  </CategoryBadge>
                  <PostContent>
                    <PostImageContainer>
                      <PostImage src={post.image_url} alt="게시글 이미지" />
                    </PostImageContainer>
                    <RestaurantInfo>
                      <div>
                        <RestaurantName>{post.restaurant_name}</RestaurantName>
                        <LocationOverlay>
                          {post.restaurant_location}
                        </LocationOverlay>
                      </div>
                      <PostDate>{formatDate(post.created_at)}</PostDate>
                    </RestaurantInfo>
                  </PostContent>
                </PostCard>
              </CardContainer>
            ))}
        </PostsWrapper>
      </Context>

      <FloatingButton onClick={handleWriteClick}>+</FloatingButton>
    </PageContainer>
  );
};

export default PostList;

// 💄 Styled Components

const PageContainer = styled.div`
  width: 1920px;
  min-height: 1080px;
  margin: 0 auto;
  background-color: #faf6ea;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  background-color: #efe1c6;
  width: 1920px;
  height: 160px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  color: #333333;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const HeaderButton = styled.button`
  background-color: #95b645;
  color: #faf6ea;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
`;

const Context = styled.main`
  width: 1920px;
  flex: 1;
  padding: 1.5rem;
`;

const SelectWrapper = styled.div`
  width: 520px;
  margin: 0 auto 1rem auto;
  display: flex;
  justify-content: flex-end;
`;

const Select = styled.select`
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  border: 1px solid #ccc;
  font-size: 1rem;
  color: #66666e;
  background-color: #faf6ea;
`;

const PostsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  align-items: center;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const AuthorInfoContainer = styled.div`
  width: 519px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border-top-left-radius: 0.75rem;
  border-top-right-radius: 0.75rem;
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid #ccc;
`;

const AuthorName = styled.span`
  font-size: 0.875rem;
  font-weight: bold;
  color: #333333;
`;

const PostCard = styled.div`
  width: 520px;
  height: 593px;
  background-color: #efe1c6;
  border-radius: 20px;
  position: relative;
  cursor: pointer;
  padding: 1rem;
`;

const CategoryBadge = styled.div``;

const PostContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  padding: 30px;
`;

const PostImageContainer = styled.div`
  position: relative;
  width: 100%;
`;

const PostImage = styled.img`
  width: 100%;
  aspect-ratio: 1 / 1;
  display: flex;
  margin: 0 auto;
  object-fit: cover;
  border-radius: 0.5rem;
  border: 1px solid #ccc;
`;

const LocationOverlay = styled.div`
  color: #333333;
  padding: 0.25rem 0.5rem;
  font-size: 1.125rem;
  font-weight: bold;
`;

const RestaurantInfo = styled.div`
  display: flex;
  flex-direction: column;

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const RestaurantName = styled.h2`
  font-size: 1.4rem;
  font-weight: bold;
  color: #333333;
`;

const PostDate = styled.span`
  font-size: 0.875rem;
  color: #66666e;
  margin-top: 20px;
`;

const FloatingButton = styled.button`
  position: fixed;
  bottom: 100px;
  right: 100px;
  background-color: #95b645;
  color: #faf6ea;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  font-size: 2rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.3);
  transition: background-color 0.2s;
  &:hover {
    background-color: #95b645;
  }
`;
