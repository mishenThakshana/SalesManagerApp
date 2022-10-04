import {SafeAreaView, ScrollView, View} from 'react-native';
import {Topbar} from 'src/components/layout';
import Card from 'src/components/layout/Card';

const Dashboard = ({navigation}) => {
  return (
    <SafeAreaView>
      <Topbar title="Dashboard" navigation={navigation} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{flex: 1, marginBottom: 60}}>
          <Card icon="ios-cart" title="Sales" amount="120" />
          <Card icon="people" title="Users" amount="520" />
          <Card icon="ios-pricetags" title="Products" amount="420" />
          <Card icon="ios-cube" title="Orders" amount="120" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;
