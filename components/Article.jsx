import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { getArticlesId } from "./axios";
import { getComments } from "./axios";

export const Article = () => {
  const { article_id } = useParams();
  const [singleArticle, setSingleArticle] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [topVote, setTopVote] = useState("");

  useEffect(() => {
    getArticlesId(article_id).then((response) => {
      setSingleArticle(response.data);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    getComments(article_id).then((response) => {
      let maxVotes = response.data.comments[0].votes;
      let maxVotedObject = response.data.comments[0];
      response.data.comments.forEach((currentObject) => {
        if (currentObject.votes > maxVotes) {
          maxVotes = currentObject.votes;
          maxVotedObject = currentObject;
        }
      });
      setTopVote(maxVotedObject);
    });
  }, []);

  if (isLoading) {
  }
  return (
    <div className="card">
      <h3>{singleArticle.title}</h3>
      <p>Submitted by {singleArticle.author}</p>
      <img className="article-img" src={`${singleArticle.article_img_url}`} />
      <p>{singleArticle.body}</p>
      <h4>Top Comment</h4>
      <p>{topVote.body}</p>
      <Link to={`/article/${article_id}/comments`}>See all comments..</Link>
    </div>
  );
};
