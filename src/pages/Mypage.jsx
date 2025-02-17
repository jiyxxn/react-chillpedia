import styled from 'styled-components';
import MyProfile from '../components/MyProfile';
import MyPostList from '../components/MyPostList';
import { useEffect } from 'react';
import supabase from '../shared/supabaseClient';

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
  padding-top: 172px;
  gap: 100px;
`;
