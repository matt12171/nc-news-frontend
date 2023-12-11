import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { api } from "./Home";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

export const Article = () => {
  const { article_id } = useParams();
  const [singleArticle, setSingleArticle] = useState("");
  const [loading, setLoading] = useState("");
  const [topVote, setTopVote] = useState("");

  useEffect(() => {
    api.get(`/articles/${article_id}`).then((response) => {
      console.log(response.data);
      setSingleArticle(response.data);
    });
  }, []);

  useEffect(() => {
    api.get(`/articles/${article_id}/comments`).then((response) => {
      console.log(response.data.comments);
      let maxVotes = response.data.comments[0].votes;
      let maxVotedObject = null;
      response.data.comments.forEach((currentObject) => {
        if (currentObject.votes > maxVotes) {
          maxVotes = currentObject.votes;
          maxVotedObject = currentObject;
        }
      });
      console.log(maxVotedObject);
      setTopVote(maxVotedObject);
    });
  }, []);
  return (
    <div className="card">
      <h3>{singleArticle.title}</h3>
      <p>Submitted by {singleArticle.author}</p>
      <img className="article-img" src={`${singleArticle.article_img_url}`} />
      <p>{singleArticle.body}</p>
      <h4>Top Comment</h4>
      <p>{topVote.body}</p>
      <Link to="">See all comments..</Link>
    </div>
  );
};
