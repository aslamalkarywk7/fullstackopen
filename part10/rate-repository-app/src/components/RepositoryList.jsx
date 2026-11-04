import * as React from 'react';
import { View, FlatList, StyleSheet, Pressable } from 'react-native';
import { useNavigate } from 'react-router-native';
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { useDebounce } from 'use-debounce';

import RepositoryItem from './RepositoryItem';
import TextInput from './TextInput';
import theme from '../theme';
import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  container: {
    backgroundColor: theme.colors.mainBackground,
  },
  headerContainer: {
    padding: 12,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const { header } = this.props;
    return header || null;
  };

  render() {
    const { repositories, onEndReach, onRepositoryPress } = this.props;
    const repositoryNodes = repositories
      ? repositories.edges.map((edge) => edge.node)
      : [];

    return (
      <FlatList
        style={styles.container}
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              onRepositoryPress && onRepositoryPress(item.id)
            }
          >
            <RepositoryItem repository={item} />
          </Pressable>
        )}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={this.renderHeader}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
      />
    );
  }
}

const orderOptions = [
  { label: 'Latest repositories', orderBy: 'CREATED_AT', orderDirection: 'DESC' },
  { label: 'Highest rated repositories', orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' },
  { label: 'Lowest rated repositories', orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' },
];

const RepositoryListHeader = ({
  searchKeyword,
  setSearchKeyword,
  order,
  setOrder,
}) => {
  return (
    <View style={styles.headerContainer}>
      <TextInput
        placeholder="Filter repositories..."
        value={searchKeyword}
        onChangeText={setSearchKeyword}
      />
      <Picker
        selectedValue={order}
        onValueChange={(value) => setOrder(value)}
      >
        {orderOptions.map((option) => (
          <Picker.Item
            key={option.label}
            label={option.label}
            value={option.label}
          />
        ))}
      </Picker>
    </View>
  );
};

const RepositoryList = () => {
  const navigate = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState('');
  const [order, setOrder] = useState(orderOptions[0].label);
  const [debouncedKeyword] = useDebounce(searchKeyword, 500);

  const selectedOrder =
    orderOptions.find((option) => option.label === order) || orderOptions[0];

  const { repositories, fetchMore } = useRepositories({
    first: 8,
    orderBy: selectedOrder.orderBy,
    orderDirection: selectedOrder.orderDirection,
    searchKeyword: debouncedKeyword,
  });

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <RepositoryListContainer
      repositories={repositories}
      onEndReach={onEndReach}
      onRepositoryPress={(id) => navigate(`/repository/${id}`)}
      header={
        <RepositoryListHeader
          searchKeyword={searchKeyword}
          setSearchKeyword={setSearchKeyword}
          order={order}
          setOrder={setOrder}
        />
      }
    />
  );
};

export default RepositoryList;
