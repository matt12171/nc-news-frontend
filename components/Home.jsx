import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { patchArticleVote } from "./axios";
import { timeConvert } from "../utils";
import { getTopics } from "./axios";
import { useParams } from "react-router-dom";
import { Card } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Dropdown, Form } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";

const votedPosts = [];

export const Home = (props) => {
  const { filterTopic } = useParams();
  const [topClickedArrowIndex, setTopClickedArrowIndex] = useState(null);
  const [bottomClickedArrowIndex, setBottomClickedArrowIndex] = useState(null);
  const [topics, setTopics] = useState([]);
  const [sortBy, setSortBy] = useState();
  const [order, setOrder] = useState("desc");
  const [isLoading, setIsLoading] = useState(true);

  if (sortBy === "votes" && order === "desc") {
    props.element.sort((a, b) => {
      return b.votes - a.votes;
    });
  } else if (sortBy === "votes" && order === "asc") {
    props.element.sort((a, b) => {
      return a.votes - b.votes;
    });
  } else if (sortBy === "comment count" && order === "desc") {
    props.element.sort((a, b) => {
      return b.comment_count - a.comment_count;
    });
  } else if (sortBy === "comment count" && order === "asc") {
    props.element.sort((a, b) => {
      return a.comment_count - b.comment_count;
    });
  } else if (sortBy === "date" && order === "desc") {
    props.element.sort((a, b) => {
      let da = new Date(a.created_at);
      let db = new Date(b.created_at);
      return db - da;
    });
  } else if (sortBy === "date" && order === "asc") {
    props.element.sort((a, b) => {
      let da = new Date(a.created_at);
      let db = new Date(b.created_at);
      return da - db;
    });
  }

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
        setIsLoading(false);
      })
      .catch((err) => {
        props.setError({ err });
      });
  }, []);

  if (isLoading) {
    return (
      <Spinner animation="border" role="status" style={{marginTop: '300px'}}>
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  return (
    <div className="home">
      <h3 className="topic-title">Topics</h3>
      <ul className="topics">
        {topics.map((topic, index) => {
          return (
            <li key={index} className="topic-item">
              <Link to={`/home/${topic.slug}`} className="link-topic">
                {topic.slug}
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="toggles">
        <Dropdown className="sort-by">
          <Dropdown.Toggle
            variant="secondary"
            id="dropdown-basic"
            size="lg"
            style={{
              backgroundColor: "#323232",
              textAlign: "center",
              height: "50px",
            }}
          >
            {sortBy ? sortBy : "Sort by"}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setSortBy("date")}>
              Date
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setSortBy("comment count")}>
              Comment Count
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setSortBy("votes")}>
              Votes
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown className="sort-by">
          <Dropdown.Toggle
            variant="secondary"
            id="dropdown-basic"
            size="lg"
            style={{
              backgroundColor: "#323232",
              textAlign: "center",
              height: "50px",
            }}
          >
            {order}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setOrder("desc")}>Desc</Dropdown.Item>
            <Dropdown.Item onClick={() => setOrder("asc")}>Asc</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      {filterTopic ? (
        <p id="category">
          {filterTopic[0].toUpperCase() + filterTopic.slice(1)}
        </p>
      ) : (
        ""
      )}

      <div className="topic-links"></div>
      <ul id="article-list">
        <Row xs={1} md={1} lg={2} xl={2} xxl={3} className="g-4">
          {props.element.map((article, index) => {
            if (filterTopic) {
              if (filterTopic === article.topic) {
                return (
                  <Col
                    key={index}
                    className="col"
                    style={{ padding: "0px", marginTop: "0px" }}
                  >
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
