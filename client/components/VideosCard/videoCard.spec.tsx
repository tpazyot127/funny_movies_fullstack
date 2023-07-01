import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import VideosCard from '../VideosCard';
import { VideoInterface } from '../../interfaces';
import { useVideosActions } from '../../hooks';

jest.mock('../../hooks', () => ({
  useVideosActions: jest.fn(),
}));

const mockVideo: any = {
  _id: '1',
  url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  description: 'Mock video description',
  username: 'Mock user',
  likes: 0,
  dislikes: 0,
};

describe('VideosCard', () => {
  const likeVideosMock = jest.fn();
  const dislikeVideosMock = jest.fn();

  beforeEach(() => {
    (useVideosActions as jest.Mock).mockReturnValue({
      likeVideos: likeVideosMock,
      dislikeVideos: dislikeVideosMock,
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders the video title and description', () => {
    act(() => {
      render(<VideosCard video={mockVideo} socketData={{}} />);
    });

    expect(screen.getByText(mockVideo.description)).toBeInTheDocument();
    expect(screen.getByText(`Shared by: ${mockVideo.username}`)).toBeInTheDocument();
  });

  it('calls the likeVideos function when the like button is clicked', () => {
    act(() => {
      render(<VideosCard video={mockVideo} socketData={{}} />);
    });

    const likeButton = screen.getByRole('button', { name: /like/i });
    fireEvent.click(likeButton);

    expect(likeVideosMock).toHaveBeenCalledWith(mockVideo._id);
  });

  it('calls the dislikeVideos function when the dislike button is clicked', () => {
    act(() => {
      render(<VideosCard video={mockVideo} socketData={{}} />);
    });

    const dislikeButton = screen.getByRole('button', { name: /dislike/i });
    fireEvent.click(dislikeButton);

    expect(dislikeVideosMock).toHaveBeenCalledWith(mockVideo._id);
  });
});