import React, { useState } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import Loader from '../Loader';
import Message from '../Message';
import YouTube from 'react-youtube';
import { VideoInterface } from '../../interfaces'
import { useTypedSelector, useVideosActions } from '../../hooks';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import { toast } from 'react-toastify';

const VideosCard: React.FC<{ video: VideoInterface, socketData : any }> = ({ video, socketData }) => {

  const { likeVideos, dislikeVideos } = useVideosActions();
  const { error, data, loading } = useTypedSelector((state) => state.videos);

  const [videoTitle, setVideoTitle] = useState('');
  
  const handleLike = () => {
    likeVideos(video._id);
  };

  const handleDislike = () => {
    dislikeVideos(video._id);
  };


  
  const opts = {
    height: '300',
    width: '100%',
    borderRadius : '5px',
    playerVars: {
      autoplay: 0,
    },
  };

  const socketId = socketData?.title?.split('v=')[1]

  const handleOnReady = async (event :any) => {
    if(videoId === socketId) {
      const videoTitle1 = await event.target.getVideoData().title;
      toast(`New video added: ${videoTitle1}`);
      toast(`New video added by: ${socketData.username}`);
    }
    const videoTitle = await event.target.getVideoData().title;
    setVideoTitle(videoTitle)
  };
  
  const videoId = video?.url?.split('v=')[1];

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <div>
    <Card style={{ width: '100%', marginTop : '3em', height : '300px', borderRadius : '5px'}}>
      <Row>
        <Col xs={12} md={6}>
          <YouTube videoId={videoId} opts={opts} onReady={handleOnReady} />
        </Col>
        <Col xs={12} md={6}>
          <Card.Body>
            <Card.Title>{videoTitle}</Card.Title>
            <Card.Text>{video.description}</Card.Text>
            <Card.Text>Shared by: {video.username}</Card.Text>
            <Button variant="primary" onClick={handleLike}>
              <FaThumbsUp /> Like ({video?.likes})
            </Button>{" "}
            <Button variant="danger" onClick={handleDislike}>
              <FaThumbsDown /> Dislike ({video?.dislikes})
            </Button>
          </Card.Body>
        </Col>
      </Row>
    </Card>
    </div>
  );
};

export default VideosCard;
