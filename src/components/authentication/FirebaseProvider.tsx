/* eslint-disable import/no-duplicates */
import 'firebase/auth';
import 'firebase/firestore';
import firebase from 'firebase/app';
import { useEffect, ReactNode } from 'react';
import { createFirestoreInstance } from 'redux-firestore';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
// redux
import { store } from '../../redux/store';
// hooks
import useAuth from '../../hooks/useAuth';
//
import { firebaseConfig } from '../../config';

// ----------------------------------------------------------------------

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  firebase.firestore();
}

const rrfProps = {
  firebase,
  config: {
    userProfile: 'users',
    useFirestoreForProfile: true
  },
  dispatch: store.dispatch,
  createFirestoreInstance
};

const ADMIN_EMAILS = ['demo@minimals.cc'];

// ----------------------------------------------------------------------

type FirebaseProviderProps = {
  children: ReactNode;
};

export default function FirebaseProvider({ children }: FirebaseProviderProps) {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const getInitialize = async () => {
      try {
        firebase.auth().onAuthStateChanged((user) => {
          if (user && isAuthenticated) {
            firebase
              .firestore()
              .collection('users')
              .doc(user.uid)
              .set(
                {
                  role: ADMIN_EMAILS.includes(user.email || '')
                    ? 'admin'
                    : 'user'
                },
                { merge: true }
              );
          }
        });
      } catch (error) {
        console.error(error);
      }
    };

    getInitialize();
  }, [isAuthenticated]);

  return (
    <ReactReduxFirebaseProvider {...rrfProps}>
      {children}
    </ReactReduxFirebaseProvider>
  );
}
