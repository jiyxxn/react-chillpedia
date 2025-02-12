import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import MyPage from '../pages/MyPage';
import PostWrite from '../pages/PostWrite';
import PostDetail from '../pages/PostDetail';
import Signup from '../pages/Signup';
import Login from '../pages/Login';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/mypage" element={<MyPage />}></Route>
        <Route path="/post-write" element={<PostWrite />}></Route>
        <Route path="/post-detail" element={<PostDetail />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
