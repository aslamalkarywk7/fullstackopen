import { View, FlatList, StyleSheet } from 'react-native';
import { useParams } from 'react-router-native';
import { useQuery } from '@apollo/client';
import { format } from 'date-fns';

import RepositoryItem from './RepositoryItem';
import Text from './Text';
import theme from '../theme';
import { GET_REPOSITORY } from '../graphql/queries';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  container: {
    backgroundColor: theme.colors.mainBackground,
  },
  reviewContainer: {
    backgroundColor: 'white',
    padding: 12,
  },
  reviewTopRow: {
    flexDirection: 'row',
  },
  ratingCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  ratingText: {
    color: theme.colors.primary,
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.subheading,
  },
  reviewInfo: {
    flexShrink: 1,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewItem = ({ review }) => {
  return (
    <View style={styles.reviewContainer}>
      <View style={styles.reviewTopRow}>
        <View style={styles.ratingCircle}>
          <Text style={styles.ratingText}>{review.rating}</Text>
        </View>
        <View style={styles.reviewInfo}>
          <Text fontWeight="bold">{review.user.username}</Text>
          <Text color="textSecondary">
            {format(new Date(review.createdAt), 'dd.MM.yyyy')}
          </Text>
          <Text>{review.text}</Text>
        </View>
      </View>
    </View>
  );
};

const SingleRepository = () => {
  const { id } = useParams();
  const { data, loading } = useQuery(GET_REPOSITORY, {
    variables: { id, first: 4 },
    fetchPolicy: 'cache-and-network',
  });

  if (loading || !data?.repository) {
    return <Text>Loading...</Text>;
  }

  const repository = data.repository;
  const reviews = repository.reviews
    ? repository.reviews.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      style={styles.container}
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={() => (
        <View>
          <RepositoryItem repository={repository} showGitHubButton />
          <View style={styles.separator} />
        </View>
      )}
    />
  );
};

export default SingleRepository;
export { ReviewItem };
