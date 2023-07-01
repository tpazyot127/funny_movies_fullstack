import { VideoInterface } from './index';

describe('VideoInterface', () => {
  test('has the correct properties', () => {
    const video: VideoInterface = {
      _id: '1',
      url: 'https://example.com/video1.mp4',
      title: 'Video 1',
      username: 'user1',
      description: 'Description 1',
      likes: 10,
      dislikes: 2,
    };
    expect(video._id).toBe('1');
    expect(video.url).toBe('https://example.com/video1.mp4');
    expect(video.title).toBe('Video 1');
    expect(video.username).toBe('user1');
    expect(video.description).toBe('Description 1');
    expect(video.likes).toBe(10);
    expect(video.dislikes).toBe(2);
  });
});