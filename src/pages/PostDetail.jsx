import React, { useEffect, useState } from 'react';
import supabase from '../shared/supabaseClient';
import { useParams } from 'react-router-dom';
import PostDetailCard from '../components/PostDetailCard';
import styled from 'styled-components';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(undefined);
  const { user, setUsers } = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from('posts').select('*');
      if (error) {
        console.log('error=> ', error);
        return;
      }

      const [filteredPost] = data.filter((data) => data.id === Number(id));
      setPost(filteredPost);
    };
    fetchData();
  }, [id]);

  return (
    <StContainer>
      {post ? <PostDetailCard {...post} /> : <div>로딩중</div>}
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
