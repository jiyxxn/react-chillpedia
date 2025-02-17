import { useContext, useEffect } from 'react';
import { UserLoginContext } from '../providers/AuthProvider';
import { useNavigate } from 'react-router-dom';

const Mypage = () => {
  const { isLogin } = useContext(UserLoginContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) {
      alert('로그아웃 되었습니다.');
      navigate('/');
    }
  }, [isLogin, navigate]);
  return <div>Mypage</div>;
};

export default Mypage;
