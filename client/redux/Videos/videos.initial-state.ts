import {
  VideosState,
} from './videos.state';

import { VideosInterface } from '../../interfaces';
export const videos = {
  _id: '',
  name: '',
  image: '',
  description: '',
  brand: '',
  category: '',
  price: 0,
  countInStock: 0,
  rating: 0,
  numReviews: 0,
  reviews: [],
};

export const videosInitialState: VideosState = {
  loading: false,
  error: null,
  data: []
};
