import { View, FlatList, StyleSheet, Pressable, Alert } from 'react-native';
import { useQuery, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-native';

import Text from './Text';
import theme from '../theme';
import { GET_CURRENT_USER } from '../graphql/queries';
import { DELETE_REVIEW } from '../graphql/mutations';
import { ReviewItem } from './SingleRepository';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.mainBackground,
  },
  separator: {
    height: 10,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 10,
    borderRadius: 4,
    marginTop: 6,
  },
  deleteButton: {
    backgroundColor: theme.colors.error,
  },
  buttonText: {
    color: 'white',
    fontWeight: theme.fontWeights.bold,
    textAlign: 'center',
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
  const navigate = useNavigate();
  const { data, loading, refetch } = useQuery(GET_CURRENT_USER, {
    variables: { includeReviews: true },
  });
  const [deleteReview] = useMutation(DELETE_REVIEW);

  if (loading || !data?.me) {
    return <Text>Loading...</Text>;
  }

  const reviews = data.me.reviews
    ? data.me.reviews.edges.map((edge) => edge.node)
    : [];

  const handleDelete = (id) => {
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await deleteReview({ variables: { id } });
            refetch();
          },
        },
      ]
    );
  };

  return (
    <FlatList
      style={styles.container}
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <View>
          <ReviewItem review={item} />
          <Pressable
            style={styles.button}
            onPress={() => navigate(`/repository/${item.repositoryId}`)}
          >
            <Text style={styles.buttonText}>View repository</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.deleteButton]}
            onPress={() => handleDelete(item.id)}
          >
            <Text style={styles.buttonText}>Delete review</Text>
          </Pressable>
        </View>
      )}
      keyExtractor={(item) => item.id}
    />
  );
};

export default MyReviews;
