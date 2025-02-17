import React from 'react';
import { useState } from 'react';
import supabase from '../shared/supabaseClient';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import SignupForm from '../components/SignupForm';
import { toast } from 'react-toastify';
import { userDataValidations } from '../utils/userDataValidations';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    nickname: '',
  });
  const [isNicknameChecked, setNicknameChecked] = useState(false);

  // * state 객체의 set 핸들러
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (name === 'nickname') {
      setNicknameChecked(false);
    }
  };

  // * 닉네임 중복 확인 버튼 핸들러 함수
  const nicknameCheckHandler = async () => {
    const errorMessage = await userDataValidations.nickname(formData.nickname);
    if (errorMessage) {
      toast.warning(errorMessage);
    } else {
      setNicknameChecked(true);
    }
  };

  // * 회원가입 핸들러 함수
  const handleSignup = async (e) => {
    e.preventDefault();

    // 닉네임 중복 확인을 통과했을 경우에만 넘어가도록 하기
    if (!isNicknameChecked) {
      toast.warning('닉네임 중복 확인을 해주세요.');
      return;
    }

    try {
      // 유효성 검증
      for (const [type, value] of Object.entries(formData)) {
        const errorMessage = await userDataValidations[type](value, formData);
        if (errorMessage) {
          toast.warning(errorMessage);
          return;
        }
      }

      // 회원가입
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            nickname: formData.nickname,
          },
        },
      });

      // supabase 인증 관련 에러
      if (error) {
        switch (error.code) {
          case 'user_already_exists':
            toast.warning('이미 존재하는 이메일입니다.');
            return;
          case 'weak_password':
            toast.warning('보안에 취약한 비밀번호입니다.');
            return;
          default:
            toast.warning(`회원가입 에러 : ${error.code}`);
        }
      } else {
        alert('회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.');
        navigate('/login');
      }

      // 네트워크 관련 에러
    } catch (error) {
      toast.warning(`회원가입 중 오류가 발생했습니다. : ${error.message}`);
    }
  };

  return (
    <StContainer>
      <h2>회원가입</h2>
      <SignupForm
        formData={formData}
        handleInputChange={handleInputChange}
        handleSignup={handleSignup}
        isNicknameChecked={isNicknameChecked}
        nicknameCheckHandler={nicknameCheckHandler}
      />
    </StContainer>
  );
};

export default Signup;

const StContainer = styled.div`
  width: 100%;
  min-width: 1100px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--color-white);
  gap: 100px;

  h2 {
    text-align: center;
    width: 250px;
    padding-bottom: 20px;
    border-bottom: 1px solid var(--color-gray);
    font-size: 26px;
  }
`;
