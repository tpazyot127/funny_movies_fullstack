import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import { useMemo } from 'react';
import {
  UserActionCreators,
  VideosActionCreators,
} from '../redux';

export const useUserActions = () => {
  const dispatch = useDispatch();

  return useMemo(() => {
    return bindActionCreators(UserActionCreators, dispatch);
  }, [dispatch]);
};

export const useVideosActions = () => {
  const dispatch = useDispatch();

  return useMemo(() => {
    return bindActionCreators(VideosActionCreators, dispatch);
  }, [dispatch]);
};