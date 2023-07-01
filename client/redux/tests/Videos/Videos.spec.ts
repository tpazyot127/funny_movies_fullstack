import { fetchVideos, likeVideos, dislikeVideos } from '../../Videos/videos.action-creators';
import { ActionTypes } from '../../Videos/videos.action-types';
import { api } from '../../../lib';

jest.mock('../../../lib');

describe('Videos action creators', () => {
  describe('fetchVideos', () => {
    const dispatch = jest.fn();

    afterEach(() => {
      jest.clearAllMocks();
    });

    test('should dispatch FETCH_VIDEOS and FETCH_VIDEOS_SUCCESS actions on successful fetch', async () => {
      const videos: any[] = [
        { _id: '1', title: 'Video 1', description: 'Description 1', url: 'https://example.com/video1.mp4' },
        { _id: '2', title: 'Video 2', description: 'Description 2', url: 'https://example.com/video2.mp4' },
      ];
      const action = { type: ActionTypes.FETCH_VIDEOS_SUCCESS, payload: videos };

      (api.get as jest.Mock).mockResolvedValueOnce({ data: videos });

      await fetchVideos()(dispatch);

      expect(dispatch).toHaveBeenCalledWith({ type: ActionTypes.FETCH_VIDEOS });
      expect(api.get).toHaveBeenCalledWith('/videos', expect.any(Object));
      expect(dispatch).toHaveBeenCalledWith(action);
    });

    test('should dispatch FETCH_VIDEOS and FETCH_VIDEOS_ERROR actions on failed fetch', async () => {
      const error = { response: { data: { message: 'Unauthorized' } } };
      const action = { type: ActionTypes.FETCH_VIDEOS, payload: error.response.data };

      (api.get as jest.Mock).mockRejectedValueOnce(error);

      await fetchVideos()(dispatch);

      expect(dispatch).toHaveBeenCalledWith({ type: ActionTypes.FETCH_VIDEOS });
      expect(api.get).toHaveBeenCalledWith('/videos', expect.any(Object));
    });
  });

  describe('likeVideos', () => {
    const dispatch = jest.fn();

    afterEach(() => {
      jest.clearAllMocks();
    });

    test('should dispatch LIKE_VIDEOS and LIKE_VIDEOS_SUCCESS actions on successful like', async () => {
      const id = '1';
      const videos: any[] = [
        { _id: '1', title: 'Video 1', description: 'Description 1', url: 'https://example.com/video1.mp4' },
        { _id: '2', title: 'Video 2', description: 'Description 2', url: 'https://example.com/video2.mp4' },
      ];
      const action = { type: ActionTypes.LIKE_VIDEOS_SUCCESS, payload: videos };

      (api.post as jest.Mock).mockResolvedValueOnce({ data: videos });

      await likeVideos(id)(dispatch);

      expect(dispatch).toHaveBeenCalledWith({ type: ActionTypes.LIKE_VIDEOS });
      expect(api.post).toHaveBeenCalledWith(`/videos/${id}/like`, expect.any(Object));
      expect(dispatch).toHaveBeenCalledWith(action);
    });

    test('should dispatch LIKE_VIDEOS and LIKE_VIDEOS_ERROR actions on failed like', async () => {
      const id = '1';
      const error = { response: { data: { message: 'Unauthorized' } } };
      const action = { type: ActionTypes.LIKE_VIDEOS_ERROR, payload: error };

      (api.post as jest.Mock).mockRejectedValueOnce(error);

      await likeVideos(id)(dispatch);

      expect(dispatch).toHaveBeenCalledWith({ type: ActionTypes.LIKE_VIDEOS });
      expect(api.post).toHaveBeenCalledWith(`/videos/${id}/like`, expect.any(Object));
      expect(dispatch).toHaveBeenCalledWith(action);
    });
  });

  describe('dislikeVideos', () => {
    const dispatch = jest.fn();

    afterEach(() => {
      jest.clearAllMocks();
    });

    test('should dispatch DISLIKE_VIDEOS and DISLIKE_VIDEOS_SUCCESS actions on successful dislike', async () => {
      const id = '1';
      const videos = [
        { _id: '2', title: 'Video 2', description: 'Description 2', url: 'https://example.com/video2.mp4' },
        { _id: '1', title: 'Video 1', description: 'Description 1', url: 'https://example.com/video1.mp4' },
      ];
      const action = { type: ActionTypes.DISLIKE_VIDEOS_SUCCESS, payload: videos };
    
      (api.post as jest.Mock).mockResolvedValueOnce({ data: videos });
    
      await dislikeVideos(id)(dispatch);
    
      expect(dispatch).toHaveBeenCalledWith({ type: ActionTypes.DISLIKE_VIDEOS });
      expect(api.post).toHaveBeenCalledWith(`/videos/${id}/dislike`, expect.any(Object));
      expect(dispatch).toHaveBeenCalledWith(action);
    });

    test('should dispatch DISLIKE_VIDEOS and DISLIKE_VIDEOS_ERROR actions on failed dislike', async () => {
      const id = '1';
      const error = { response: { data: { message: 'Unauthorized' } } };
      const action = { type: ActionTypes.DISLIKE_VIDEOS_ERROR, payload: error };

      (api.post as jest.Mock).mockRejectedValueOnce(error);

      await dislikeVideos(id)(dispatch);

      expect(dispatch).toHaveBeenCalledWith({ type: ActionTypes.DISLIKE_VIDEOS });
      expect(api.post).toHaveBeenCalledWith(`/videos/${id}/dislike`, expect.any(Object));
      expect(dispatch).toHaveBeenCalledWith(action);
    });
  });
});