import {useEffect, useState} from 'react';
import {View, SafeAreaView, FlatList, ActivityIndicator} from 'react-native';
import {UserTopbar, UserProductCard} from 'src/components/layout';
import {protectedHttp} from 'src/helpers/HttpHelper';

const Home = ({navigation}) => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loader, setLoader] = useState(true);

  const loadAllProducts = () => {
    protectedHttp.get(`/get-all-products?page=${page}`).then(res => {
      if (res.data.current_page < res.data.last_page) {
        setLoader(true);
      } else {
        setLoader(false);
      }
      setProducts([...products, ...res.data.data]);
    });
  };

  useEffect(() => {
    loadAllProducts();
  }, [page]);

  const loadMoreProducts = () => {
    setPage(page + 1);
  };

  const renderLoader = () => {
    return (
      <View>{loader && <ActivityIndicator size={28} color="#8200d6" />}</View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <UserTopbar title="All Products" />

      {products && (
        <FlatList
          contentContainerStyle={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
          data={products}
          renderItem={({item}) => <UserProductCard item={item} navigation={navigation}/>}
          keyExtractor={(item, index) => String(index)}
          onEndReachedThreshold={0}
          onEndReached={loadMoreProducts}
          ListFooterComponent={renderLoader}
          numColumns={2}
        />
      )}
    </SafeAreaView>
  );
};

export default Home;
