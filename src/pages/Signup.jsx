import React from 'react';
import { useState } from 'react';
import supabase from '../shared/supabaseClient';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const navigate = useNavigate();

  const handleSingup = async (e) => {
    e.preventDefault();

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            nickname,
          },
        },
      });

      if (error) {
        console.log(error.name);
        switch (error.code) {
          case 'user_already_exists':
            alert('이미 존재하는 이메일입니다.');
            return;
          case 'weak_password':
            alert('보안에 취약한 비밀번호입니다.');
            return;
          default:
            alert(`회원가입 에러 : ${error.code}`);
        }
      } else {
        alert('회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.');
        navigate('/login');
      }
    } catch (error) {
      alert(`회원가입 에러 : ${error.message}`);
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
        <input
          type="text"
          placeholder="닉네임"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          required
        />
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
};

export default Signup;
