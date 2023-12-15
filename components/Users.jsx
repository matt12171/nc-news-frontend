import { useContext, useEffect, useState } from "react";
import { UsernameContext } from "../context/UsernameContext";
import { getUsers } from "./axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";

export const Users = () => {
  const { user, setUser } = useContext(UsernameContext);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getUsers().then((response) => {
      for (let i = 0; i < response.data.users.length; i++) {
        if (user === response.data.users[i].username) {
          setUserProfile(response.data.users[i]);
        }
      }
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <Spinner animation="border" role="status" style={{ marginTop: "300px" }}>
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  return (
    <Card style={{ width: "18rem", marginTop: "40px" }}>
      <Card.Img variant="top" src={userProfile.avatar_url} />
      <Card.Body>
        <Card.Text>
          <b>Username:</b> {userProfile.username}
        </Card.Text>
        <Card.Text>
          <b>Name:</b> {userProfile.name}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};
