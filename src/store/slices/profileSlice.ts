import {createSlice, isAnyOf} from '@reduxjs/toolkit';

import { ProfileType} from '../types';
import userApi from "../../api/http/userApi";


const initialState: ProfileType = {
  id: '',
  firstName: '',
  lastName: '',
  profileImage: '',
  verified: false,
  gender: 'male',
  birthday: '',
  coverImage: '',
  city: '',
  country: '',
  bio: '',
  createdAt: '',
  updatedAt: '',
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userApi.updateProfile.fulfilled, (state, action) => {
      const {user,...profileData}=action.payload
      return {...state,...profileData}
    });
    builder.addCase(userApi.updateProfileImages.fulfilled, (state, action) => {
        return {...state,...action.payload}

    });

    builder.addMatcher(
        isAnyOf(
            userApi.authenticateUser.fulfilled,
            userApi.signin.fulfilled,
            userApi.signup.fulfilled
        ),
        (state, action) => {
           return {...state,...action.payload.user.profile}
        }
    );
  },

});

export const profileReducer = profileSlice.reducer;
