import {
  StSignupFormBox,
  StSignupInputBox,
  StSubmitButton,
} from '../styles/signup.styled';

/**
 * * 회원가입 폼 컴포넌트
 * @param {Object} formData - 입력한 유저 정보
 *    - { email, password, confirmPassword, nickname }
 * @param {Function} handleInputChange - 객체 set 함수 (e) => Void
 * @param {Function} handleSignup - 회원가입 버튼 핸들러 (e) => Void
 * @param {boolean} isNicknameChecked - 닉네임 중복 검사 여부
 * @param {nicknameCheckHandler} - 닉네임 중복 확인 버튼 핸들러
 */
const SignupForm = ({
  formData,
  handleInputChange,
  handleSignup,
  isNicknameChecked,
  nicknameCheckHandler,
}) => {
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
            onChange={handleInputChange}
            required
          />
          <div className="input-button-box">
            <input
              type="text"
              name="nickname"
              value={formData.nickname}
              onChange={handleInputChange}
              required
            />
            {isNicknameChecked ? (
              <span>사용 가능</span>
            ) : (
              <button onClick={nicknameCheckHandler} type="button">
                중복 확인
              </button>
            )}
          </div>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
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
