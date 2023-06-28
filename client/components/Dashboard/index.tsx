import { useEffect, useState } from "react";
import { useTypedSelector, useVideosActions } from "../../hooks";
import { Row, Col, Button } from "react-bootstrap";
import VideosCard from "../VideosCard";
import { VideosInterface } from "../../interfaces";
import { toast } from "react-toastify";
import { io } from "socket.io-client";

const Dashboard: React.FC = () => {
  const { fetchVideos } = useVideosActions();
  const { error, data, loading} = useTypedSelector((state) => state.videos);
  const [newSocketData, setNewSocketData] = useState<any>();
  
  useEffect(() => {
    fetchVideos();
  }, [newSocketData]);

  useEffect(() => {
    const socket = io("http://localhost:4000/client");

    socket.on("connect", () => {
      console.log("WebSocket connection established.");
      socket.emit("joinRoom", 'room1'); // Join the room after connecting
    });

    socket.on("latestVideo", (data) => {
      setNewSocketData(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <>
      <h1>Latest movies</h1>
      {data.map((video: VideosInterface) => (
        <VideosCard key={video._id} video={video} socketData={newSocketData} />
      ))}
    </>
  );
};

export default Dashboard;
