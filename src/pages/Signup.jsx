import React from "react";
import { useState } from "react";
import supabase from "../shared/supabaseClient";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSingup = async (e) => {
    e.preventDefault();

    try {
      await supabase.auth.signUp({
        email,
        password,
      });
      alert("회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.");
      navigate("/login");
    } catch (error) {
      alert("회원가입 오류");
      console.error("회원가입 오류:", error.message);
    }
  };

  return (
    <div>
      <p>회원가입</p>
      <form onSubmit={handleSingup}>
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
};

export default Signup;
