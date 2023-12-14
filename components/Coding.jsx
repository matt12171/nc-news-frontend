import { Link } from "react-router-dom";
import { useState } from "react";

export const Coding = () => {
    const [topClickedArrowIndex, setTopClickedArrowIndex] = useState(null);
    const [bottomClickedArrowIndex, setBottomClickedArrowIndex] = useState(null);
  
    return (
      <div className="home">
        <h2>Articles</h2>
        <h3>Topics</h3>
        <div className="topic-links"></div>
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