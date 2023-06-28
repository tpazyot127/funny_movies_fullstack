import { ActionTypes } from './videos.action-types';
import { VideosAction } from './videos.actions';
import {
  videosInitialState,
} from './videos.initial-state';
import {
  VideosState,
} from './videos.state';

export const videosReducer = (
  state: VideosState = videosInitialState,
  action: VideosAction
): VideosState => {
  switch (action.type) {
    case ActionTypes.FETCH_VIDEOS:
      return { ...state, loading: true, error: null };

    case ActionTypes.FETCH_VIDEOS_SUCCESS:
      return { loading: false, data: action.payload, error: null };

    case ActionTypes.FETCH_VIDEOS_ERROR:
      return { ...state, loading: false, error: action.payload };

    case ActionTypes.LIKE_VIDEOS:
      return { ...state, loading: true, error: null };

    case ActionTypes.LIKE_VIDEOS_SUCCESS:
      return { loading: false, data: action.payload, error: null };

    case ActionTypes.LIKE_VIDEOS_ERROR:
      return { ...state, loading: false, error: action.payload };

    case ActionTypes.DISLIKE_VIDEOS:
      return {...state, loading: true, error: null };

    case ActionTypes.DISLIKE_VIDEOS_SUCCESS:
      return { loading: false, data: action.payload, error: null };

    case ActionTypes.DISLIKE_VIDEOS_ERROR:
      return { ...state, loading: false, error: action.payload };
      
    default:
      return state;
  }
};  


