import { useContext, useState } from "react";
import { UserLoginContext } from "../providers/AuthProvider";

const PostComment = ({ comments, handleAddComment }) => {
  const { isLogin, user } = useContext(UserLoginContext);
  const [commentInputValue, setCommentInputValue] = useState([]); // 댓글 입력 input

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
              setCommentInputValue("");
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
                  <img src={comment.writer_image} />
                  <span>{comment.writer_nickname}</span>
                </p>
                <div>
                  <button type="button">수정</button>
                  <button type="button">삭제</button>
                </div>
              </div>
              <p className="commentBottomRow">{comment.comments}</p>
            </li>
          ))}
      </ul>
    </>
  );
};

export default PostComment;
