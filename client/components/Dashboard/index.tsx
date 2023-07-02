import React from "react";
import { useEffect, useState } from "react";
import { useTypedSelector, useVideosActions } from "../../hooks";
import VideosCard from "../VideosCard";
import { VideosInterface } from "../../interfaces";
import { io } from "socket.io-client";
const Dashboard: React.FC = () => {
  const { fetchVideos } = useVideosActions();
  const { data } = useTypedSelector((state) => state?.videos || {});
  const [newSocketData, setNewSocketData] = useState<any>();

  useEffect(() => {
    fetchVideos();
  }, [newSocketData]);

  useEffect(() => {
    const api = 'https://funny-movies-fullstack-backend.vercel.app'
    const socket = io(`${api}/client`); 

    socket.on("connect", () => {
      console.log("WebSocket connection established.");
      socket.emit("joinRoom", "room1"); // Join the room after connecting
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
