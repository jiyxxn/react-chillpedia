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

    if (!email || !password) {
      alert('이메일과 비밀번호를 입력해주세요.');
      return;
    }

    // 이메일 형식 확인 (정규식 사용)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert('올바른 이메일 형식을 입력해주세요.');
      return;
    }

    if (password.length < 6) {
      alert('비밀번호는 최소 6자 이상이어야 합니다.');
      return;
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        alert('이메일 또는 비밀번호가 잘못되었습니다.');
        return;
      }

      if (data?.user) {
        alert('로그인이 완료되었습니다.');
        navigate('/');
      } else {
        alert('회원 정보가 존재하지 않습니다.');
      }
    } catch (err) {
      console.error('오류 발생:', err);
      alert('오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    }
  };

  return (
    <LoginContainer>
      <LoginTitle>로그인</LoginTitle>
      <LoginBox onSubmit={handleLogin}>
        <AuthContainer>
          <AuthAddress>
            <AuthSpan>아이디(이메일)</AuthSpan>
            <Divider />
            <AuthSpan>비밀번호</AuthSpan>
          </AuthAddress>
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
        </AuthContainer>
        <LoginButtonGroup>
          <LoginButton type="submit">로그인</LoginButton>
          <SignUpButton
            onClick={(e) => {
              e.preventDefault();
              navigate('/signup');
            }}
          >
            회원가입
          </SignUpButton>
        </LoginButtonGroup>
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
  padding: 70px;
  display: flex;
  flex-direction: column;
`;
const LoginTitle = styled.h2`
  font-size: 25px;
  margin-bottom: 35px;
  font-weight: bold;
`;

const AuthContainer = styled.div`
  width: 980px;
  height: 380px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 1px solid #66666e;
  justify-content: space-around;
  border-radius: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
`;

const AuthAddress = styled.div`
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
  width: 380px;
  height: 50px;
  border: 1px solid black;
  border-radius: 50px;
  padding-left: 25px;
`;

const LoginButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 25px;
  justify-content: space-between;
  width: 100%;
`;

const LoginButton = styled.button`
  width: 470px;
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
  width: 470px;
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
