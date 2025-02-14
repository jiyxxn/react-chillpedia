import FoodCategoryTag from './foodCategoryTag';
import { useEffect, useState, useContext } from 'react';
import supabase from '../shared/supabaseClient';
import { UserProfileContext } from '../providers/UserProfilesProvider';
import {
  StDetailSection,
  StCommentSection,
  StDetailBox,
} from '../styles/detailCard.styled';
import PostCommentArea from './PostCommentArea';
import { UserLoginContext } from '../providers/AuthProvider';

const PostDetailCard = (post) => {
  const allUserProfiles = useContext(UserProfileContext);
  const { user } = useContext(UserLoginContext);
  const [writer, setWriter] = useState(null); // 게시글 작성자
  const [comments, setComments] = useState([]); // 댓글 목록 데이터

  useEffect(() => {
    // 유저 프로필값이 들어왔을 때
    if (allUserProfiles.length) {
      setWriter(
        allUserProfiles.find((data) => data.user_id === post.writer_id),
      );
    }
  }, [allUserProfiles, post.writer_id]);

  useEffect(() => {
    const fetchCommentsData = async () => {
      // 댓글 데이터 불러오기
      const { data: commentsData, error } = await supabase
        .from('comments')
        .select('* , profiles(nickname, image)')
        .eq('post_id', post.id)
        .order('created_at', { ascending: true }); // 댓글이 생성된 시간을 기준으로 오름차순 정렬

      if (error) {
        console.log('FetchCommentError =====>', error);
        return;
      }

      setComments(commentsData);
    };

    fetchCommentsData();
  }, [allUserProfiles, post.id]);

  // * 댓글 추가
  const handleAddComment = async (commentInputValue) => {
    const { data: insertedCommentsData, error } = await supabase
      .from('comments')
      .insert({
        comments: commentInputValue,
        writer_id: user.id,
        post_id: post.id,
      })
      .select('* , profiles(nickname, image)')
      .single(); // 추가된 한 개의 댓글만 가져오기

    if (error) {
      console.log('AddCommentsError =====>', error);
      return;
    }

    setComments([...comments, insertedCommentsData]);
  };

  // * 댓글 수정
  const handleUpdateComment = async (commentInputValue, commentId) => {
    const { data: updatedComments, error } = await supabase
      .from('comments')
      .update({
        comments: commentInputValue,
      })
      .eq('id', commentId) //
      .select('* , profiles(nickname, image)')
      .single(); // 수정된 한 개의 댓글만 가져오기

    if (error) {
      console.log('UpdateCommentsError =====>', error);
      return;
    }

    // comments 상태에 update 사항 반영
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === commentId ? updatedComments : comment,
      ),
    );
  };

  // * 댓글 삭제
  const handleDeleteComment = async (commentId) => {
    const { error } = await supabase
      .from('comments')
      .delete()
      .eq('id', commentId);

    if (error) {
      console.log('DeleteCommentsError =====>', error);
      return;
    }
    setComments((prevComments) =>
      prevComments.filter((comment) => comment.id !== commentId),
    );
  };

  return (
    <>
      <StDetailSection>
        <div className="userRow">
          {writer && (
            <div>
              <img
                src={writer.image}
                className="userProfile"
                alt="작성자 프로필"
              />
              <span>{writer.nickname}</span>
            </div>
          )}

          {/* <div className="btn-row"></div> */}
        </div>
        <StDetailBox>
          <div className="detail-left">
            <img src={post.image_url} alt="음식 이미지" />
            <div>
              <h2>{post.restaurant_name}</h2>
              <span>{post.restaurant_location}</span>
            </div>
            <span>{post.created_at.split('T')[0]}</span>
          </div>
          <ul>
            <li>
              <h3>추천 메뉴</h3>
              <p>{post.recommended_menu}</p>
            </li>
            <li>
              <h3>가격대</h3>
              <p>{post.price_range}</p>
            </li>
            <li>
              <h3>주소</h3>
              <p>{post.restaurant_address}</p>
            </li>
            <li>
              <h3>내용</h3>
              <p>{post.content}</p>
            </li>
          </ul>
          <FoodCategoryTag category={post.category} />
        </StDetailBox>
      </StDetailSection>
      <StCommentSection>
        <PostCommentArea
          comments={comments}
          handleAddComment={handleAddComment}
          handleUpdateComment={handleUpdateComment}
          handleDeleteComment={handleDeleteComment}
        />
      </StCommentSection>
    </>
  );
};

export default PostDetailCard;
