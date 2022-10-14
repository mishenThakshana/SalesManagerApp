import {useEffect, useState} from 'react';
import {FlatList, SafeAreaView} from 'react-native';
import {FormInputWithLink} from 'src/components/form';
import {UserTopbar, UserProductCard} from 'src/components/layout';
import {protectedHttp} from 'src/helpers/HttpHelper';

const Search = ({navigation}) => {
  const [keyword, setKeyword] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  const filterProducts = () => {
    protectedHttp.get(`/get-product-by-keyword/${keyword}`).then(res => {
      setFilteredProducts(res.data);
    });
  };

  useEffect(() => {
    keyword === '' && setFilteredProducts([]);
  }, [keyword]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <UserTopbar title="Search" navigation={navigation} />
      <FormInputWithLink
        handler={setKeyword}
        value={keyword}
        placeholder="Longsleeve Tshirt"
        btnLabel="Search Product"
        btnHandler={filterProducts}
      />
      {filteredProducts && (
        <FlatList
          contentContainerStyle={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
          data={filteredProducts}
          renderItem={({item}) => (
            <UserProductCard item={item} navigation={navigation} />
          )}
          keyExtractor={(item, index) => String(index)}
          onEndReachedThreshold={0}
          numColumns={2}
        />
      )}
    </SafeAreaView>
  );
};

export default Search;
