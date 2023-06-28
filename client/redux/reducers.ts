import { combineReducers } from 'redux';
import {
  videosReducer,
} from './Videos/videos.reducers'; 

import {
  userDetailsReducer,
  userEditReducer,
  userLoginReducer,
  userRegisterReducer,
  usersReducer,
  userUpdateReducer,
} from './User/user.reducers';

export const reducers = combineReducers({
  videos: videosReducer,
  user: userDetailsReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userUpdate: userUpdateReducer,
  userEdit: userEditReducer,
  users: usersReducer,
});

export type RootState = ReturnType<typeof reducers>;
