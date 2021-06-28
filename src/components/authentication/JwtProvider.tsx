import { ReactNode, useEffect } from 'react';
import { useDispatch } from 'react-redux';
// redux
import { getInitialize } from '../../redux/slices/authJwt';

// ----------------------------------------------------------------------

type JwtProviderProps = {
  children: ReactNode;
};

export default function JwtProvider({ children }: JwtProviderProps) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInitialize());
  }, [dispatch]);

  return <>{children}</>;
}
