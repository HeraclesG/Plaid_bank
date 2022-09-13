
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { theme } from '../core/theme';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import { PRIME_TRUST_URL, SERVER_URL } from '@env';
import axios from 'axios';
import { User } from '../module/user/User'
import { userStore } from '../module/user/UserStore'
import Svg, { Path, Circle } from "react-native-svg"
import Modal from 'react-native-modal';

export default function SignupScreen({ navigation }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleOpenModalPress = () => setIsModalVisible(true);
  const handleCloseModalPress = () => setIsModalVisible(false);
  const [message, setMessage] = useState('error');
  const [email, setEmail] = useState({ value: '', error: '' })
  const [conpassword, setConPassword] = useState({ value: '', error: '' })
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [conpin, setConpin] = useState({ value: '', error: '' });
  const [def, setDef] = useState('');
  const [pin, setPin] = useState('');
  const onTextChanged = (value) => {
    // code to remove non-numeric characters from text
    if (value.length > 4) {
      return;
    }
    setPin(value.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, ''));
  };
  const onreTextChanged = (value) => {
    // code to remove non-numeric characters from text
    if (value.length > 4) {
      return;
    }
    setConpin({ value: value.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, ''), error: '' });
  };
  const validate = () => {
    if (email.value == '' || password == '' || pin == '') {
      setMessage('please enter all data');
      handleOpenModalPress();
      return;
    }
    if (!validateEmail(email.value)) {
      setEmail({ value: email.value, error: 'invalid email' });
      return;
    }
    if (password !== conpassword.value) {
      setConPassword({ value: conpassword.value, error: 'not match password' });
      return;
    }
    if (pin !== conpin.value) {
      setConpin({ value: conpin.value, error: 'not match pin' });
      return;
    }
    getToken();
  }
  const validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };
  const getToken = async () => {
    await axios(
      // `${PRIME_TRUST_URL}auth/jwts?email=${email.value}&password=${password}`,
      {
        url: `${PRIME_TRUST_URL}auth/jwts?email=${email.value}&password=${password}`,
        //`${PRIME_TRUST_URL}auth/jwts?email=blackhole.rsb@gmail.com&password=aaaAAA111222@`,
        method: 'POST',
        headers: {
          'content-type': 'application/json',

        },//flm reference
      }
    ).then((data) => {
      console.log('11111', data.data);
      const loginResponse = {
        userId: pin,
        contactId: '1',
        authToken: data.data.token,
        username: username,
        permission: 0,
      };
      const user = User.fromJson(loginResponse, email.value);
      userStore.setUser(user);
      navigation.navigate('KycScreen');
    }).catch(err => { createUser(); });
  };
  const createUser = async () => {
    await axios({
      method: "POST",
      data: {
        data: {
          type: "user",
          attributes: {
            email: email.value,
            name: username,
            password: password,
          },
        },
      },
      url: `${PRIME_TRUST_URL}v2/users`,
    })
      .then((response) => {
        console.log('createuser', response.data);
        getToken();
      })
      .catch((err) => {
        console.log("createusererror", err?.response?.data?.errors[0]?.title);
        setMessage('creatuser error');
        handleOpenModalPress();
      });
  };
  return (
    <ScrollView contentContainerStyle={{ paddingVertical: 110 }} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          Set up your account
        </Text>
        <Text style={styles.subtitle}>
          This information must be accurate
        </Text>
      </View>
      <View style={styles.body}>
        <View style={styles.inputgroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder="example@email.com"
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
          <Text style={styles.label}>Username</Text>
          <TextInput
            placeholder="username"
            returnKeyType="next"
            value={username}
            onChangeText={(text) => setUsername(text)}
            autoCapitalize="none"
          />
        </View>
        <View style={styles.inputgroup}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            secureTextEntry={true}
            placeholder="Password must be at least 8 characters long"
            returnKeyType="next"
            value={password}
            onChangeText={(text) => setPassword(text)}
            autoCapitalize="none"
          />
        </View>
        <View style={styles.inputgroup}>
          <Text style={styles.label}>Confirm Password</Text>
          <TextInput
            secureTextEntry={true}
            placeholder="Re-enter your password"
            returnKeyType="next"
            value={conpassword}
            onChangeText={(text) => setConPassword({ value: text, error: '' })}
            error={!!conpassword.error}
            errorText={conpassword.error}
            autoCapitalize="none"
          />
        </View>
        <View style={styles.inputgroup}>
          <Text style={styles.label}>PIN</Text>
          <TextInput
            secureTextEntry={true}
            placeholder="PIN number must be 4 digits "
            keyboardType='numeric'
            returnKeyType="next"
            value={pin}
            onChangeText={(text) => onTextChanged(text)}
            autoCapitalize="none"
          />

        </View>
        <View style={styles.inputgroup}>
          <Text style={styles.label}>Confirm PIN</Text>
          <TextInput
            secureTextEntry={true}
            placeholder="Re-enter your PIN number"
            returnKeyType="next"
            keyboardType='numeric'
            value={conpin}
            onChangeText={(text) => onreTextChanged(text)}
            error={!!conpin.error}
            errorText={conpin.error}
            autoCapitalize="none"
          />
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
        <Button onPress={() => { validate() }} color={theme.colors.backgroundColor} style={styles.mannual}>
          <Text style={styles.bttext}>
            Next
          </Text>
        </Button>
      </View>
      <View style={styles.footer}>
        <Text style={styles.desc}>
          Already have an account?
        </Text>
        <TouchableOpacity onPress={() => { navigation.navigate('LoginScreen'); }}>
          <Text style={styles.redir}>
            Log In
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    opacity: 0.66
  },
  inputgroup: {
    marginBottom: 10,
  },
  mannual: {
    backgroundColor: theme.colors.yellowtextColor,
    marginVertical: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  bttext: {
    textAlign: 'center',
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.backgroundColor,
    fontSize: 18,
    lineHeight: 22,
  },
  body: {
    marginVertical: 'auto',
    width: '100%'
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: 'center'
  },
  label: {
    margin: 8,
    color: theme.colors.whiteColor
  },
  footer: {
    textAlign: 'center',
    fontSize: theme.fontSize.smallSize,
    fontWeight: theme.fontWeight.normal,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  desc: {
    color: theme.colors.whiteColor,
  },
  redir: {
    paddingLeft: 5,
    color: theme.colors.thickyellowColor,
  },
  doublegroup: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
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
