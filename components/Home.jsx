import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { patchArticleVote } from "./axios";

import { getTopics } from "./axios";
import { useParams } from "react-router-dom";

const votedPosts = [];

export const Home = (props) => {
  const { filterTopic } = useParams();
  const [topClickedArrowIndex, setTopClickedArrowIndex] = useState(null);
  const [bottomClickedArrowIndex, setBottomClickedArrowIndex] = useState(null);
  const [topics, setTopics] = useState([]);

  const arrowClicked = (index, direction) => {
    for (let i = 0; i < votedPosts.length; i++) {
      if (props.element[index].article_id === votedPosts[i]) {
        return Toastify({
          text: "Already voted!",
          duration: 4000,
        }).showToast();
      }
    }
    if (direction === "up") {
      setTopClickedArrowIndex(topClickedArrowIndex === index ? null : index);
      setBottomClickedArrowIndex(null);
      props.element[index].votes += 1;
      patchArticleVote(props.element[index].article_id, 1)
        .then((response) => {
          console.log("Vote added");
        })
        .catch((err) => {
          Toastify({
            text: "Vote did not update",
            duration: 4000,
          }).showToast();
        });
      votedPosts.push(props.element[index].article_id);
    } else if (direction === "down") {
      setBottomClickedArrowIndex(
        bottomClickedArrowIndex === index ? null : index
      );
      setTopClickedArrowIndex(null);
      props.element[index].votes -= 1;
      patchArticleVote(props.element[index].article_id, -1)
        .then((response) => {
          console.log("Vote added");
        })
        .catch((err) => {
          Toastify({
            text: "Vote did not update",
            duration: 4000,
          }).showToast();
        });
      votedPosts.push(props.element[index].article_id);
    }
  };

  useEffect(() => {
    getTopics()
      .then((response) => {
        setTopics(response.data.topics);
      })
      .catch((err) => {
        props.setError({err});
      });
  }, []);
  return (
    <div className="home">
      <h2>Articles</h2>
      <h3>Topics</h3>
      <ul className="topics">
        {topics.map((topic, index) => {
          return (
            <li key={index} className="topic-item">
              <Link to={`/home/${topic.slug}`}>{topic.slug}</Link>
            </li>
          );
        })}
      </ul>

      {filterTopic ? <p>Category - {filterTopic}</p> : ""}

      <div className="topic-links"></div>
      <ul id="article-list">
        {props.element.map((article, index) => {
          if (filterTopic) {
            if (filterTopic === article.topic) {
              return (
                <li key={index}>
                  <p>
                    {article.title} -{" "}
                    <Link to={`/article/${article.article_id}`}>More info</Link>
                  </p>{" "}
                  <div className="bottom-of-article">
                    <p>- {article.author}</p>
                    <Link to={`/article/${article.article_id}/comments`}>
                      <p>{article.comment_count} comments</p>
                    </Link>
                    <div className="article-vote">
                      <i
                        className={`fa-solid fa-arrow-up ${
                          topClickedArrowIndex === index
                            ? "top-arrow-clicked"
                            : ""
                        }`}
                        onClick={() => arrowClicked(index, "up", props)}
                      ></i>
                      <p className="vote-numb">{article.votes}</p>
                      <i
                        className={`fa-solid fa-arrow-down ${
                          bottomClickedArrowIndex === index
                            ? "bottom-arrow-clicked"
                            : ""
                        }`}
                        onClick={() => arrowClicked(index, "down")}
                      ></i>
                    </div>
                  </div>
                </li>
              );
            }
          } else {
            return (
              <li key={index}>
                <p>
                  {article.title} -{" "}
                  <Link to={`/article/${article.article_id}`}>More info</Link>
                </p>{" "}
                <div className="bottom-of-article">
                  <p>- {article.author}</p>
                  <Link to={`/article/${article.article_id}/comments`}>
                    <p>{article.comment_count} comments</p>
                  </Link>
                  <div className="article-vote">
                    <i
                      className={`fa-solid fa-arrow-up ${
                        topClickedArrowIndex === index
                          ? "top-arrow-clicked"
                          : ""
                      }`}
                      onClick={() => arrowClicked(index, "up", props)}
                    ></i>
                    <p className="vote-numb">{article.votes}</p>
                    <i
                      className={`fa-solid fa-arrow-down ${
                        bottomClickedArrowIndex === index
                          ? "bottom-arrow-clicked"
                          : ""
                      }`}
                      onClick={() => arrowClicked(index, "down")}
                    ></i>
                  </div>
                </div>
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
};
