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
      <LoginBox onSubmit={handleLogin}>
        <AuthContainer>
          <span>아이디(이메일)</span>
          <span>비밀번호</span>
        </AuthContainer>
        <AuthInput>
          <input
            type="email"
            value={email}
            placeholder="이메일"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            value={password}
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </AuthInput>
        <button type="submit">로그인</button>
        <button>회원가입</button>
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
`;

const LoginBox = styled.form`
  width: 980px;
  height: 380px;
  border: 1px solid black;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
`;
const LoginTitle = styled.h2`
  font-size: 25px;
  margin-bottom: 35px;
  font-weight: bold;
`;

const AuthContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 18px;
  font-weight: bold;
`;

const AuthInput = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: bold;
`;

export default Login;
