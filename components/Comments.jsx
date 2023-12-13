import { useParams } from "react-router-dom";
import { getComments } from "./axios";
import { useEffect, useState } from "react";

export function timeConvert(datePosted) {
  const old = new Date(`${datePosted}`);
  const today = new Date();

  const differenceInMilliseconds = today - old;

  const hoursDifference = Math.floor(
    differenceInMilliseconds / (1000 * 60 * 60)
  );

  if (hoursDifference >= 24) {
    const daysDifference = Math.floor(hoursDifference / 24);
    if (daysDifference >= 365) {
      const yearsDifference = Math.floor(daysDifference / 365);
      return `${yearsDifference} year(s) ago`;
    } else {
      return `${daysDifference} day(s) ago`;
    }
  } else {
    return `${hoursDifference} hour(s) ago`;
  }
}

export const Comments = () => {
  const { article_id } = useParams();
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getComments(article_id).then((response) => {
      setComments(response.data.comments);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3 className="comment-title">Comments</h3>
      <ul>
        {comments.map((comment, index) => {
          return (
            <li key={index}>
              <p>{comment.body}</p>
              <div className="bottom-comments"><p>
                Submitted by <b>{comment.author}</b>{" "}
                {timeConvert(comment.created_at)}
              </p>
              <p>{comment.votes} Votes</p></div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
