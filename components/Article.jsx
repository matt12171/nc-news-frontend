import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { getArticlesId } from "./axios";
import { getComments } from "./axios";
import { timeConvert } from "../utils";
import Spinner from "react-bootstrap/Spinner";

export const Article = (props) => {
  const { article_id } = useParams();
  const [singleArticle, setSingleArticle] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [topVote, setTopVote] = useState("");

  useEffect(() => {
    getArticlesId(article_id)
      .then((response) => {
        setSingleArticle(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        props.setError({ err });
      });
  }, []);

  useEffect(() => {
    getComments(article_id)
      .then((response) => {
        let maxVotes = response.data.comments[0].votes;
        let maxVotedObject = response.data.comments[0];
        response.data.comments.forEach((currentObject) => {
          if (currentObject.votes > maxVotes) {
            maxVotes = currentObject.votes;
            maxVotedObject = currentObject;
          }
        });
        setTopVote(maxVotedObject);
      })
      .catch((err) => {
        Toastify({
          text: "Unable to load top comment",
          duration: 4000,
        }).showToast();
      });
  }, []);

  if (isLoading) {
    return (
      <Spinner animation="border" role="status" style={{marginTop: '300px'}}>
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }
  return (
    <div className="single-article">
      <h3>{singleArticle.title}</h3>
      <p>
        Submitted by <b>{singleArticle.author}</b>{" "}
        {timeConvert(singleArticle.created_at)}
      </p>
      <img className="article-img" src={`${singleArticle.article_img_url}`} />
      <p>{singleArticle.body}</p>
      <div className="top-comment">
        <h4>Top Comment</h4>
        <p>{topVote.body}</p>

        <Link to={`/article/${article_id}/comments`}>See all comments..</Link>
      </div>
      <div className="article-bottom-space"></div>
    </div>
  );
};
