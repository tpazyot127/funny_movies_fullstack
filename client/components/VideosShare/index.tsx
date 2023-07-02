import React, { useState, useEffect } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { io } from "socket.io-client";
import { toast } from "react-toastify";
import { useRouter } from 'next/router'

const api = process.env.API_URL
const socket = io(`${api}/client`);

const VideosShare: React.FC = () => {
  const router = useRouter()
  const [videoUrl, setVideoUrl] = useState("");
  const [userDataEmail, setUserDataEmail] = useState<any>();

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    const user = localStorage.getItem("userDatas");
    const userDatas = user && await JSON.parse(user || "");
    userDatas && setUserDataEmail(userDatas.email);
  };

  const sendNewVideo = (event: React.FormEvent) => {
    event.preventDefault();
    const videoData = {
      title: videoUrl,
      username: userDataEmail,
    };
    if (videoUrl && userDataEmail) {
      socket.emit("videos", videoData);
    }

    router.push('/')

  };

  useEffect(() => {
    connectSocket();
  }, []);

  const connectSocket = () => {
    socket.on("connect", () => {
      console.log("WebSocket connection established.");
    });
    socket.on("disconnect", () => {
      console.log("WebSocket disconnected.");
    });

    return () => {
      socket.disconnect();
    };
  };

  return (
    <Row>
      <Col md={12}>
        <h1>Videos</h1>
        <Form onSubmit={sendNewVideo}>
          <Form.Group controlId="videoUrl" style={{ marginBottom: "20px" }}>
            <Form.Label>Share a YouTube Video</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter YouTube video URL"
              value={videoUrl}
              onChange={(event) => setVideoUrl(event.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Share
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default VideosShare;

