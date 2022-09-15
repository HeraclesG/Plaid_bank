
import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef } from 'react';
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
import Moment from 'moment';
import * as RNLocalize from "react-native-localize";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import PhoneInput from "react-native-phone-number-input";
import CountryPicker from "react-native-region-country-picker";
import { Picker } from '@react-native-picker/picker';
import { signUp } from '../module/server/auth_api';
import { post } from '../module/server/api';

export default function SignupScreen({ navigation }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleOpenModalPress = () => setIsModalVisible(true);
  const handleCloseModalPress = () => setIsModalVisible(false);
  const [message, setMessage] = useState('error');
  const [email, setEmail] = useState({ value: 'aresdood@areses.anonaddy.me', error: '' })
  const [conpassword, setConPassword] = useState({ value: 'aaaAAA111222@', error: '' })
  const [username, setUsername] = useState('Ares');
  const [password, setPassword] = useState('aaaAAA111222@');
  const [firstname, setfirst] = useState('aaa');
  const [lastname, setLast] = useState('bbb');
  const [birth, setBirth] = useState('1999-2-4');
  const [taxid, setTaxid] = useState('111222333');
  const [street_1, setSt1] = useState('wewr');
  const [street_2, setSt2] = useState('werwer');
  const [city, setCity] = useState('adsfsdf');
  const [postalcode, setPostalCode] = useState('19450');
  const [phonenumber, setPhonenumber] = useState('1234567890');
  const [phoneco, setPhoneco] = useState('US');
  const phoneInput = useRef();
  let countryPickerRef = useRef();
  const [formattedValue, setFormattedValue] = useState("");
  const [country, setCountry] = useState('US');
  const [region, setRegion] = useState('AL');
  const [isreg, setIsreg] = useState(true);
  const onTextChanged = (value) => {
    setTaxid(value.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, ''));
  };
  const onpostalCode = (value) => {
    setPostalCode(value.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, ''));
  };
  const validate = () => {
    if (firstname === '' || lastname === '' || birth === '' || taxid === '' || street_1 === '' | street_2 === '' || city === '' || postalcode === '' | phoneco === '' || phonenumber === '' || country === '') {
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
    createUser();
  }
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = (date) => {
    console.log(date);
    setBirth(Moment(date).format('y-M-d'));
    hideDatePicker();
  };
  const validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };
  const createUser = async () => {
    const response = await signUp(
      {
        firstName: firstname,
        lastName: lastname,
        email: email.value,
        password: password,
        userName: username,
        phone: phonenumber,
        city: city,
        country: country,
        taxIdNum: taxid,
        taxCountry: country,
        birthday: birth,
        region: region,
        postalCode: postalcode,
        street1: street_1,
        street2: street_2,
      }
    );
    if (response === 'success') {
      navigation.navigate('FileuploadScreen');
    }
    setMessage(response);
    handleOpenModalPress();
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
            value={conpassword.value}
            onChangeText={(text) => setConPassword({ value: text, error: '' })}
            error={!!conpassword.error}
            errorText={conpassword.error}
            autoCapitalize="none"
          />
        </View>
        <View style={styles.doublegroup}>
          <View style={[styles.inputgroup, { width: '45%' }]}>
            <Text style={styles.label}>First Name</Text>
            <TextInput
              placeholder="Enter First Name"
              returnKeyType="next"
              value={firstname}
              onChangeText={(text) => setfirst(text)}
              autoCapitalize="none"
            />
          </View>
          <View style={[styles.inputgroup, { width: '45%' }]}>
            <Text style={styles.label}>Last Name</Text>
            <TextInput
              placeholder="Enter Last Name"
              returnKeyType="next"
              value={lastname}
              onChangeText={(text) => setLast(text)}
              autoCapitalize="none"
            />
          </View>
        </View>
        <View style={styles.inputgroup}>
          <Text style={styles.label}>Birthday</Text>
          <TextInput
            onPressIn={(e) => { showDatePicker() }}
            showSoftInputOnFocus={false}
            type='date'
            placeholder="1991-01-01"
            returnKeyType="next"
            value={birth}
            onChangeText={(text) => setBirth(text)}
            autoCapitalize="none"
            textContentType="emailAddress"
            keyboardType="email-address"
          />
        </View>
        <View style={styles.inputgroup}>
          <Text style={styles.label}>Tax Id</Text>
          <TextInput
            placeholder="taxid"
            keyboardType='numeric'
            returnKeyType="next"
            value={taxid}
            onChangeText={(text) => onTextChanged(text)}
            autoCapitalize="none"
          />
        </View>
        <View style={styles.inputgroup}>
          <Text style={styles.label}>Street 1</Text>
          <TextInput
            placeholder="Enter street1"
            returnKeyType="next"
            value={street_1}
            onChangeText={(text) => setSt1(text)}
            autoCapitalize="none"
          />
        </View>
        <View style={styles.inputgroup}>
          <Text style={styles.label}>Street 2</Text>
          <TextInput
            placeholder="Enter street2"
            returnKeyType="next"
            value={street_2}
            onChangeText={(text) => setSt2(text)}
            autoCapitalize="none"
          />
        </View>
        <View style={styles.inputgroup}>
          <Text style={styles.label}>city</Text>
          <TextInput
            placeholder="Enter city"
            returnKeyType="next"
            value={city}
            onChangeText={(text) => setCity(text)}
            autoCapitalize="none"
          />
        </View>
        <View style={styles.inputgroup}>
          <Text style={styles.label}>postalCode</Text>
          <TextInput
            placeholder="Enter postalCode"
            keyboardType='numeric'
            returnKeyType="next"
            value={postalcode}
            onChangeText={(text) => onpostalCode(text)}
            autoCapitalize="none"
          />
        </View>
        <Text style={styles.label}>Phone Number</Text>
        <PhoneInput
          ref={phoneInput}
          defaultValue={phonenumber}
          value={phonenumber}
          defaultCode={phoneco}
          onChangeText={(text) => {
            setPhonenumber(text);
            console.log('phone:', phonenumber);
          }}
          onChangeCountry={(text) => {
            setPhoneco(text.cca2);
          }}
          layout="first"
          containerStyle={{
            width: '100%',
            height: 49,
            borderRadius: 10,
            backgroundColor: theme.colors.textinputbackColor,
            marginBottom: 20,
          }}
          textContainerStyle={{ paddingVertical: 0, borderRadius: 10, backgroundColor: theme.colors.textinputbackColor }}
          codeTextStyle={{ paddingVertical: 0, color: theme.colors.whiteColor }}
          textInputStyle={{ paddingVertical: 0, color: theme.colors.whiteColor }}
          onChangeFormattedText={(text) => {
            setFormattedValue(text);
          }}
          withDarkTheme
          withShadow
        />
        <Text style={styles.label}>Country</Text>
        <CountryPicker
          countryPickerRef={(ref) => {
            countryPickerRef = ref;
          }}
          enable={true}
          darkMode={false}
          countryCode={country}
          containerConfig={{
            showFlag: true,
            showCallingCode: true,
            showCountryName: true,
            showCountryCode: true,
          }}
          modalConfig={{
            showFlag: true,
            showCallingCode: true,
            showCountryName: true,
            showCountryCode: true,
          }}
          onSelectCountry={(data) => {
            console.log(data.code);
            if (data.code == 'US') {
              setIsreg(true);
            } else {
              setIsreg(false);
            }
            setCountry(data.code);
          }}
          onInit={(data) => {
            console.log("DATA", data);
          }}
          onOpen={() => {
            console.log("Open");
          }}
          onClose={() => {
            console.log("Close");
          }}
          containerStyle={{
            container: {
              paddingHorizontal: '4%',
              width: '100%',
              height: 49,
              backgroundColor: theme.colors.textinputbackColor,
              borderRadius: 10,
              marginBottom: 20,
            },
            flagStyle: {
              fontSize: 20,
              textAlign: 'center',
            },
            callingCodeStyle: {
              paddingHorizontal: 'auto',
              textAlign: 'center',
              color: theme.colors.whiteColor,
            },
            countryCodeStyle: {
              paddingHorizontal: 'auto',
              textAlign: 'center',
              color: theme.colors.whiteColor
            },
            countryNameStyle: {
              paddingHorizontal: 'auto',
              textAlign: 'center',
              color: theme.colors.whiteColor
            },
          }}
          modalStyle={{
            container: {},
            searchStyle: {},
            tileStyle: {},
            itemStyle: {
              itemContainer: {},
              flagStyle: {},
              countryCodeStyle: {},
              countryNameStyle: {},
              callingNameStyle: {},
            },
          }}
          title={"Country"}
          searchPlaceholder={"Search"}
          showCloseButton={true}
          showModalTitle={true}
        />
        {isreg ? <Text style={styles.label}>Region</Text> : <Text></Text>}
        <View
          style={{ width: '100%', height: 49, marginBottom: 10, borderRadius: 10, overflow: 'hidden', }}>
          {isreg ? <Picker
            style={{ backgroundColor: theme.colors.textinputbackColor, width: '100%', height: 49, color: theme.colors.whiteColor }}
            selectedValue={region}
            themeVariant='dark'
            onValueChange={(itemValue, itemIndex) =>
              setRegion(itemValue)
            }>
            <Picker.Item label="Alabama" value="AL" />
            <Picker.Item label="Alaska" value="AK" />
            <Picker.Item label="American Samoa" value="AS" />
            <Picker.Item label="Arizona" value="AZ" />
            <Picker.Item label="Arkansas" value="AR" />
            <Picker.Item label="Caliornia" value="CA" />
            <Picker.Item label="Colorado" value="CO" />
            <Picker.Item label="Connecticut" value="CT" />
            <Picker.Item label="Delaware" value="DE" />
            <Picker.Item label="District Of Columbia" value="DC" />
            <Picker.Item label="Federated States Of Micronesia" value="FM" />
            {/* <Picker.Item label="JavaScript" value="js" />
            <Picker.Item label="Java" value="java" />
            <Picker.Item label="JavaScript" value="js" />
            <Picker.Item label="Java" value="java" />
            <Picker.Item label="JavaScript" value="js" />
            <Picker.Item label="Java" value="java" />
            <Picker.Item label="JavaScript" value="js" />
            <Picker.Item label="Java" value="java" />
            <Picker.Item label="JavaScript" value="js" />
            <Picker.Item label="Java" value="java" />
            <Picker.Item label="JavaScript" value="js" /> */}
          </Picker> : <View></View>}
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
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
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
