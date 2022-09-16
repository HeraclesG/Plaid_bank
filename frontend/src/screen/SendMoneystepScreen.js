
import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { theme } from '../core/theme';
import Svg, { Path } from "react-native-svg"
import Keyboard from '../components/Keyboard';
import Button from '../components/Button';
import axios from 'axios';
import { userStore } from '../module/user/UserStore';
import { User } from '../module/user/User';
import { PRIME_TRUST_URL, SERVER_URL } from '@env';
import Modal from 'react-native-modal';
import { fundBalanceApi, transferFundApi } from '../module/server/home_api';

export default function SendMoneystepScreen({ navigation }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleOpenModalPress = () => setIsModalVisible(true);
  const handleCloseModalPress = () => setIsModalVisible(false);
  const [message, setMessage] = useState('error');
  const [val, setVal] = useState(0);
  const [currentval, setCurrentVal] = useState('');
  const [midval, setMidValue] = useState('0');
  useEffect(() => {
    setVal('0');
    fundBalance();
  }, []);
  const fundBalance = async () => {
    const response = await fundBalanceApi();
    if (response.message) {
      console.log('success');
      setCurrentVal(response.value);
      setMidValue(response.value)
      return;
    }
    setMessage(response.value);
    handleOpenModalPress();
  }
  const transferFund = async () => {
    const response = await transferFundApi(
      {
        receiverAccountId: userStore.user.contactId,
        amount: val
      }
    );
    if (response.message) {
      setVal('0');
      navigation.navigate('TransactionSendcompScreen');
    }
    setMessage(response.value);
    handleOpenModalPress();
  }
  function addPin(mon) {
    if (val != '0') {
      const mid = val + mon;
      setVal(mid);
      setMidValue(Number(currentval) - Number(mid));
    } else {
      const mid = mon;
      setVal(mid);
      setMidValue(Number(currentval) - Number(mid));
    }
  }
  function delPin() {
    if (val.length != 1) {
      const mid = val.toString().slice(0, -1);
      setMidValue(Number(currentval) - Number(mid));
      setVal(mid);
    } else {
      const mid = '0';
      setVal(mid);
      setMidValue(Number(currentval) - Number(mid));
    }

  }
  return (
    <View style={styles.container} >
      <ScrollView>
        <View style={styles.header}>
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
          <Text style={styles.text}>
            Send Money
          </Text>
          <Image style={styles.avatar} source={require('../assets/avatar.jpg')} />
        </View>
        <TouchableOpacity style={styles.cashwallet}>
          <Text style={styles.cahshtext}>Cash Wallet</Text>
          <Svg
            width={15}
            height={9}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <Path
              d="M.311 1.211c.2-.191.47-.299.751-.299.282 0 .552.108.751.3l5.26 5.053 5.26-5.054c.2-.186.468-.289.747-.286.278.002.545.11.742.299.197.189.308.445.31.713a1 1 0 0 1-.297.718L7.824 8.43c-.2.191-.47.299-.751.299-.282 0-.552-.108-.751-.3L.312 2.656A1.001 1.001 0 0 1 0 1.933c0-.27.112-.53.311-.722Z"
              fill="#fff"
            />
          </Svg>
        </TouchableOpacity>
        <Text style={styles.currentmoney}>
          ${val}.00
        </Text>
        <Text style={styles.subtitle}>
          Wallet balance after transaction: ${midval}
        </Text>
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
        <Button onPress={() => { transferFund(); }} color={theme.colors.backgroundColor} style={styles.Sign}>
          <Text style={styles.bttext}>
            Send Money
          </Text>
        </Button>
        <Keyboard add={addPin} del={delPin} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundColor,
    paddingHorizontal: 19,
    paddingVertical: 45
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50
  },
  text: {
    textAlign: 'center',
    color: theme.colors.whiteColor,
    fontSize: theme.fontSize.subtitle,
    fontWeight: theme.fontWeight.normal,
  },
  cashwallet: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  cahshtext: {
    color: theme.colors.whiteColor,
    fontSize: theme.fontSize.content0,
    fontWeight: theme.fontWeight.normal,
    marginRight: 10,
  },
  currentmoney: {
    marginTop: 20,
    textAlign: 'center',
    color: theme.colors.thickyellowColor,
    fontSize: theme.fontSize.title01,
    fontWeight: theme.fontWeight.normal,
  },
  subtitle: {
    marginTop: 20,
    textAlign: 'center',
    color: theme.colors.whiteColor,
    fontSize: theme.fontSize.content,
    fontWeight: theme.fontWeight.small,
    opacity: 0.66,
    letterSpacing: 1.5
  },
  Sign: {
    backgroundColor: theme.colors.yellowtextColor,
    marginVertical: 20,
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  bttext: {
    color: theme.colors.backgroundColor,
    textAlign: 'center',
    fontWeight: theme.fontWeight.bold,
    fontSize: 18,
    lineHeight: 22,
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
