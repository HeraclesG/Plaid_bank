

import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react';
import { StyleSheet, Text, View} from 'react-native';
import Button from '../components/Button';
import { theme } from '../core/theme';
export default function DashboardScreen({navigation}) {
  return (
    <View style={styles.container}>
        <View style={styles.title}>
            <Text style={styles.oro}>
                ORO
                <Text style={styles.cash}>
                    cash
                </Text>
            </Text>
        </View>
       <View style={styles.pageview}>
        
       </View>
       <View style={styles.buttons}>
            <Button onPress={()=>{navigation.navigate('LoginScreen');}}  color={theme.colors.whiteColor}  style={styles.Login} >
                Log In
            </Button>
            <Button onPress={()=>{navigation.navigate('SignupScreen');}}  color={theme.colors.backgroundColor} style={styles.Sign}>
                Sign Up
            </Button>
       </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:theme.colors.backgroundColor,
  },
  title:{
    textAlign:'center',
    fontSize:theme.fontSize.title,
    fontWeight:theme.fontWeight.bold,
    marginVertical:'auto',
  },
  oro:{
    color:theme.colors.yellowtextColor,
    fontSize:theme.fontSize.title,
    fontWeight:theme.fontWeight.normal,
  },
  cash:{
    color:theme.colors.whiteColor,
  },
  pageview:{
    height:300,
    backgroundColor:'#FFFFFF'
  },
  buttons:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-around',
    marginTop:45,
    marginBottom:102
  },
  Login:{
    borderColor:theme.colors.whiteColor
  },
  Sign:{
    backgroundColor:theme.colors.yellowtextColor, 
  }
});
