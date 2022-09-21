/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import NavigatorSwitch from './src/navigation/NavigatorSwitch';
import { Provider } from 'react-redux';
import {store} from './src/redux/store';



export default App = () => {
  return (
    <Provider store={store}>
      <NavigatorSwitch/>
    </Provider>
  );
};