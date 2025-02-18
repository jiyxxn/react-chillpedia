import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserLoginContext } from '../providers/AuthProvider';
import { StMyPost } from '../styles/myPage.styled';
import supabase from '../shared/supabaseClient';
import PostPreviewCard from './PostPreviewCard';
import { toast } from 'react-toastify';

const MyPostList = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserLoginContext);
  const [myPosts, setMyPosts] = useState(null);

  useEffect(() => {
    // * 내 게시물 리스트를 가져오는 함수
    const fetchPosts = async () => {
      try {
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .eq('writer_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setMyPosts(data);
      } catch (error) {
        toast.warning('게시물을 가져오는데 실패했습니다.');
        console.log('게시물 fetch 오류', error);
      }
    };
    // 유저 정보가 있을 때만 fetch
    if (user) {
      fetchPosts();
    }
  }, [user?.id]);

  // * 수정 버튼 클릭 핸들러
  const postEditButtonHandler = (post) => {
    navigate(`/post-write/${post.id}`);
  };

  // * 포스트 삭제 함수
  const deletePost = async (id) => {
    try {
      await supabase.from('posts').delete().eq('id', id);
    } catch (error) {
      throw error;
    }
  };

  // * 이미지 삭제 함수
  const deleteImage = async (imageUrl) => {
    const imagePath = import.meta.env.VITE_IMAGE_URL_BASE;
    const imageName = imageUrl.split(imagePath).pop();
    try {
      const { error } = await supabase.storage
        .from('post-images')
        .remove([imageName]);
      if (error) {
        throw error;
      }
    } catch (error) {
      throw error;
    }
  };

  // * 삭제 버튼 클릭 핸들러
  const postDeleteButtonHandler = async (postToDelete) => {
    const result = confirm('정말 삭제하시겠습니까?');
    if (!result) {
      return;
    }

    try {
      await deletePost(postToDelete.id); // 포스트 삭제
      await deleteImage(postToDelete.image_url); // 이미지 삭제
    } catch (error) {
      toast.warning('게시물 삭제에 실패했습니다.');
      console.log('게시물 삭제 오류', error);
      return;
    }

    // myPosts에 반영
    setMyPosts(myPosts.filter((post) => post.id !== postToDelete.id));
  };

  // 내 게시글을 불러오기 전까지 컴포넌트 렌더링 X
  if (!myPosts) {
    return <div>내 게시물을 로딩중입니다...</div>;
  }

  return (
    <StMyPost>
      <h2>내가 작성한 게시글</h2>
      {myPosts.length === 0 ? (
        <span className="emptyPostList">작성한 게시글이 없습니다.</span>
      ) : (
        <ul>
          {myPosts.map((post) => (
            <li
              key={post.id}
              onClick={() => navigate(`/post-detail/${post.id}`)}
            >
              <PostPreviewCard
                post={post}
                postEditButtonHandler={postEditButtonHandler}
                postDeleteButtonHandler={postDeleteButtonHandler}
              />
            </li>
          ))}
        </ul>
      )}
    </StMyPost>
  );
};

export default MyPostList;
