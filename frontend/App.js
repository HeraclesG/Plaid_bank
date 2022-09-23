/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import NavigatorSwitch from './src/navigation/NavigatorSwitch';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import {store} from './src/redux/store';



export default App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
       <NavigatorSwitch/>
      </SafeAreaProvider>
      </Provider>
  );
};