import React from 'react';
import styled from 'styled-components';

const Login = () => {
  return (
    <LoginContainer>
    <LoginTitle>로그인</LoginTitle>
    <LoginBox>
    <AuthContainer>
      <span>아이디(이메일)</span>
      <span>비밀번호</span>
    </AuthContainer>
    <AuthInput>
      <input type="email" placeholder='이메일' />
      <input type="password" placeholder='password' />
    </AuthInput>
    </LoginBox>
    </LoginContainer>
  );
};

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

const LoginBox = styled.form`
  width: 980px;
  height: 380px;
  border: 1px solid black;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
`
const LoginTitle = styled.h2`
  font-size: 25px;
  margin-bottom: 35px;
  font-weight: bold;
`

const AuthContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 18px;
  font-weight: bold;
`

const AuthInput = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: bold;
`

export default Login;
