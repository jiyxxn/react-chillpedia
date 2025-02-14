import React from "react";
import { useState } from "react";
import supabase from "../shared/supabaseClient";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import SignupForm from "../components/SignupForm";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    nickname: "",
  });

  // * state 객체의 set 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // * 유저 정보의 유효성에 따른 에러 메시지를 반환하는 함수 객체
  const userDataValidations = {
    // 이메일 유효성 검사
    email: (value) => {
      if (!value.includes("@") || !value.includes(".")) {
        return "이메일 형식이 올바르지 않습니다.";
      }
    },

    // 비밀번호 유효성 검사
    password: (value) => {
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
      if (!passwordRegex.test(value)) {
        return "비밀번호는 8자 이상, 문자와 숫자를 포함해야 합니다.";
      }
    },

    // 비밀번호 일치 여부 검사
    confirmPassword: (value, { password }) => {
      if (value !== password) {
        return "비밀번호가 일치하지 않습니다.";
      }
    },

    // 닉네임 유효성 여부 검사
    nickname: async (value) => {
      // 형식 검사
      const nicknameRegex = /^[가-힣a-zA-Z0-9]{1,10}$/;
      if (!nicknameRegex.test(value)) {
        return "닉네임은 10자리 이하의 영문, 한글, 숫자만 사용할 수 있습니다.";
      }
      // 중복 검사
      const { data, error } = await supabase
        .from("profiles")
        .select("nickname")
        .eq("nickname", value)
        .maybeSingle();

      if (error) {
        return "알 수 없는 에러입니다.";
      }
      if (data) {
        return "이미 사용 중인 닉네임입니다.";
      }
    },
  };

  // * 회원가입 핸들러 함수
  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      // 유효성 검증
      for (const [type, value] of Object.entries(formData)) {
        const errorMessage = await userDataValidations[type](value, formData);
        if (errorMessage) {
          alert(errorMessage);
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
          case "user_already_exists":
            alert("이미 존재하는 이메일입니다.");
            return;
          case "weak_password":
            alert("보안에 취약한 비밀번호입니다.");
            return;
          default:
            alert(`회원가입 에러 : ${error.code}`);
        }
      } else {
        alert("회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.");
        navigate("/login");
      }

      // 네트워크 관련 에러
    } catch (error) {
      alert(`회원가입 중 오류가 발생했습니다. : ${error.message}`);
    }
  };

  return (
    <StContainer>
      <span className="title">회원가입</span>
      <SignupForm
        formData={formData}
        handleChange={handleChange}
        handleSignup={handleSignup}
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

  .title {
    text-align: center;
    width: 250px;
    padding-bottom: 20px;
    border-bottom: 1px solid var(--color-gray);
    font-size: 26px;
  }
`;
