import axios from "axios";

export const api = axios.create({
  baseURL: "https://nc-news-cg4z.onrender.com/api",
});

export const getArticles = api.get("/articles");

export const getArticlesId = (article_id) => {
  return api.get(`/articles/${article_id}`);
};

export const getComments = (article_id) => {
  return api.get(`/articles/${article_id}/comments`);
};

export const patchArticleVote = (article_id, votes) => {
  return api.patch(`/article/${article_id}`, {
    inc_votes: votes,
  });
};
