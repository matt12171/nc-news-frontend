import { useParams } from "react-router-dom";

export const Comments = () => {
  const { article_id } = useParams();
  return <div>{article_id}</div>;
};
