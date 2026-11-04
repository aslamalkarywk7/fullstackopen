import { View, Image, StyleSheet, Pressable } from 'react-native';
import * as Linking from 'expo-linking';

import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.repositoryItemBackground,
    padding: 12,
  },
  topRow: {
    flexDirection: 'row',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 4,
    marginRight: 12,
  },
  info: {
    flexGrow: 1,
    flexShrink: 1,
  },
  languageTag: {
    backgroundColor: theme.colors.languageBackground,
    color: 'white',
    padding: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginTop: 6,
    overflow: 'hidden',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 12,
  },
  stat: {
    alignItems: 'center',
  },
});

const formatCount = (count) => {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return String(count);
};

const Stat = ({ label, value }) => (
  <View style={styles.stat}>
    <Text fontWeight="bold">{formatCount(value)}</Text>
    <Text color="textSecondary">{label}</Text>
  </View>
);

const RepositoryItem = ({ repository, showGitHubButton }) => {
  return (
    <View testID="repositoryItem" style={styles.container}>
      <View style={styles.topRow}>
        <Image style={styles.avatar} source={{ uri: repository.ownerAvatarUrl }} />
        <View style={styles.info}>
          <Text fontWeight="bold" fontSize="subheading">
            {repository.fullName}
          </Text>
          <Text color="textSecondary">{repository.description}</Text>
          <Text style={styles.languageTag}>{repository.language}</Text>
        </View>
      </View>
      <View style={styles.statsRow}>
        <Stat label="Stars" value={repository.stargazersCount} />
        <Stat label="Forks" value={repository.forksCount} />
        <Stat label="Reviews" value={repository.reviewCount} />
        <Stat label="Rating" value={repository.ratingAverage} />
      </View>
      {showGitHubButton && repository.url ? (
        <Pressable onPress={() => Linking.openURL(repository.url)}>
          <Text color="primary">Open in GitHub</Text>
        </Pressable>
      ) : null}
    </View>
  );
};

export default RepositoryItem;
