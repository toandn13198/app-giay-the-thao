
import React from 'react';
import { StyleSheet,StatusBar} from 'react-native';
import { Provider } from 'react-redux';
import Nav from './src/Nav';
import { SafeAreaView } from 'react-native-safe-area-context';
import { store } from './store/storeRedux';


export default function App() {

  return (
    <Provider store={store}>
    <SafeAreaView style={styles.container}>
          <StatusBar backgroundColor='#ff8b02' barStyle ="light-content"/>
      <Nav></Nav>
    </SafeAreaView>
    </Provider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor:'#ff8b02'
  },
});
////////REDUX----------------------------------

