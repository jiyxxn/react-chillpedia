import styled from 'styled-components';
import MyProfile from '../components/MyProfile';

const MyPage = () => {
  return (
    <StContainer>
      <MyProfile />
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
  padding-top: 172px;
`;
