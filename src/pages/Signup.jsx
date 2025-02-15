import React from 'react';
import { useState } from 'react';
import supabase from '../shared/supabaseClient';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import SignupForm from '../components/SignupForm';
import { toast } from 'react-toastify';

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

  // * 유저 정보의 유효성에 따른 에러 메시지를 반환하는 함수 객체
  const userDataValidations = {
    // 이메일 유효성 검사
    email: (value) => {
      if (!value.includes('@') || !value.includes('.')) {
        return '이메일 형식이 올바르지 않습니다.';
      }
    },

    // 비밀번호 유효성 검사
    password: (value) => {
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
      if (!passwordRegex.test(value)) {
        return '비밀번호는 8자 이상의 문자와 숫자를 포함해야 합니다.';
      }
    },

    // 비밀번호 일치 여부 검사
    confirmPassword: (value, { password }) => {
      if (value !== password) {
        return '비밀번호가 일치하지 않습니다.';
      }
    },

    // 닉네임 유효성 여부 검사
    nickname: async (value) => {
      // 형식 검사
      const nicknameRegex = /^[가-힣a-zA-Z0-9]{1,10}$/;
      if (!nicknameRegex.test(value)) {
        return '닉네임은 10자리 이하의 영문, 한글, 숫자만 사용할 수 있습니다.';
      }
      // 중복 검사
      const { data, error } = await supabase
        .from('profiles')
        .select('nickname')
        .eq('nickname', value)
        .maybeSingle();

      if (error) {
        return '알 수 없는 에러입니다.';
      }
      if (data) {
        return '이미 사용 중인 닉네임입니다.';
      }
    },
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
