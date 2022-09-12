
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { theme } from '../core/theme';
import Keyboard from '../components/Keyboard';
import { User } from '../module/user/User'
import { userStore } from '../module/user/UserStore'
import axios from 'axios';
import { PRIME_TRUST_URL, SERVER_URL } from '@env';
import Svg, { Path, Circle } from "react-native-svg"
import Modal from 'react-native-modal';

export default function PinScreen({ navigation }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleOpenModalPress = () => setIsModalVisible(true);
  const handleCloseModalPress = () => setIsModalVisible(false);
  const [message, setMessage] = useState('error');
  const [pins, setPins] = useState([]);
  function addPin(val) {
    if (pins.length < 4) {
      setPins([...pins, val]);
      if (pins.length == 3) {
        pinLogin(val);
      }
    }

  }
  const goBack = () => {
    userStore.logout();
  }
  const pinLogin = async (val) => {
    await axios({
      method: "POST",
      data: {
        userName: userStore.user.username,
        pin: pins.join('') + val
      },
      url: `${SERVER_URL}v1/auth/login`,
    })
      .then((response) => {
        Ispending(response.data.currentUser.accountId);
        // const loginResponse = {
        //   ...userStore.user,
        //   userId: response.data.currentUser.accountId,
        //   permission: 2,
        // }
        // const user = User.fromJson(loginResponse, loginResponse.email)
        // userStore.setUser(user);
      })
      .catch((err) => {
        console.log("error", err);
        setMessage('wrong pincode');
        handleOpenModalPress();
      });
  }
  const Ispending = async (accountid) => {
    console.log(userStore.user.authToken);
    await axios({
      method: "GET",
      headers: { Authorization: `Bearer ${userStore.user.authToken}` },
      url: `${PRIME_TRUST_URL}v2/accounts/${userStore.user.id}`,
    })
      .then((response) => {
        if (response.data.data.attributes.status === 'pending') {
          console.log('goback');
          goBack();
          return;
        }
        const loginResponse = {
          ...userStore.user,
          userId: accountid,
          permission: 2,
        }
        const user = User.fromJson(loginResponse, loginResponse.email)
        userStore.setUser(user);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
  function delPin(val) {
    const mid = [...pins];
    mid.pop();
    setPins(mid);
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={goBack}>
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
          Enter PIN
        </Text>
        <Text style={styles.subtitle}>
          Please enter your PIN to proceed
        </Text>
      </View>
      <View style={styles.pingroup}>
        <Text style={[styles.pin, { backgroundColor: (pins.length > 0 ? theme.colors.whiteColor : theme.colors.greytextColor) }]}>{pins.length > 0 ? "•" : ""}</Text>
        <Text style={[styles.pin, { backgroundColor: (pins.length > 1 ? theme.colors.whiteColor : theme.colors.greytextColor) }]}>{pins.length > 1 ? "•" : ""}</Text>
        <Text style={[styles.pin, { backgroundColor: (pins.length > 2 ? theme.colors.whiteColor : theme.colors.greytextColor) }]}>{pins.length > 2 ? "•" : ""}</Text>
        <Text style={[styles.pin, { backgroundColor: (pins.length > 3 ? theme.colors.whiteColor : theme.colors.greytextColor) }]}>{pins.length > 3 ? "•" : ""}</Text>
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
      <Keyboard add={addPin} del={delPin} />
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
    textAlign: 'center',
    marginVertical: 40
  },
  title: {
    textAlign: 'center',
    color: theme.colors.whiteColor,
    fontSize: theme.fontSize.subtitle0,
    fontWeight: theme.fontWeight.bold,
    marginBottom: 20
  },
  subtitle: {
    textAlign: 'center',
    color: theme.colors.whiteColor,
    fontSize: theme.fontSize.content,
    fontWeight: theme.fontWeight.small,
    opacity: 0.66,
    letterSpacing: 1.5,

  },
  pingroup: {
    paddingHorizontal: 50,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 'auto'
  },
  pin: {
    width: 46,
    height: 54,
    backgroundColor: theme.colors.whiteColor,
    color: theme.colors.backgroundColor,
    fontSize: 40,
    borderWidth: 1,
    borderRadius: 5,
    textAlign: 'center',
    paddingTop: -15,
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
