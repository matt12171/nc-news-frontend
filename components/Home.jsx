import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

export const Home = (articles) => {
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
                <Link to={""}>
                  <p>{article.comment_count} comments</p>
                </Link>
                <p>{article.votes} likes</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
