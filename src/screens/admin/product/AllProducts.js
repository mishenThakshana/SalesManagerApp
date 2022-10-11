import {useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  ScrollView,
  Alert,
} from 'react-native';
import {
  SingleTopbar,
  ProductCard,
  EmptyScreenFull,
} from 'src/components/layout';
import {FormInputWithLink} from 'src/components/form';
import {protectedHttp} from 'src/helpers/HttpHelper';

const AllProducts = ({navigation}) => {
  const [keyword, setKeyword] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loader, setLoader] = useState(true);

  const getProducts = () => {
    protectedHttp.get(`/product?page=${page}`).then(res => {
      if (res.data.current_page < res.data.last_page) {
        setLoader(true);
      } else {
        setLoader(false);
      }
      setProducts([...products, ...res.data.data]);
    });
  };

  const deleteProduct = id => {
    Alert.alert('Remove Product', 'Are you sure to delete this product?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => {
          protectedHttp
            .delete(`/product/${id}`)
            .then(res => {
              setProducts(products.filter(product => product.id !== id));
            })
            .catch(error => console.log('error'));
        },
      },
    ]);
  };

  const searchProduct = () => {
    if (keyword === '') {
      alert('Please enter something');
    } else {
      setFilteredProducts([]);
      protectedHttp.get(`/search-product/${keyword}`).then(res => {
        setFilteredProducts(res.data);
      });
    }
  };

  useEffect(() => {
    getProducts();
  }, [page]);

  useEffect(() => {
    keyword === '' && setFilteredProducts([]);
  }, [keyword]);

  const renderLoader = () => {
    return (
      <View>{loader && <ActivityIndicator size={28} color="#8200d6" />}</View>
    );
  };

  const loadMoreProducts = () => {
    keyword === '' && setPage(page + 1);
  };

  const filterComponent = () => {
    return filteredProducts.map(item => (
      <ProductCard key={item.id} item={item} navigation={navigation} />
    ));
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <SingleTopbar title="All products" navigation={navigation} />
      <FormInputWithLink
        handler={setKeyword}
        placeholder="Search Product"
        btnLabel="Search"
        value={keyword}
        btnHandler={searchProduct}
      />
      {products.length === 0 && loader === false ? <EmptyScreenFull /> : null}
      {filteredProducts.length > 0 ? (
        <ScrollView>{filterComponent()}</ScrollView>
      ) : (
        products && (
          <FlatList
            data={products}
            renderItem={({item}) => (
              <ProductCard
                item={item}
                navigation={navigation}
                deleteHandler={deleteProduct}
              />
            )}
            keyExtractor={(item, index) => String(index)}
            onEndReachedThreshold={0}
            onEndReached={loadMoreProducts}
            ListFooterComponent={renderLoader}
          />
        )
      )}
    </SafeAreaView>
  );
};

export default AllProducts;
