import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import MyPage from '../pages/Mypage';
import PostWrite from '../pages/PostWrite';
import PostDetail from '../pages/PostDetail';
import Signup from '../pages/Signup';
import Login from '../pages/Login';
import LayoutHeader from '../components/LayoutHeader';

const Router = () => {
  return (
    <BrowserRouter>
      <LayoutHeader />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/mypage" element={<MyPage />}></Route>
        <Route path="/post-write" element={<PostWrite />}></Route>
        <Route path="/post-detail/:id" element={<PostDetail />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
