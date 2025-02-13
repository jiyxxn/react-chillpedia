import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import supabase from '../shared/supabaseClient';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await supabase.auth.signInWithPassword({ email, password });
      alert('로그인이 완료되었습니다. 홈 페이지로 이동합니다.');
      navigate('/');
    } catch (error) {
      console.error('로그인 오류:', error);
    }
  };

  return (
    <LoginContainer>
      <LoginTitle>로그인</LoginTitle>
      <div>
        <LoginBox onSubmit={handleLogin}>
          <AuthContainer>
            <AuthSpan>아이디(이메일)</AuthSpan>
            <Divider />
            <AuthSpan>비밀번호</AuthSpan>
          </AuthContainer>
          <AuthInput>
            <LoginInput
              type="email"
              value={email}
              placeholder="이메일"
              onChange={(e) => setEmail(e.target.value)}
            />
            <LoginInput
              type="password"
              value={password}
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </AuthInput>
        </LoginBox>

        <LoginButtonGroup>
          <LoginButton type="submit">로그인</LoginButton>
          <SignUpButton>회원가입</SignUpButton>
        </LoginButtonGroup>
      </div>
    </LoginContainer>
  );
};

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const LoginBox = styled.form`
  width: 980px;
  height: 380px;
  padding: 70px;
  border: 1px solid #66666e;
  border-radius: 20px;
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  align-items: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
`;
const LoginTitle = styled.h2`
  font-size: 25px;
  margin-bottom: 35px;
  font-weight: bold;
`;

const AuthContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 30px;
  background-color: #efe1c6;
  width: 300px;
  height: 166px;
  border: none;
  border-radius: 30px;
  gap: 30px;
  text-align: center;
  align-items: center;
  text-align: center;
`;

const AuthInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: 33px;
`;

const AuthSpan = styled.span`
  font-size: 18px;
  font-weight: bold;
`;

const Divider = styled.hr`
  width: 100%;
  border: none;
  border-top: 2px solid #66666e;
  margin: 0.5px 0;
`;

const LoginInput = styled.input`
  width: 500px;
  height: 50px;
  border: 1px solid black;
  border-radius: 50px;
  text-align: center;
`;

const LoginButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 25px;
  justify-content: space-between;
  width: 100%;
`;

const LoginButton = styled.button`
  width: 48%;
  height: 80px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  border: 1px solid #66666e;
  border-radius: 20px;
  background-color: #efe1c6;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
`;

const SignUpButton = styled.button`
  width: 48%;
  height: 80px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  border: 1px solid #66666e;
  border-radius: 20px;
  background-color: #faf6ea;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
`;
export default Login;
