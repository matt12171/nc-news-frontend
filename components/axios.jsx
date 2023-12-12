import axios from "axios";

export const api = axios.create({
  baseURL: "https://nc-news-cg4z.onrender.com/api",
});

export const getArticles = api.get("/articles");
