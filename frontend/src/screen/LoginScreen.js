
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { theme } from '../core/theme';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import CheckBox from 'react-native-check-box';
import { User } from '../module/user/User';
import axios from 'axios';
import { api,get } from '../module/server/api';
import { PRIME_TRUST_URL, SERVER_URL } from '@env';
import Svg, { Path, Circle } from "react-native-svg"
import Modal from 'react-native-modal';

export default function LoginScreen({ navigation }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleOpenModalPress = () => setIsModalVisible(true);
  const handleCloseModalPress = () => setIsModalVisible(false);
  const [message, setMessage] = useState('error');
  const [isSelected, setSelection] = useState(false);
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const login = async () => {
    if (email === '') {
      Alert.alert('Warning', 'Please input Login');
      return;
    }
    if (password === '') {
      Alert.alert('Warning', 'Please input password');
      return;
    }
    await get('v1/auth/getUserEmail')
    await axios({
      method: "POST",
      data: {
        userName: email.value,
      },
      url: `http://localhost:4000/v1/auth/getUserEmail`,
    })
      .then((response) => {
        console.log('backgetemail', response);
        primeLogin(response.data.email, response.data.accountId, response.data.contactId);
      })
      .catch((err) => {
        console.log("error", err);
        setMessage('login backend error');
        handleOpenModalPress();
      });
  }
  const primeLogin = async (email1, id, contactId) => {
    await axios(
      // `${PRIME_TRUST_URL}auth/jwts?email=${email.value}&password=${password}`,
      {
        url: `${PRIME_TRUST_URL}auth/jwts?email=${email1}&password=${password.value}`,
        method: 'post',
        headers: {
          'content-type': 'application/json',
        },
      }
    ).then((data) => {
      const loginResponse = {
        id: id,
        contactId: contactId,
        authToken: data.data.token,
        username: email.value,
        midvalue: '',
        midprice: '',
        permission: 1,
      };
      const user = User.fromJson(loginResponse, email1);
      userStore.setUser(user);
    }).catch(err => {
      console.log(err)
      setMessage('not authenticated');
      handleOpenModalPress();
    });
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          Welcome Back
        </Text>
        <Text style={styles.subtitle}>
          Let’s sign you in.
        </Text>
      </View>
      <View style={styles.body}>
        <View style={styles.inputgroup}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            placeholder="Enter your username, email, or phone number"
            returnKeyType="next"
            value={email.value}
            onChangeText={(text) => setEmail({ value: text, error: '' })}
            error={!!email.error}
            errorText={email.error}
            autoCapitalize="none"
            autoCompleteType="email"
            textContentType="emailAddress"
            keyboardType="email-address"
          />
        </View>
        <View style={styles.inputgroup}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            placeholder="Enter your password"
            returnKeyType="next"
            secureTextEntry={true}
            value={password.value}
            onChangeText={(text) => setPassword({ value: text, error: '' })}
            autoCapitalize="none"
          />
        </View>
        <View style={styles.checkboxContainer}>
          <CheckBox
            checkBoxColor={theme.colors.whiteColor}
            isChecked={isSelected}
            onClick={() => { setSelection(!isSelected); }}
            style={styles.checkbox}
          />
          <Text style={styles.label}>Remember Me</Text>
        </View>
        <Button onPress={login} color={theme.colors.backgroundColor} style={styles.mannual}>
          <Text style={styles.bttext}>
            Log In
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
      <View style={styles.footer}>
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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 118,
    paddingHorizontal: 23,
    backgroundColor: theme.colors.backgroundColor
  },
  title: {
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
