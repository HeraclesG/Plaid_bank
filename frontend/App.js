import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { MainNavigator } from './src/navigation/MainNavigator'
import { PinNavigator } from './src/navigation/PinNavigator'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { observer } from 'mobx-react-lite';
import { NavigationContainer } from '@react-navigation/native';
import { LoginNavigator } from './src/navigation/LoginNavigator';
import { useInitUser, userStore } from './src/module/user/UserStore';

export default function App() {
  useInitUser()
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <NavigatorSwitch />
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

const NavigatorSwitch = observer(() => {console.log(userStore.user);
  if (false/*!userStore.user*/) {   //auth funcc
    return <LoginNavigator />
  }else if(false/*userStore.user.permission==1*/){
    return <PinNavigator />
  }else{
    return <MainNavigator />
  }
})
