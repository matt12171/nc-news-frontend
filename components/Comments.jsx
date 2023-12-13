import { useParams } from "react-router-dom";
import { getComments } from "./axios";
import { useEffect, useState } from "react";
import { postComment } from "./axios";
export function timeConvert(datePosted) {
  const old = new Date(`${datePosted}`);
  const today = new Date();

  const differenceInSeconds = Math.floor((today - old) / 1000);

  const minutesDifference = Math.floor(differenceInSeconds / 60);

  if (minutesDifference < 60) {
    return `${minutesDifference} minute${
      minutesDifference !== 1 ? "s" : ""
    } ago`;
  } else if (minutesDifference < 1440) {
    const hoursDifference = Math.floor(minutesDifference / 60);
    return `${hoursDifference} hour${hoursDifference !== 1 ? "s" : ""} ago`;
  } else {
    const daysDifference = Math.floor(minutesDifference / 1440);
    if (daysDifference < 365) {
      const yearsDifference = Math.floor(daysDifference / 365);
      return `${daysDifference} day${daysDifference !== 1 ? "s" : ""} ago`;
    } else {
      const yearsDifference = Math.floor(daysDifference / 365);
      return `${yearsDifference} year${yearsDifference !== 1 ? "s" : ""} ago`;
    }
  }
}

export const Comments = () => {
  const { article_id } = useParams();
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [commentCheck, setCommentCheck] = useState(false);
  const [commentAdded, setCommentAdded] = useState(false);
  const [commentLoading, setCommentLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (event.target[0].value.length === 0) {
      return Toastify({
        text: "Comment cannot be empty!",
        duration: 4000,
      }).showToast();
    }
    setCommentLoading(true);
    postComment(article_id, event.target[0].value)
      .then((response) => {
        setCommentAdded(true);
        setCommentCheck(true);
        setCommentLoading(false);
      })
      .catch((err) => {
        Toastify({
          text: "Unable to post",
          duration: 4000,
        }).showToast();
      });
    event.target[0].value = "";
  };

  useEffect(() => {
    getComments(article_id).then((response) => {
      setComments(response.data.comments);
      setIsLoading(false);
    });
  }, [commentAdded]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3 className="comment-title">Comments</h3>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            name="name"
            placeholder="Write a comment..."
            id="textboxid"
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
      {commentCheck ? <p>Comment Added!</p> : ""}
      {commentLoading ? <p>Comment loading...</p> : ""}
      <ul>
        {comments.map((comment, index) => {
          return (
            <li key={index}>
              <p>{comment.body}</p>
              <div className="bottom-comments">
                <p>
                  Submitted by <b>{comment.author}</b>{" "}
                  {timeConvert(comment.created_at)}
                </p>
                <p>{comment.votes} votes</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
