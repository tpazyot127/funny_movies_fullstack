import { VideosInterface } from '../../interfaces';
import { ActionTypes } from './videos.action-types';

export type VideosAction =
  | FetchVideosStart
  | FetchVideosSuccess
  | FetchVideosError
  | LikeVideosStart
  | LikeVideosSuccess
  | LikeVideosError
  | DislikeVideosStart
  | DislikeVideosSuccess
  | DislikeVideosError;

export interface FetchVideosStart {
  type: ActionTypes.FETCH_VIDEOS;
}

export interface FetchVideosSuccess {
  type: ActionTypes.FETCH_VIDEOS_SUCCESS;
  payload: [];
}

export interface FetchVideosError {
  type: ActionTypes.FETCH_VIDEOS_ERROR;
  payload: string;
}

export interface LikeVideosStart {
  type: ActionTypes.LIKE_VIDEOS;
}

export interface LikeVideosSuccess {
  payload: VideosInterface[];
  type: ActionTypes.LIKE_VIDEOS_SUCCESS;
}

export interface LikeVideosError {
  type: ActionTypes.LIKE_VIDEOS_ERROR;
  payload: string;
}

export interface DislikeVideosStart {
  type: ActionTypes.DISLIKE_VIDEOS;
}

export interface DislikeVideosSuccess {
  payload: VideosInterface[];
  type: ActionTypes.DISLIKE_VIDEOS_SUCCESS;
}

export interface DislikeVideosError {
  type: ActionTypes.DISLIKE_VIDEOS_ERROR;
  payload: string;
}
