import { useContext } from 'react';
import PostList from '../components/PostList';
import { UserLoginContext } from '../providers/AuthProvider';

const Home = () => {
  const { isLogin, user } = useContext(UserLoginContext);

  console.log('로그인 상태', isLogin);
  console.log('로그인 정보', user);
  return (
    <>
      <PostList />
    </>
  );
};

export default Home;
