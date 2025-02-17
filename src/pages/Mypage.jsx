import { useContext } from 'react';
import { UserLoginContext } from '../providers/AuthProvider';

const Mypage = () => {
  const { isLogin, user } = useContext(UserLoginContext);

  console.log('로그인 상태', isLogin);
  console.log('로그인 정보', user);
  return <div>Mypage</div>;
};

export default Mypage;
