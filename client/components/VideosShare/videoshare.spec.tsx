import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import VideosShare from '../VideosShare';

describe('VideosShare component', () => {
  it('renders the component without errors', async () => {
    const { getByText, getByLabelText } : any = await act(async () => {
      render(<VideosShare />);
    });;
    expect(getByText('Videos')).toBeInTheDocument();
    expect(getByLabelText('Share a YouTube Video')).toBeInTheDocument();
    expect(getByText('Share')).toBeInTheDocument();
  });

  it('calls the sendNewVideo function when the form is submitted', async () => {
    const { getByLabelText, getByText } : any =  await act(async () => {
      render(<VideosShare />);
    });;
    const input = getByLabelText('Share a YouTube Video');
    const button = getByText('Share');
    const form = button.closest('form');
    const sendNewVideo = jest.fn();
    form?.addEventListener('submit', sendNewVideo);
    fireEvent.change(input, { target: { value: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' } });
    fireEvent.submit(form!);
    expect(sendNewVideo).toHaveBeenCalled();
  });
});