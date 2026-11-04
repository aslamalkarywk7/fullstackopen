import { useEffect } from 'react';
import { useNavigate } from 'react-router-native';
import { useApolloClient } from '@apollo/client';

import useAuthStorage from '../hooks/useAuthStorage';

const SignOut = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();

  useEffect(() => {
    const doSignOut = async () => {
      await authStorage.removeAccessToken();
      await apolloClient.resetStore();
      navigate('/');
    };
    doSignOut();
  }, [authStorage, apolloClient, navigate]);

  return null;
};

export default SignOut;
