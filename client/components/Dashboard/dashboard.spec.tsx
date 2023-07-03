import React from 'react';
import { render } from '@testing-library/react';
import Dashboard from '.';
import { useTypedSelector, useVideosActions } from '../../hooks';
import { io } from 'socket.io-client';

jest.mock('../../hooks');
jest.mock('socket.io-client');
jest.mock('../Dashboard')

describe('Dashboard component', () => {
  test('renders the component', () => {
    const mockFetchVideos = jest.fn();
    (useVideosActions as jest.Mock).mockReturnValue({ fetchVideos: mockFetchVideos });
    (useTypedSelector as jest.Mock).mockReturnValue({ error: null, data: [], loading: false });

    const { getByText } = render(<Dashboard /> as React.ReactElement<typeof Dashboard>) ;
    const headingElement = getByText(/latest movies/i);
    expect(headingElement).toBeInTheDocument();

    expect(io).toHaveBeenCalledWith('http://localhost:4000/client');
    expect(io().on).toHaveBeenCalledWith('connect', expect.any(Function));
    expect(io().on).toHaveBeenCalledWith('latestVideo', expect.any(Function));
    expect(io().emit).toHaveBeenCalledWith('joinRoom', 'room1');
  });
});