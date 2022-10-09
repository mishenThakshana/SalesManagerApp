import {useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  ScrollView,
  Alert,
} from 'react-native';

import {SingleTopbar, UserCard, EmptyScreenFull} from 'src/components/layout';
import {FormInputWithLink} from 'src/components/form';
import {protectedHttp} from 'src/helpers/HttpHelper';

const AllUsers = ({navigation}) => {
  const [keyword, setKeyword] = useState('');
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [loader, setLoader] = useState(true);

  const getUsers = () => {
    protectedHttp.get(`/user?page=${page}`).then(res => {
      if (res.data.current_page < res.data.last_page) {
        setLoader(true);
      } else {
        setLoader(false);
      }
      setUsers([...users, ...res.data.data]);
    });
  };

  const deleteUser = id => {
    Alert.alert('Remove User', 'Are you sure to remove this user?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => {
          protectedHttp
            .delete(`/user/${id}`)
            .then(res => {
              setUsers(users.filter(user => user.id !== id));
            })
            .catch(error => console.log('error'));
        },
      },
    ]);
  };

  const searchUser = () => {
    if (keyword === '') {
      alert('Please enter something');
    } else {
      setFilteredUsers([]);
      protectedHttp.get(`/search-user/${keyword}`).then(res => {
        setFilteredUsers(res.data);
      });
    }
  };

  useEffect(() => {
    getUsers();
  }, [page]);

  useEffect(() => {
    keyword === '' && setFilteredUsers([]);
  }, [keyword]);

  const renderLoader = () => {
    return (
      <View>{loader && <ActivityIndicator size={28} color="#8200d6" />}</View>
    );
  };

  const loadMoreUsers = () => {
    keyword === '' && setPage(page + 1);
  };

  const filterComponent = () => {
    return filteredUsers.map(item => <UserCard key={item.id} user={item} />);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <SingleTopbar title="All Users" navigation={navigation} />
      <FormInputWithLink
        handler={setKeyword}
        placeholder="Search User"
        btnLabel="Search"
        value={keyword}
        btnHandler={searchUser}
      />
      {users.length === 0 && loader === false ? <EmptyScreenFull /> : null}
      {filteredUsers.length > 0 ? (
        <ScrollView>{filterComponent()}</ScrollView>
      ) : (
        users && (
          <FlatList
            data={users}
            renderItem={({item}) => (
              <UserCard user={item} navigation={navigation} />
            )}
            keyExtractor={(item, index) => String(index)}
            onEndReachedThreshold={0}
            onEndReached={loadMoreUsers}
            ListFooterComponent={renderLoader}
          />
        )
      )}
    </SafeAreaView>
  );
};

export default AllUsers;
