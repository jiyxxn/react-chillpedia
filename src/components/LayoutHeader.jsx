import styled from 'styled-components';

const LayoutHeader = () => {
  return (
    <HeaderBox>
      <Logo></Logo>
      <AuthButtonGroup>
        <HeaderButton>마이페이지</HeaderButton>
        <HeaderButton>로그인</HeaderButton>
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
`;

const Logo = styled.div`
  width: 250px;
  height: 100px;
  border: 1px solid black;
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
`;

export default LayoutHeader;
