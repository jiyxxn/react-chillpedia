import supabase from '../shared/supabaseClient';

// * 유저 정보의 유효성에 따른 에러 메시지를 반환하는 함수 객체
export const userDataValidations = {
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
