import {
  StSignupFormBox,
  StSignupInputBox,
  StSubmitButton,
} from '../styles/signup.styled';

/**
 * * 회원가입 폼 컴포넌트
 * @param {Object} formData - 입력한 유저 정보
 *    - { email, password, confirmPassword, nickname }
 * @param {Function} handleChange - 객체 set 함수 (e) => Void
 * @param {Function} handleSignup - 회원가입 버튼 핸들러 (e) => Void
 */
const SignupForm = ({ formData, handleChange, handleSignup }) => {
  return (
    <StSignupFormBox>
      <StSignupInputBox>
        <div className="input-type">
          <span>아이디(이메일)</span>
          <span>닉네임</span>
          <span>비밀번호</span>
          <span>비밀번호 확인</span>
        </div>
        <form id="signupForm" onSubmit={handleSignup}>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="nickname"
            value={formData.nickname}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </form>
      </StSignupInputBox>
      <StSubmitButton type="submit" form="signupForm">
        작성 완료
      </StSubmitButton>
    </StSignupFormBox>
  );
};

export default SignupForm;
