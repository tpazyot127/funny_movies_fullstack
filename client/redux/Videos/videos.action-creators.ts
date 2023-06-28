import Router from "next/router";
import { Dispatch } from "redux";
import { VideosInterface, Review } from "../../interfaces";
import { api } from "../../lib";
import { ActionTypes } from "./videos.action-types";
import { VideosAction } from "./videos.actions";

export const fetchVideos = () => async (dispatch: Dispatch<VideosAction>) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    dispatch({
      type: ActionTypes.FETCH_VIDEOS,
    });
    const { data } = await api.get(`/videos`, config);

    dispatch({
      type: ActionTypes.FETCH_VIDEOS_SUCCESS,
      payload: data.reverse(),
    });
  } catch (error: any) {
    dispatch({
      type: ActionTypes.FETCH_VIDEOS_ERROR,
      payload: error.response.data,
    });
  }
};

export const likeVideos = (id : string) => async (dispatch: Dispatch<VideosAction>) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    dispatch({
      type: ActionTypes.LIKE_VIDEOS
    });
    const { data } = await api.post(`/videos/${id}/like`, config);
    console.log('data', data);
    
    dispatch({
      type: ActionTypes.LIKE_VIDEOS_SUCCESS,
      payload: data.reverse(),
    });
  } catch (error: any) {
    dispatch({
      type: ActionTypes.LIKE_VIDEOS_ERROR,
      payload: error,
    });
  }
};

export const dislikeVideos = (id : string) => async (dispatch: Dispatch<VideosAction>) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    dispatch({
      type: ActionTypes.DISLIKE_VIDEOS,
    });
    const { data } = await api.post(`/videos/${id}/dislike`, config);

    dispatch({
      type: ActionTypes.DISLIKE_VIDEOS_SUCCESS,
      payload: data.reverse(),
    });
  } catch (error: any) {
    dispatch({
      type: ActionTypes.DISLIKE_VIDEOS_ERROR,
      payload: error,
    });
  }
};

