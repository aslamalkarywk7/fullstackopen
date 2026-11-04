import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import Constants from 'expo-constants';
import { useNavigate } from 'react-router-native';
import { useQuery } from '@apollo/client';

import Text from './Text';
import theme from '../theme';
import { GET_CURRENT_USER } from '../graphql/queries';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
  },
  scrollContent: {
    flexDirection: 'row',
  },
  tab: {
    padding: 12,
  },
  tabText: {
    color: 'white',
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.subheading,
  },
});

// react-router-native's <Link> renders a TouchableHighlight, which requires a
// single element child. A plain Pressable that navigates programmatically works
// the same way and keeps the tab styling in one place.
export const AppBarTab = ({ children, ...props }) => {
  return (
    <Pressable style={styles.tab} {...props}>
      <Text style={styles.tabText}>{children}</Text>
    </Pressable>
  );
};

const AppBar = () => {
  const navigate = useNavigate();
  const { data } = useQuery(GET_CURRENT_USER);
  const signedIn = data?.me != null;

  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.scrollContent}>
        <AppBarTab onPress={() => navigate('/')}>Repositories</AppBarTab>
        {signedIn ? (
          <>
            <AppBarTab onPress={() => navigate('/create-review')}>
              Create a review
            </AppBarTab>
            <AppBarTab onPress={() => navigate('/my-reviews')}>
              My reviews
            </AppBarTab>
            <AppBarTab onPress={() => navigate('/signout')}>
              Sign out
            </AppBarTab>
          </>
        ) : (
          <>
            <AppBarTab onPress={() => navigate('/signin')}>Sign in</AppBarTab>
            <AppBarTab onPress={() => navigate('/signup')}>Sign up</AppBarTab>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;