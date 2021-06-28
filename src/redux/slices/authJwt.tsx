import jwtDecode from 'jwt-decode';
import { createSlice } from '@reduxjs/toolkit';
import { store } from '../store';
// utils
import axios from '../../utils/axios';
// @types
import { User } from '../../@types/account';

// ----------------------------------------------------------------------

type AuthJWTState = {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: User;
};

const unAuthUser = {
  id: '',
  displayName: '',
  email: '',
  password: '',
  photoURL: null,
  phoneNumber: null,
  country: null,
  address: null,
  state: null,
  city: null,
  zipCode: null,
  about: null,
  role: '',
  isPublic: true
};

const initialState: AuthJWTState = {
  isLoading: false,
  isAuthenticated: false,
  user: unAuthUser
};

const slice = createSlice({
  name: 'authJwt',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // INITIALISE
    getInitialize(state, action) {
      state.isLoading = false;
      state.isAuthenticated = action.payload.isAuthenticated;
      state.user = action.payload.user;
    },

    // LOGIN
    loginSuccess(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },

    // REGISTER
    registerSuccess(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },

    // LOGOUT
    logoutSuccess(state) {
      state.isAuthenticated = false;
      state.user = unAuthUser;
    }
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

const isValidToken = (accessToken: string) => {
  if (!accessToken) {
    return false;
  }
  const decoded = jwtDecode<{ exp: number }>(accessToken);
  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};

const setSession = (accessToken: string | null) => {
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    localStorage.removeItem('accessToken');
    delete axios.defaults.headers.common.Authorization;
  }
};

// ----------------------------------------------------------------------

export function login({
  email,
  password
}: {
  email: string;
  password: string;
}) {
  return async () => {
    const { dispatch } = store;
    const response = await axios.post('/api/account/login', {
      email,
      password
    });
    const { accessToken, user } = response.data;
    setSession(accessToken);
    dispatch(slice.actions.loginSuccess({ user }));
  };
}

// ----------------------------------------------------------------------

export function register({
  email,
  password,
  firstName,
  lastName
}: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}) {
  return async () => {
    const { dispatch } = store;

    const response = await axios.post('/api/account/register', {
      email,
      password,
      firstName,
      lastName
    });
    const { accessToken, user } = response.data;

    window.localStorage.setItem('accessToken', accessToken);
    dispatch(slice.actions.registerSuccess({ user }));
  };
}

// ----------------------------------------------------------------------

export function logout() {
  return async () => {
    const { dispatch } = store;
    setSession(null);
    dispatch(slice.actions.logoutSuccess());
  };
}

// ----------------------------------------------------------------------

export function getInitialize() {
  return async () => {
    const { dispatch } = store;

    dispatch(slice.actions.startLoading());

    try {
      const accessToken = window.localStorage.getItem('accessToken');

      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken);

        const response = await axios.get('/api/account/my-account');
        dispatch(
          slice.actions.getInitialize({
            isAuthenticated: true,
            user: response.data.user
          })
        );
      } else {
        dispatch(
          slice.actions.getInitialize({
            isAuthenticated: false,
            user: unAuthUser
          })
        );
      }
    } catch (error) {
      console.error(error);
      dispatch(
        slice.actions.getInitialize({
          isAuthenticated: false,
          user: null
        })
      );
    }
  };
}
