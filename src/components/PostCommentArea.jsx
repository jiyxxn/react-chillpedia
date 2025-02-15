import { useContext, useState } from 'react';
// import { UserLoginContext } from '../providers/AuthProvider';

const PostComment = ({
  comments,
  handleAddComment,
  handleUpdateComment,
  handleDeleteComment,
}) => {
  const { isLogin, user } = useContext(UserLoginContext);
  const [commentInputValue, setCommentInputValue] = useState([]); // 댓글 입력 input
  const [isCommentUpdating, setIsCommentUpdating] = useState({});
  const [commentUpdateValue, setCommentUpdateValue] = useState('');

  const onToggleUpdateComment = (e, commentId, comments) => {
    const buttonType = e.target.getAttribute('data-type');

    // '수정' 버튼 클릭 시
    if (buttonType === 'modify') {
      setIsCommentUpdating((prev) => ({ ...prev, [commentId]: true }));
      setCommentUpdateValue(comments); // 노출된 수정 input에 수정 전 텍스트 반영
      e.target.innerText = '완료';
      e.target.setAttribute('data-type', 'complete');
    } else if (buttonType === 'complete') {
      // '완료' 버튼 클릭 시
      handleUpdateComment(commentUpdateValue, commentId);
      setIsCommentUpdating((prev) => ({ ...prev, [commentId]: false }));
      setCommentUpdateValue(''); // 수정이 완료되면 수정 input의 value 초기화
      e.target.innerText = '수정';
      e.target.setAttribute('data-type', 'modify');
    }
  };

  const onDeleteComment = (commentId) => {
    const isConfirmed = confirm('정말 삭제하시겠습니까?');

    isConfirmed ? handleDeleteComment(commentId) : false;
  };

  return (
    <>
      <h2>댓글</h2>
      {isLogin && (
        <div className="inputRow">
          <input
            type="text"
            name=""
            id=""
            value={commentInputValue}
            onChange={(e) => {
              setCommentInputValue(e.target.value);
            }}
          />
          <button
            type="button"
            onClick={() => {
              handleAddComment(commentInputValue);
              setCommentInputValue('');
            }}
          >
            작성
          </button>
        </div>
      )}
      <ul>
        {Array.isArray(comments) &&
          comments.map((comment) => (
            <li key={comment.id}>
              <div className="commentTopRow">
                <p>
                  <img src={comment.profiles.image} />
                  <span>{comment.profiles.nickname}</span>
                </p>
                <div>
                  {comment.writer_id === user.id && (
                    <>
                      <button
                        type="button"
                        data-type="modify"
                        onClick={(e) => {
                          onToggleUpdateComment(
                            e,
                            comment.id,
                            comment.comments,
                          );
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
                  <p>{comment.comments}</p>
                )}
              </div>
            </li>
          ))}
      </ul>
    </>
  );
};

export default PostComment;
