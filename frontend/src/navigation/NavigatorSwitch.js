import { useSelector, useDispatch } from 'react-redux';
import { MainNavigator } from './MainNavigator';
import { LoginNavigator } from './LoginNavigator';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
 
export default function NavigatorSwitch() {
  const permission = useSelector((store) => store.user.permission);
  console.log(permission);
  return (
    <NavigationContainer>
      {permission==0?
      <LoginNavigator/>:
      <MainNavigator/>  
    }
    </NavigationContainer>
  );
}