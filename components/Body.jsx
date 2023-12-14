import { Home } from "./Home";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { Article } from "./Article";
import { getArticles } from "./axios";
import { Comments } from "./Comments";
import { Error } from "./Error";

export const Body = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getArticles
      .then((response) => {
        setArticles(response.data.articles);
        setIsLoading(false);
      })
      .catch((err) => {
        setError({ err });
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <Error element={error} />;
  }
  return (
    <div id="body">
      <Routes>
        <Route path="/*" element={<Error />} />
        <Route path="/" element={<Home element={articles} error={error} setError={setError}/>} />
        <Route
          path="/home/:filterTopic"
          element={<Home element={articles} />}
        />
        <Route path="/article/:article_id" element={<Article error={error} setError={setError}/>} />
        <Route path="/article/:article_id/comments" element={<Comments error={error} setError={setError}/>} />
      </Routes>
    </div>
  );
};
