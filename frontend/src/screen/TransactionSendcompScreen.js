
import React, { useState } from 'react';
import { StyleSheet, Image, Text, TouchableOpacity, View } from 'react-native';
import { theme } from '../core/theme';
import Svg, { Path, Circle } from "react-native-svg"
import Button from '../components/Button';
import { useSelector, useDispatch } from 'react-redux';

export default function TransactionSendcompScreen({ navigation }) {
  const value = useSelector((store) => store.user.midprice);
  const cash_num = useSelector((store) => store.user.cash_num);
  const authToken = useSelector((store) => store.user.authToken);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={navigation.goBack} style={{ zIndex: 1, paddingHorizontal: 19, zIndex: 1 }}>
          <Svg
            width={22}
            height={20}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <Path
              d="M20.333 8.667H4.52l4.84-5.814a1.335 1.335 0 1 0-2.053-1.706l-6.667 8c-.045.063-.085.13-.12.2 0 .066 0 .106-.093.173-.06.153-.092.316-.094.48.002.164.033.327.094.48 0 .067 0 .107.093.173.035.07.075.137.12.2l6.667 8a1.333 1.333 0 0 0 1.026.48 1.333 1.333 0 0 0 1.027-2.186l-4.84-5.814h15.813a1.333 1.333 0 1 0 0-2.666Z"
              fill="#fff"
            />
          </Svg>
        </TouchableOpacity>
        <Text style={styles.text}>
          Transaction Complete
        </Text>
      </View>
      <View style={{ justifyContent: 'center', display: 'flex', flex: 1 }}>
        <View style={styles.checkimg}>
          <Svg
            width={88}
            height={88}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <Circle cx={44} cy={44} r={44} fill="#fff" />
            <Circle cx={44} cy={44} r={44} fill="#C6A15A" fillOpacity={0.47} />
            <Circle cx={44} cy={44} r={37} fill="#C6A15A" fillOpacity={0.74} />
            <Path
              d="m27.834 43.5 11.75 11.75 19.583-23.5"
              stroke="#fff"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        </View>
        <Text style={styles.currentval}>
          You successfully sent
        </Text>
        <Text style={styles.currentmoney}>
        {cash_num?'$':''}{value}{cash_num?'':'USDC'}
        </Text>
        <Text style={styles.currentval}>
          to {authToken} account
        </Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.currentval}>
          Save recipient to your contacts?
        </Text>
        <View style={styles.sendcard}>
          <Image style={styles.avatar} source={require('../assets/avatar.jpg')} />
          <Text style={styles.name}>
            {authToken}
          </Text>
          <Text style={styles.email}>
            {value}
          </Text>
        </View>
        <View style={styles.buttons}>
          <Button onPress={() => { navigation.navigate('MaineScreen'); }} color={theme.colors.whiteColor} style={styles.mannual} >
            <Text style={[styles.bttext, { color: theme.colors.whiteColor }]}>
              Do it Later
            </Text>
          </Button>
          <Button onPress={() => { navigation.goBack(); }} color={theme.colors.backgroundColor} style={[styles.Sign]}>
            <Text style={[styles.bttext, { paddingHorizontal: 50 }]}>
              Yes
            </Text>
          </Button>
        </View>
      </View>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundColor,
    paddingTop: 45
  },
  header: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 50
  },
  text: {
    position: 'absolute',
    width: '100%',
    textAlign: 'center',
    color: theme.colors.whiteColor,
    fontSize: theme.fontSize.subtitle,
    fontWeight: theme.fontWeight.normal,
  },
  name: {
    paddingTop: 20,
    width: '100%',
    textAlign: 'center',
    color: theme.colors.whiteColor,
    fontSize: theme.fontSize.content0,
    fontWeight: theme.fontWeight.normal,
  },
  email: {
    width: '100%',
    textAlign: 'center',
    color: theme.colors.greytextColor,
    fontSize: theme.fontSize.content,
    fontWeight: theme.fontWeight.normal,
  },
  checkimg: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  currentval: {
    marginTop: 20,
    textAlign: 'center',
    color: theme.colors.whiteColor,
    fontSize: theme.fontSize.subtitle01,
    fontWeight: theme.fontWeight.normal,
  },
  currentmoney: {
    marginTop: 20,
    textAlign: 'center',
    color: theme.colors.thickyellowColor,
    fontSize: theme.fontSize.title01,
    fontWeight: theme.fontWeight.normal,
  },
  footer: {
    bottom: 0,
    height: 340,
    paddingTop: 10,
    width: '100%',
    backgroundColor: theme.colors.bottomColor,
  },
  sendcard: {
    marginTop: 30,
    marginHorizontal: '10%',
    height: 150,
    borderRadius: 10,
    backgroundColor: theme.colors.backgroundColor,
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center'
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
  },
  Login: {
    borderColor: theme.colors.whiteColor,
    paddingVertical: 5,
  },
  mannual: {
    borderColor: theme.colors.whiteColor,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  bttext: {
    textAlign: 'center',
    fontWeight: theme.fontWeight.bold,
    fontSize: 18,
    lineHeight: 22,
  },
  Sign: {
    backgroundColor: theme.colors.yellowtextColor,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
});
