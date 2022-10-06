import {
  View,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {SingleTopbar, ProductCard} from 'src/components/layout';
import {FormInputWithLink} from 'src/components/form';
import {protectedHttp} from 'src/helpers/HttpHelper';
import {useEffect, useState} from 'react';

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
      <ProductCard key={item.id} item={item} />
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
      {filteredProducts.length > 0 ? (
        <ScrollView>{filterComponent()}</ScrollView>
      ) : (
        <FlatList
          data={products}
          renderItem={({item}) => <ProductCard item={item} />}
          keyExtractor={(item, index) => String(index)}
          onEndReachedThreshold={0}
          onEndReached={loadMoreProducts}
          ListFooterComponent={renderLoader}
        />
      )}
    </SafeAreaView>
  );
};

export default AllProducts;
