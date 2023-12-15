import { useParams } from "react-router-dom";
import { getComments, patchCommentVote } from "./axios";
import { useContext, useEffect, useState } from "react";
import { postComment } from "./axios";
import { UsernameContext } from "../context/UsernameContext";
import { deleteComment } from "./axios";
import { timeConvert } from "../utils";
import { Card, Button } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";

const votedPosts = [];

export const Comments = (props) => {
  const { article_id } = useParams();
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [commentCheck, setCommentCheck] = useState(false);
  const [commentAdded, setCommentAdded] = useState(false);
  const [commentLoading, setCommentLoading] = useState(false);
  const [commentDeleting, setCommentDeleting] = useState(false);
  const [commentDeleted, setCommentDeleted] = useState(false);
  const { user, setUser } = useContext(UsernameContext);
  const [topClickedArrowIndex, setTopClickedArrowIndex] = useState(null);
  const [bottomClickedArrowIndex, setBottomClickedArrowIndex] = useState(null);

  const arrowClicked = (index, direction) => {
    for (let i = 0; i < votedPosts.length; i++) {
      if (comments[index].comment_id === votedPosts[i]) {
        return Toastify({
          text: "Already voted!",
          duration: 4000,
        }).showToast();
      }
    }
    if (direction === "up") {
      setTopClickedArrowIndex(topClickedArrowIndex === index ? null : index);
      setBottomClickedArrowIndex(null);
      comments[index].votes += 1;
      patchCommentVote(comments[index].comment_id, 1)
        .then((response) => {
          console.log("Vote added");
        })
        .catch((err) => {
          Toastify({
            text: "Vote did not update",
            duration: 4000,
          }).showToast();
        });
      votedPosts.push(comments[index].comment_id);
    } else if (direction === "down") {
      setBottomClickedArrowIndex(
        bottomClickedArrowIndex === index ? null : index
      );
      setTopClickedArrowIndex(null);
      comments[index].votes -= 1;
      patchCommentVote(comments[index].comment_id, -1)
        .then((response) => {
          console.log("Vote added");
        })
        .catch((err) => {
          Toastify({
            text: "Vote did not update",
            duration: 4000,
          }).showToast();
        });
      votedPosts.push(comments[index].comment_id);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setCommentDeleted(false);
    setCommentCheck(false);
    if (event.target[0].value.length === 0) {
      return Toastify({
        text: "Comment cannot be empty!",
        duration: 4000,
      }).showToast();
    }
    setCommentLoading(true);
    postComment(article_id, event.target[0].value, user)
      .then((response) => {
        commentAdded ? setCommentAdded(false) : setCommentAdded(true);
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

  const handleDelete = (comment_id) => {
    setCommentDeleted(false);
    setCommentCheck(false);
    setCommentDeleting(true);
    deleteComment(comment_id)
      .then(() => {
        setComments((comments) => {
          return comments.filter((comment) => {
            return comment.comment_id !== comment_id;
          });
        });
        setCommentDeleting(false);
        setCommentDeleted(true);
      })
      .catch((err) => {
        setCommentDeleting(false);
        Toastify({
          text: "Unable to delete",
          duration: 4000,
        }).showToast();
      });
  };

  useEffect(() => {
    getComments(article_id)
      .then((response) => {
        setComments(response.data.comments);
        setIsLoading(false);
      })
      .catch((err) => {
        props.setError({ err });
      });
  }, [commentAdded]);

  if (isLoading) {
    return (
      <Spinner animation="border" role="status" style={{ marginTop: "300px" }}>
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  return (
    <div className="comment-section">
      <h3 className="comment-title">Comments</h3>
      <form onSubmit={handleSubmit} className="comment-input">
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
      {commentDeleting ? <p>Comment Deleting...</p> : ""}
      {commentDeleted ? <p>Comment Deleted!</p> : ""}
      {commentCheck ? <p>Comment Added!</p> : ""}
      {commentLoading ? <p>Comment loading...</p> : ""}
      <ul className="list-of-comments">
        {comments.map((comment, index) => {
          return (
            <Card
              key={index}
              className="mb-3"
              style={{ maxWidth: "500px", minWidth: "420px" }}
            >
              <Card.Body>
                <Card.Text>{comment.body}</Card.Text>
                {user === comment.author && (
                  <Button
                    variant="dark"
                    style={{ height: "30px", fontSize: "14px" }}
                    className="comment-button"
                    onClick={() => handleDelete(comment.comment_id)}
                  >
                    Delete
                  </Button>
                )}
              </Card.Body>
              <Card.Footer className="comment-footer">
                <small className="text-muted">
                  Submitted by <b>{comment.author}</b>{" "}
                  {timeConvert(comment.created_at)}
                </small>

                <div className="article-vote">
                  <i
                    className={`fa-solid fa-arrow-up ${
                      topClickedArrowIndex === index ? "top-arrow-clicked" : ""
                    }`}
                    onClick={() => arrowClicked(index, "up", comments)}
                  ></i>
                  <p className="vote-numb">{comment.votes}</p>
                  <i
                    className={`fa-solid fa-arrow-down ${
                      bottomClickedArrowIndex === index
                        ? "bottom-arrow-clicked"
                        : ""
                    }`}
                    onClick={() => arrowClicked(index, "down")}
                  ></i>
                </div>
              </Card.Footer>
            </Card>
          );
        })}
      </ul>
    </div>
  );
};
