import { Home } from "./Home";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { Article } from "./Article";
import { getArticles } from "./axios";
export const Body = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getArticles.then((response) => {
      setArticles(response.data.articles);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div id="body">
      <Routes>
        <Route path="/" element={<Home element={articles} />} />
        <Route path="/article/:article_id" element={<Article />} />
      </Routes>
    </div>
  );
};
