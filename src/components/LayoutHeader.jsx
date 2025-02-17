import { useContext } from 'react';
import styled from 'styled-components';
import { UserLoginContext } from '../providers/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import supabase from '../shared/supabaseClient';

const LayoutHeader = () => {
  const { isLogin } = useContext(UserLoginContext);
  const navigate = useNavigate();

  const handleMypageClick = () => {
    if (isLogin) {
      navigate('/mypage');
    } else {
      alert('로그인이 필요합니다.');
      navigate('/login');
    }
  };

  const handleAuthButtonClick = async () => {
    if (isLogin) {
      await supabase.auth.signOut();
    } else {
      navigate('/login');
    }
  };

  return (
    <HeaderBox>
      <Logo to={'/'} />
      <AuthButtonGroup>
        <HeaderButton onClick={handleMypageClick}>
          마이페이지
          <MyLogo src="/Mypage.png" />
        </HeaderButton>
        <HeaderButton onClick={handleAuthButtonClick}>
          {isLogin ? (
            <>
              로그아웃 <AuthLogo src="/Logout.png" />
            </>
          ) : (
            <>
              로그인 <AuthLogo src="/Login.png" />
            </>
          )}
        </HeaderButton>
      </AuthButtonGroup>
    </HeaderBox>
  );
};

const HeaderBox = styled.header`
  width: 100%;
  height: 160px;
  background-color: #efe1c6;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 60px;
  align-items: center;
  position: fixed;
`;

const Logo = styled(Link)`
  width: 250px;
  height: 100px;
  background-image: url('/ChillLogo.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  display: block;
`;

const AuthButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

const HeaderButton = styled.button`
  width: 140px;
  height: 50px;
  border: 1px solid black;
  border-radius: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;

const MyLogo = styled.img`
  width: 18px;
  height: 21px;
`;

const AuthLogo = styled.img`
  width: 24px;
  height: 19px;
`;

export default LayoutHeader;
