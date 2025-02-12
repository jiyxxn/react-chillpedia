import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import MemberLogin from '../pages/MemberLogin';
import MemberJoin from '../pages/MemberJoin';
import MyPage from '../pages/MyPage';
import PostWrite from '../pages/PostWrite';
import PostDetail from '../pages/PostDetail';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<MemberLogin />}></Route>
        <Route path="/join" element={<MemberJoin />}></Route>
        <Route path="/mypage" element={<MyPage />}></Route>
        <Route path="/post-write" element={<PostWrite />}></Route>
        <Route path="/post-detail" element={<PostDetail />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
