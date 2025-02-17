import styled from 'styled-components';
import MyProfile from '../components/MyProfile';
import MyPostList from '../components/MyPostList';

const MyPage = () => {
  return (
    <StContainer>
      <MyProfile />
      <MyPostList />
    </StContainer>
  );
};

export default MyPage;

const StContainer = styled.div`
  width: 100%;
  min-width: 1100px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--color-white);
  padding: 172px 0;
  gap: 100px;
`;
