import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { patchArticleVote } from "./axios";
import { timeConvert } from "../utils";
import { getTopics } from "./axios";
import { useParams } from "react-router-dom";
import { Card } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const votedPosts = [];

export const Home = (articles) => {
  const { filterTopic } = useParams();
  const [topClickedArrowIndex, setTopClickedArrowIndex] = useState(null);
  const [bottomClickedArrowIndex, setBottomClickedArrowIndex] = useState(null);
  const [topics, setTopics] = useState([]);
  const [sortBy, setSortBy] = useState();
  const [order, setOrder] = useState("desc");

  if (sortBy === "votes" && order === "desc") {
    articles.element.sort((a, b) => {
      return b.votes - a.votes;
    });
  } else if (sortBy === "votes" && order === "asc") {
    articles.element.sort((a, b) => {
      return a.votes - b.votes;
    });
  } else if (sortBy === "comment count" && order === "desc") {
    articles.element.sort((a, b) => {
      return b.comment_count - a.comment_count;
    });
  } else if (sortBy === "comment count" && order === "asc") {
    articles.element.sort((a, b) => {
      return a.comment_count - b.comment_count;
    });
  } else if (sortBy === "date" && order === "desc") {
    articles.element.sort((a, b) => {
      let da = new Date(a.created_at);
      let db = new Date(b.created_at);
      return db - da;
    });
  } else if (sortBy === "date" && order === "asc") {
    articles.element.sort((a, b) => {
      let da = new Date(a.created_at);
      let db = new Date(b.created_at);
      return da - db;
    });
  }

  const arrowClicked = (index, direction) => {
    for (let i = 0; i < votedPosts.length; i++) {
      if (articles.element[index].article_id === votedPosts[i]) {
        return Toastify({
          text: "Already voted!",
          duration: 4000,
        }).showToast();
      }
    }
    if (direction === "up") {
      setTopClickedArrowIndex(topClickedArrowIndex === index ? null : index);
      setBottomClickedArrowIndex(null);
      articles.element[index].votes += 1;
      patchArticleVote(articles.element[index].article_id, 1)
        .then((response) => {
          console.log("Vote added");
        })
        .catch((err) => {
          Toastify({
            text: "Vote did not update",
            duration: 4000,
          }).showToast();
        });
      votedPosts.push(articles.element[index].article_id);
    } else if (direction === "down") {
      setBottomClickedArrowIndex(
        bottomClickedArrowIndex === index ? null : index
      );
      setTopClickedArrowIndex(null);
      articles.element[index].votes -= 1;
      patchArticleVote(articles.element[index].article_id, -1)
        .then((response) => {
          console.log("Vote added");
        })
        .catch((err) => {
          Toastify({
            text: "Vote did not update",
            duration: 4000,
          }).showToast();
        });
      votedPosts.push(articles.element[index].article_id);
    }
  };

  useEffect(() => {
    getTopics().then((response) => {
      setTopics(response.data.topics);
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
              <Link to={`/${topic.slug}`} className="link">
                {topic.slug}
              </Link>
            </li>
          );
        })}
      </ul>

      {filterTopic ? <p>Category - {filterTopic}</p> : ""}

      <label htmlFor="sortBy">Sort by:</label>
      <div className="sort-by">
        <select
          name="sortBy"
          id="sortBy"
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="date">Date</option>
          <option value="comment count">Comment Count</option>
          <option value="votes">Votes</option>
        </select>
        <select
          name="orderBy"
          id="orderBy"
          onChange={(e) => setOrder(e.target.value)}
          className="asc"
        >
          <option value="desc">Desc</option>
          <option value="asc">Asc</option>
        </select>
      </div>

      <div className="topic-links"></div>
      <ul id="article-list">
        <Row xs={1} md={3} className="g-4">
          {articles.element.map((article, index) => {
            if (filterTopic) {
              if (filterTopic === article.topic) {
                return (
                  <Col key={index} className="col" style={{ padding: "0px" }}>
                    <Card className="mb-3" style={{ width: "24rem" }}>
                      <Card.Body>
                        <Card.Title className="card-title">
                          {article.title}
                        </Card.Title>
                        <Link to={`/article/${article.article_id}`}>
                          <Card.Img
                            variant="top"
                            src={article.article_img_url}
                            className="article-img"
                          />
                        </Link>
                        <Card.Text>
                          <Link
                            to={`/article/${article.article_id}`}
                            className="link moreInfo"
                          >
                            More info
                          </Link>
                        </Card.Text>
                      </Card.Body>
                      <Card.Footer
                        className="text-muted bottom-of-article"
                        style={{
                          fontSize: "0.9rem",
                          padding: "0.2rem",
                        }}
                      >
                        <div className="card-author-comments">
                          <p className="author">
                            - <b>{article.author}</b>{" "}
                            {timeConvert(article.created_at)}
                          </p>
                          <Link
                            to={`/article/${article.article_id}/comments`}
                            className="link"
                          >
                            <p className="comments">
                              {article.comment_count} comments
                            </p>
                          </Link>
                        </div>
                        <div className="article-vote">
                          <i
                            className={`fa-solid fa-arrow-up ${
                              topClickedArrowIndex === index
                                ? "top-arrow-clicked"
                                : ""
                            }`}
                            onClick={() => arrowClicked(index, "up", articles)}
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
                      </Card.Footer>
                    </Card>
                  </Col>
                );
              }
            } else {
              return (
                <Col key={index} className="col" style={{ padding: "0px" }}>
                  <Card className="mb-3" style={{ width: "24rem" }}>
                    <Card.Body>
                      <Card.Title className="card-title">
                        {article.title}
                      </Card.Title>
                      <Link to={`/article/${article.article_id}`}>
                        <Card.Img
                          variant="top"
                          src={article.article_img_url}
                          className="article-img"
                        />
                      </Link>
                      <Card.Text>
                        <Link
                          to={`/article/${article.article_id}`}
                          className="link moreInfo"
                        >
                          More info
                        </Link>
                      </Card.Text>
                    </Card.Body>
                    <Card.Footer
                      className="text-muted bottom-of-article"
                      style={{
                        fontSize: "0.9rem",
                        padding: "0.2rem",
                      }}
                    >
                      <div className="card-author-comments">
                        <p className="author">
                          - <b>{article.author}</b>{" "}
                          {timeConvert(article.created_at)}
                        </p>
                        <Link
                          to={`/article/${article.article_id}/comments`}
                          className="link"
                        >
                          <p className="comments">
                            {article.comment_count} comments
                          </p>
                        </Link>
                      </div>
                      <div className="article-vote">
                        <i
                          className={`fa-solid fa-arrow-up ${
                            topClickedArrowIndex === index
                              ? "top-arrow-clicked"
                              : ""
                          }`}
                          onClick={() => arrowClicked(index, "up", articles)}
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
                    </Card.Footer>
                  </Card>
                </Col>
              );
            }
          })}
        </Row>
      </ul>
    </div>
  );
};
