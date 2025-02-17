import styled from 'styled-components';
import supabase from '../shared/supabaseClient';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostDetailCard from '../components/PostDetailCard';
import PostCommentCard from '../components/PostCommentCard';

const PostDetail = () => {
  // * params에 해당하는 게시글 호출
  const { id } = useParams();
  const [post, setPost] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
    const { data, error } = await supabase
        .from('posts')
        .select('*, profiles(nickname, image)');

      if (error) {
        console.log('error=> ', error);
        return;
      }

      // 게시글 ID가 params로 받은 ID와 일치하는 게시글만 필터링
      const filteredPost = data.find((data) => data.id === Number(id));

      // 필터링된 게시글 저장
      setPost(filteredPost);
    };
    fetchData();
  }, [id]);

  return (
    <StContainer>
      {post ? (
        <>
          <PostDetailCard {...post} />
          <PostCommentCard postId={post.id} />
        </>
      ) : (
        <div>로딩중</div>
      )}
    </StContainer>
  );
};

export default PostDetail;

const StContainer = styled.div`
  width: 100%;
  min-width: 1100px;
  min-height: 100vh;
  display: flex;
  flex-flow: column nowrap;
  gap: 50px;
  align-items: center;
  justify-content: center;
  background-color: var(--color-white);
  padding: 200px 0;
`;
