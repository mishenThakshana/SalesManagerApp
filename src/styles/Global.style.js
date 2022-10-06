import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topBarContainer: {
    backgroundColor: '#8200d6',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  topBarTitle: {fontSize: 18, color: '#fff', fontWeight: 'bold'},
  largeBtnContainer: {
    backgroundColor: '#8200d6',
    marginHorizontal: 20,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  largeBtnLabel: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  productCardContainer: {
    backgroundColor: '#8200d6',
    padding: 30,
    margin: 20,
    alignItems: 'center',
    borderRadius: 5,
  },
  productCardTextBlock: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  productCardBtnContainer: {
    flexDirection: 'row',
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  productCardBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    backgroundColor: '#8200d6',
    borderWidth: 1,
    borderColor: '#fff',
    padding: 10,
  },
});

export default styles;
