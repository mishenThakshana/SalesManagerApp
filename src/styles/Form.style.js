import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  formTitle: {
    color: '#000',
    fontSize: 30,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  formInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formInput: {
    borderWidth: 1,
    borderColor: '#A9A9A9',
    width: '80%',
    marginVertical: 5,
    padding: 10,
    borderRadius: 5,
    color: '#000',
  },
  linkContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  linkBtn: {
    flexDirection: 'row',
  },
  linkBtnText: {
    color: '#A9A9A9',
    fontWeight: 'bold',
    fontSize: 15,
  },
  linkBtnSubText: {
    color: '#2196F3',
  },
  formAlertContainer: {
    padding: 18,
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    borderRadius: 5,
    marginVertical: 10,
  },
  formAlertMessage: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default styles;
