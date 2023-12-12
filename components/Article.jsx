import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const Article = () => {
  const { article_id } = useParams();
  return <div>{article_id}</div>;
};
