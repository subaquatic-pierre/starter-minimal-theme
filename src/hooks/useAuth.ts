import { useDispatch, useSelector } from 'react-redux';
import {
  isEmpty,
  isLoaded,
  useFirebase,
  useFirestore
} from 'react-redux-firebase';
// redux
import { RootState } from '../redux/store';
import { login, register, logout } from '../redux/slices/authJwt';
// @types
import { User } from '../@types/account';

// ----------------------------------------------------------------------

type LoginParams = {
  email: string;
  password: string;
};

type RegisterParams = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

type Method = 'jwt' | 'firebase';

export default function useAuth(method: Method = 'jwt') {
  // Firebase Auth
  const firebase = useFirebase();
  const firestore = useFirestore();
  const { auth, profile } = useSelector((state: RootState) => state.firebase);

  // JWT Auth
  const dispatch = useDispatch();
  const { user, isLoading, isAuthenticated } = useSelector(
    (state: RootState) => state.authJwt
  );

  // JWT Auth
  if (method === 'jwt') {
    return {
      method: 'jwt',
      user,
      isLoading,
      isAuthenticated,

      login: ({ email, password }: LoginParams) =>
        dispatch(
          login({
            email,
            password
          })
        ),

      register: ({ email, password, firstName, lastName }: RegisterParams) =>
        dispatch(
          register({
            email,
            password,
            firstName,
            lastName
          })
        ),

      logout: () => dispatch(logout()),

      resetPassword: () => {},

      updateProfile: (data: any) => {}
    };
  }

  const firebaseUser: User = {
    id: auth.uid,
    displayName: auth.displayName || profile.displayName || '',
    email: auth.email || '',
    password: '',
    photoURL: auth.photoURL || profile.photoURL || '',
    phoneNumber: auth.phoneNumber || profile.phoneNumber || '',
    country: profile.country || '',
    address: profile.address || '',
    state: profile.state || '',
    city: profile.city || '',
    zipCode: profile.zipCode || '',
    about: profile.about || '',
    role: profile.role || '',
    isPublic: profile.isPublic || false
  };

  // Firebase Auth
  return {
    method: 'firebase',
    user: firebaseUser,
    isLoading: !isLoaded(auth),
    isAuthenticated: !isEmpty(auth),

    login: ({ email, password }: LoginParams) =>
      firebase.login({
        email,
        password
      }),
    loginWithGoogle: () =>
      firebase.login({ provider: 'google', type: 'popup' }),

    loginWithFaceBook: () =>
      firebase.login({ provider: 'facebook', type: 'popup' }),

    loginWithTwitter: () =>
      firebase.login({ provider: 'twitter', type: 'popup' }),

    register: ({ email, password, firstName, lastName }: RegisterParams) =>
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((res) => {
          firestore
            .collection('users')
            .doc(res.user?.uid)
            .set({
              uid: res.user?.uid,
              email,
              displayName: `${firstName} ${lastName}`
            });
        }),

    logout: () => firebase.logout(),

    resetPassword: (email: string) => firebase.resetPassword(email),

    updateProfile: ({
      displayName,
      photoURL,
      phoneNumber,
      country,
      state,
      city,
      address,
      zipCode,
      about,
      isPublic
    }: Partial<User>) =>
      firebase.updateProfile({}).then(() => {
        const uid = firebase.auth().currentUser?.uid;
        firestore.collection('users').doc(uid).set(
          {
            displayName,
            photoURL,
            phoneNumber,
            country,
            state,
            city,
            address,
            zipCode,
            about,
            isPublic
          },
          { merge: true }
        );
      })
  };
}
