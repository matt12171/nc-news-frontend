import { Link } from "react-router-dom";
import { FaArrowAltCircleUp, FaArrowAltCircleDown } from "react-icons/fa";
import { useState } from "react";
import { patchArticleVote } from "./axios";

const votedPosts = [];

export const Home = (articles) => {
  const [topClickedArrowIndex, setTopClickedArrowIndex] = useState(null);
  const [bottomClickedArrowIndex, setBottomClickedArrowIndex] = useState(null);

  const arrowClicked = (index, direction) => {
    for (let i = 0; i < votedPosts.length; i++) {
      if (articles.element[index].article_id === votedPosts[i]) {
        return alert("Already voted");
      }
    }
    if (direction === "up") {
      setTopClickedArrowIndex(topClickedArrowIndex === index ? null : index);
      setBottomClickedArrowIndex(null);
      articles.element[index].votes += 1;
      patchArticleVote(articles.element[index].article_id, 1)
        .then((response) => {
          console.log("Vote added");
        })
        .catch((err) => {
          alert("Vote did not update");
        });
      votedPosts.push(articles.element[index].article_id);
      
    } else if (direction === "down") {
      setBottomClickedArrowIndex(
        bottomClickedArrowIndex === index ? null : index
      );
      setTopClickedArrowIndex(null);
      articles.element[index].votes -= 1;
      patchArticleVote(articles.element[index].article_id, -1)
        .then((response) => {
          console.log("Vote added");
        })
        .catch((err) => {
          alert("Vote did not update");
        });
      votedPosts.push(articles.element[index].article_id);
      
    }
  };

  return (
    <div className="home">
      <h2>Articles</h2>
      <ul>
        {articles.element.map((article, index) => {
          return (
            <li key={index}>
              <p>
                {article.title} -{" "}
                <Link to={`/article/${article.article_id}`}>More info</Link>
              </p>{" "}
              <div className="bottom-of-article">
                <p>- {article.author}</p>
                <Link to={`/article/${article.article_id}/comments`}>
                  <p>{article.comment_count} comments</p>
                </Link>
                <div className="article-vote">
                  <i
                    className={`fa-solid fa-arrow-up ${
                      topClickedArrowIndex === index ? "top-arrow-clicked" : ""
                    }`}
                    onClick={() => arrowClicked(index, "up")}
                  ></i>
                  <p className="vote-numb">{article.votes}</p>
                  <i
                    className={`fa-solid fa-arrow-down ${
                      bottomClickedArrowIndex === index
                        ? "bottom-arrow-clicked"
                        : ""
                    }`}
                    onClick={() => arrowClicked(index, "down")}
                  ></i>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
