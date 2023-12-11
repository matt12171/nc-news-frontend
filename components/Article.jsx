import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { api } from "./Home";

export const Article = () => {
  const { article_id } = useParams();
  return <div>{article_id}</div>;
};
