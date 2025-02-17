import supabase from '../shared/supabaseClient';
import { useContext, useState, useEffect } from 'react';
import { UserLoginContext } from '../providers/AuthProvider';
import { StCommentSection } from '../styles/detailCard.styled';
import { toast } from 'react-toastify';

const PostComment = ({ postId }) => {
  const { isLogin, user } = useContext(UserLoginContext);

  const [comments, setComments] = useState([]); // 댓글 목록 데이터
  const [commentInputValue, setCommentInputValue] = useState(''); // 댓글 입력 input
  const [commentUpdateValue, setCommentUpdateValue] = useState(''); // 댓글 수정 input
  const [isCommentUpdating, setIsCommentUpdating] = useState({}); // 댓글이 수정중인지 확인, 수정중일 경우 input field 노출

  useEffect(() => {
    /**
     * 댓글 데이터를 가져오는 함수
     * 특정 게시글의 댓글을 불러와 상태를 업데이트
     * @returns {Promise<void>}
     */
    const fetchCommentsData = async () => {
      const { data: commentsData, error } = await supabase
        .from('comments')
        .select('* , profiles(nickname, image)')
        .eq('post_id', postId)
        .order('created_at', { ascending: true }); // 댓글이 생성된 시간을 기준으로 오름차순 정렬

      if (error) {
        console.log('FetchCommentError =====>', error);
        return;
      }

      setComments(commentsData);
    };

    fetchCommentsData();
  }, [postId]);

  /**
   * 댓글을 추가하는 함수
   * 사용자가 입력한 댓글을 데이터베이스에 저장하고 상태를 갱신
   * @returns {Promise<void>}
   */
  const onAddComment = async () => {
    const { data: insertedCommentData, error } = await supabase
      .from('comments')
      .insert({
        content: commentInputValue,
        writer_id: user.id,
        post_id: postId,
      })
      .select('* , profiles(nickname, image)')
      .single(); // 추가된 한 개의 댓글만 가져오기

    if (error) {
      console.log('AddCommentsError =====>', error);
      return;
    }

    setComments([...comments, insertedCommentData]);
    setCommentInputValue('');
    toast.success('댓글이 등록되었습니다.');
  };

  /**
   * 댓글을 삭제하는 함수
   * 사용자가 선택한 댓글을 삭제하고 상태를 갱신
   * @param {number} commentId - 삭제할 댓글의 ID
   * @returns {Promise<void>}
   */
  const onDeleteComment = async (commentId) => {
    const isConfirmed = confirm('정말 삭제하시겠습니까?');

    if (!isConfirmed) {
      return;
    }

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

    toast.success('댓글이 삭제되었습니다.');
  };

  /**
   * 댓글 수정 로직 함수
   * 특정 댓글을 업데이트하고 상태를 갱신
   * @param {number} commentId - 수정할 댓글의 ID
   * @returns {Promise<void>}
   */
  const handleUpdateComment = async (commentId) => {
    const { data: updatedComment, error } = await supabase
      .from('comments')
      .update({
        content: commentUpdateValue, // 입력된 수정 내용 반영
      })
      .eq('id', commentId) // 특정 댓글 선택
      .select('* , profiles(nickname, image)') // 수정된 댓글과 프로필 정보 가져오기
      .single(); // 수정된 한 개의 댓글만 가져오기

    if (error) {
      console.log('UpdateCommentsError =====>', error);
      return;
    }

    // 기존 comments 상태에서 해당 댓글을 수정된 내용으로 업데이트
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === commentId ? updatedComment : comment,
      ),
    );
  };

  /**
   * 댓글 수정||수정 완료 토글 함수
   * 버튼을 클릭하면 수정 모드로 전환하거나, 수정 완료 시 업데이트
   * @param {Event} e - 클릭 이벤트 객체
   * @param {number} commentId - 수정할 댓글의 ID
   * @param {string} comment - 기존 댓글 내용
   * @returns {void}
   */
  const onToggleUpdateComment = async (e, commentId, comment) => {
    const buttonType = e.target.getAttribute('data-type');

    if (buttonType === 'modify') {
      // '수정' 버튼 클릭 시
      setIsCommentUpdating((prev) => ({ ...prev, [commentId]: true }));
      setCommentUpdateValue(comment); // 기존 댓글을 입력 필드에 설정
      e.target.innerText = '완료';
      e.target.setAttribute('data-type', 'complete');
    } else if (buttonType === 'complete') {
      // '완료' 버튼 클릭 시
      await handleUpdateComment(commentId);
      setIsCommentUpdating((prev) => ({ ...prev, [commentId]: false }));
      setCommentUpdateValue(''); // 입력 필드 초기화
      e.target.innerText = '수정';
      e.target.setAttribute('data-type', 'modify');
      toast.success('댓글이 수정되었습니다.');
    }
  };

  return (
    <StCommentSection>
      <h2>댓글</h2>
      {isLogin && (
        <div className="inputRow">
          <input
            type="text"
            value={commentInputValue}
            onChange={(e) => {
              setCommentInputValue(e.target.value);
            }}
          />
          <button type="button" onClick={onAddComment}>
            작성
          </button>
        </div>
      )}
      {comments.length === 0 ? (
        <p className="noComment">작성된 댓글이 없습니다.</p>
      ) : (
        <ul>
          {comments.map((comment) => (
            <li key={comment.id}>
              <div className="commentTopRow">
                <p>
                  <img src={comment.profiles.image} alt="프로필 이미지" />
                  <span>{comment.profiles.nickname}</span>
                </p>
                <div>
                  {isLogin && comment.writer_id === user.id && (
                    <>
                      <button
                        type="button"
                        data-type="modify"
                        onClick={(e) => {
                          onToggleUpdateComment(e, comment.id, comment.content);
                        }}
                      >
                        수정
                      </button>
                      <button
                        type="button"
                        onClick={() => onDeleteComment(comment.id)}
                      >
                        삭제
                      </button>
                    </>
                  )}
                </div>
              </div>
              <div className="commentBottomRow">
                {isCommentUpdating[comment.id] ? (
                  <input
                    type="text"
                    value={commentUpdateValue}
                    onChange={(e) => setCommentUpdateValue(e.target.value)}
                  ></input>
                ) : (
                  <p>{comment.content}</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </StCommentSection>
  );
};

export default PostComment;
