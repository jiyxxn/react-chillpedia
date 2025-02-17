import { useState } from 'react';
import styled from 'styled-components';
import supabase from '../shared/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.warning('이메일과 비밀번호를 입력해주세요.');
      return;
    }

    // 이메일 형식 확인 (정규식 사용)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      toast.warning('올바른 이메일 형식을 입력해주세요.');
      return;
    }

    if (password.length < 8) {
      toast.warning('비밀번호는 최소 8자 이상이어야 합니다.');
      return;
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.error('이메일 또는 비밀번호가 잘못되었습니다.');
        return;
      }

      if (data?.user) {
        toast.success('로그인이 완료되었습니다.');
        navigate('/');
      } else {
        toast.warning('회원 정보가 존재하지 않습니다.');
      }
    } catch (err) {
      console.error('오류 발생:', err);
      toast.error('오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    }
  };

  return (
    <LoginContainer>
      <h2>로그인</h2>
      <LoginBox onSubmit={handleLogin}>
        <AuthContainer>
          <AuthAddress>
            <span>아이디(이메일)</span>
            <Divider />
            <span>비밀번호</span>
          </AuthAddress>
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
        </AuthContainer>
        <LoginButtonGroup>
          <button className="login-button" type="submit">
            로그인
          </button>
          <button
            className="signup-button"
            onClick={(e) => {
              e.preventDefault();
              navigate('/signup');
            }}
          >
            회원가입
          </button>
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
  min-height: 100vh;
  padding: 200px 0 100px;
  background-color: #faf6ea;
  h2 {
    font-size: 25px;
    margin-bottom: 35px;
    font-weight: bold;
  }
`;

const LoginBox = styled.form`
  display: flex;
  flex-direction: column;
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
  span {
    font-size: 18px;
    font-weight: bold;
  }
`;

const AuthInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: 34px;

  input {
    width: 480px;
    height: 50px;
    border: 1px solid black;
    background-color: #faf6ea;
    border-radius: 50px;
    padding-left: 25px;
  }
`;

const Divider = styled.hr`
  width: 100%;
  border: none;
  border-top: 2px solid #66666e;
  margin: 1px 0;
`;

const LoginButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 25px;
  justify-content: space-between;
  width: 100%;
  .login-button {
    width: 470px;
    height: 80px;
    font-weight: bold;
    font-size: 24px;
    border: 1px solid #66666e;
    border-radius: 20px;
    background-color: #efe1c6;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  }
  .signup-button {
    width: 470px;
    border: 1px solid #66666e;
    font-weight: bold;
    font-size: 24px;
    border-radius: 20px;
    background-color: #faf6ea;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  }
`;
export default Login;
