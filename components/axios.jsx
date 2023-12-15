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
  return api.patch(`/articles/${article_id}`, {
    inc_votes: votes,
  });
};

export const postComment = (article_id, comment, user) => {
  return api.post(`/articles/${article_id}/comments`, {
    username: user,
    body: comment,
  });
};

export const deleteComment = (comment_id) => {
  return api.delete(`/comments/${comment_id}`);
};

export const getTopics = () => {
  return api.get("/topics");
};

export const patchCommentVote = (comment_id, votes) => {
  return api.patch(`/comments/${comment_id}`, {
    inc_votes: votes,
  });
};

export const getUsers = () => {
  return api.get('/users')
}

