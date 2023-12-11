import { Home } from "./Home";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "./Home";
import { Article } from "./Article";
export const Body = () => {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    api.get("/articles").then((response) => {
      setArticles(response.data.articles);
    });
  }, []);
  return (
    <div id="body">
      <Routes>
        <Route path="/" element={<Home element={articles} />} />
        <Route path="/article/:article_id" element={<Article />} />
      </Routes>
    </div>
  );
};
