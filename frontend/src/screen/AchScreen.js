
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { theme } from '../core/theme';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import CheckBox from 'react-native-check-box';
import axios from 'axios';
import { PRIME_TRUST_URL, SERVER_URL } from '@env';
import Svg, { Path, Circle } from "react-native-svg"
import Modal from 'react-native-modal';
import { useSelector, useDispatch } from 'react-redux';
import { fundstransfer } from '../redux/actions/user';

export default function AchScreen({ navigation }) {
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleOpenModalPress = () => setIsModalVisible(true);
  const handleCloseModalPress = () => setIsModalVisible(false);
  const [message, setMessage] = useState('error');
  const [name, setName] = useState('aaaa')
  const [routing, setRouting] = useState('123456789');
  const [number, setNumber] = useState('123456789');
  const onTextChanged = (value) => {
    setNumber(value.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, ''));
  };
  const onRoutingtChanged = (value) => {
    setRouting(value.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, ''));
  };
  const fundsTransfer = async () => {
    if (name == '' || routing == '' || number == '') {
      setMessage('please enter all data');
      handleOpenModalPress();
      return;
    }
     dispatch(fundstransfer({
      contactId: name,
      midvalue: routing,
      authToken: number,
     }));
    navigation.navigate('AddmoneystepScreen');
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={navigation.goBack}>
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
      <View style={styles.header}>
        <Text style={styles.title}>
          ACH Transfer
        </Text>
        {/* <Text style={styles.subtitle}>
          Let’s sign you in.
        </Text> */}
      </View>
      <View style={styles.body}>
        <View style={styles.inputgroup}>
          <Text style={styles.label}>Bank account name</Text>
          <TextInput
            placeholder="Enter your bank account username"
            returnKeyType="next"
            value={name}
            onChangeText={(text) => setName(text)}
            autoCapitalize="none"
          />
        </View>
        <View style={styles.inputgroup}>
          <Text style={styles.label}>Routing number</Text>
          <TextInput
            placeholder="Enter routing number"
            returnKeyType="next"
            keyboardType='numeric'
            value={routing}
            onChangeText={(text) => onRoutingtChanged(text)}
            autoCapitalize="none"
          />
        </View>
        <View style={styles.inputgroup}>
          <Text style={styles.label}>Bank account number</Text>
          <TextInput
            placeholder="Enter bank account number"
            keyboardType='numeric'
            returnKeyType="next"
            value={number}
            onChangeText={(text) => onTextChanged(text)}
            autoCapitalize="none"
          />

        </View>
        {/* <View style={styles.checkboxContainer}>
          <CheckBox
            checkBoxColor={theme.colors.whiteColor}
            isChecked={isSelected}
            onClick={() => { setSelection(!isSelected); }}
            style={styles.checkbox}
          />
          <Text style={styles.label}>Remember Me</Text>
        </View> */}
        <Button onPress={fundsTransfer} color={theme.colors.backgroundColor} style={styles.mannual}>
          <Text style={styles.bttext}>
            Next
          </Text>
        </Button>
      </View>
      <Modal isVisible={isModalVisible} hasBackdrop={true} >
        <View style={styles.modal}>
          <TouchableOpacity onPress={() => {
            handleCloseModalPress()
          }} style={{ paddingHorizontal: 19, position: 'absolute', paddingTop: 19 }}>
            <Svg
              width={14}
              height={16}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <Path
                d="M13.73 14.03a1.097 1.097 0 0 1-.15 1.583 1.19 1.19 0 0 1-.745.261 1.18 1.18 0 0 1-.897-.405L7 9.726 2.063 15.44c-.23.267-.562.405-.896.405a1.19 1.19 0 0 1-.746-.26 1.097 1.097 0 0 1-.15-1.585l5.21-6.03-5.21-5.998A1.097 1.097 0 0 1 .42.387 1.194 1.194 0 0 1 2.063.53L7 6.242 11.936.53A1.196 1.196 0 0 1 13.58.385c.495.398.562 1.107.15 1.585l-5.21 6.029 5.211 6.03Z"
                fill="#121244"
              />
            </Svg>
          </TouchableOpacity>
          <Text style={styles.message}>{message}</Text>
        </View>
      </Modal>
      {/* <View style={styles.footer}>
        <Text style={styles.desc}>
          Don’t have an account?
          <TouchableOpacity onPress={() => { navigation.navigate('SignupScreen'); }}>
            <Text style={styles.redir}>
              Sign up
            </Text>
          </TouchableOpacity>
        </Text>
        <TouchableOpacity onPress={() => { }}>
          <Text style={styles.redir}>
            Forgot Password?
          </Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 23,
    backgroundColor: theme.colors.backgroundColor
  },
  title: {
    paddingTop: 40,
    color: theme.colors.thickyellowColor,
    fontSize: theme.fontSize.title1,
    fontWeight: theme.fontWeight.normal
  },
  subtitle: {
    color: theme.colors.whiteColor,
    fontSize: theme.fontSize.subtitle,
    fontWeight: theme.fontWeight.small,
    opacity: 0.66,
    marginBottom: 40,
  },
  inputgroup: {
    marginBottom: 10,
  },
  mannual: {
    backgroundColor: theme.colors.yellowtextColor,
    marginVertical: 20,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  bttext: {
    textAlign: 'center',
    fontWeight: theme.fontWeight.bold,
    fontSize: 18,
    lineHeight: 22,
    color: theme.colors.backgroundColor
  },
  body: {
    marginVertical: 'auto',
    width: '100%'
  },
  checkboxContainer: {
    flexDirection: "row",
    marginLeft: 10,
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: 'center',
    // color: theme.colors.whiteColor,
  },
  label: {
    margin: 8,
    color: theme.colors.whiteColor
  },
  footer: {
    marginBottom: 82,
    textAlign: 'center',
    fontSize: theme.fontSize.smallSize,
    fontWeight: theme.fontWeight.normal,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  desc: {
    color: theme.colors.whiteColor,

  },
  redir: {
    paddingLeft: 5,
    color: theme.colors.thickyellowColor,
  },
  modal: {
    width: '88%',
    position: 'absolute',
    bottom: 70,
    height: 200,
    marginLeft: '6%',
    borderRadius: 15,
    backgroundColor: theme.colors.whiteColor,
    borderRadius: 25,
  },
  message: {
    textAlign: 'center',
    justifyContent: 'center',
    marginTop: 75,
    color: theme.colors.backgroundColor,
    fontSize: theme.fontSize.subtitle01
  }
});
