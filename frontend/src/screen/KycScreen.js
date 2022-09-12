
import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { theme } from '../core/theme';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import { PRIME_TRUST_URL, SERVER_URL } from '@env';
import axios from 'axios';
import { DateInput } from 'react-native-date-input';
import { User } from '../module/user/User'
import { userStore } from '../module/user/UserStore';
import Moment from 'moment';
import * as RNLocalize from "react-native-localize";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import PhoneInput from "react-native-phone-number-input";
import CountryPicker from "react-native-region-country-picker";
// import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';

export default function KycScreen({ navigation }) {
  const [isSelected, setSelection] = useState(false);
  const [firstname, setfirst] = useState('');
  const [lastname, setLast] = useState('');
  const [birth, setBirth] = useState('');
  const [taxid, setTaxid] = useState('');
  const [taxco, setTaxico] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [phoneco, setPhoneco] = useState('');
  const phoneInput = useRef();
  const countryPickerRef = useRef();
  const [formattedValue, setFormattedValue] = useState("");
  const [country, setCountry] = useState('');
  const [region, setRegion] = useState('');
  const createIndividualAccount = async () => {
    await axios({
      method: "POST",
      headers: { Authorization: `Bearer ${userStore.user.authToken}` },
      data: {
        data: {
          type: "account",
          attributes: {
            "account-type": "custodial",
            name: "Dragon Account",
            "authorized-signature": "John Connor",
            owner: {
              "contact-type": "natural_person",
              name: "John Connor",
              email: "dragondev93@gmail.com",
              "date-of-birth": "1971-01-01",
              "tax-id-number": "111223333",
              "tax-country": "US",
              "primary-phone-number": {
                country: "US",
                number: "123456789",
                sms: true,
              },
              "primary-address": {
                "street-1": "NaKaKu",
                "street-2": "Apt 260",
                "postal-code": "89145",
                city: "Las Vegas",
                region: "NV",
                country: "US",
              },
            },
          },
        },
      },
      url: "https://sandbox.primetrust.com/v2/accounts?include=owners,contacts,webhook-config",
      // url: "https://sandbox.primetrust.com/v2/users",
    })
      .then((response) => {
        registerBack(response.data.data.id);
        console.log(response.data.data.relationships.contacts.data[0].id);
        const loginResponse = {
          userId: response.data.data.relationships.contacts.data[0].id,// contact id
          authToken: userStore.user.authToken,
          username: userStore.user.username,
          permission: 0,
        };
        const user = User.fromJson(loginResponse, userStore.user.email);
        userStore.setUser(user);
        navigation.navigate('FileuploadScreen');
      })
      .catch((err) => {
        console.log("error", err?.response?.data?.errors);
        // res.status(400).send({ message: err.response?.data?.errors[0]?.title });
      });
  };
  const registerBack = async (accountId) => {
    console.log(userStore.user.username);
    await axios({
      method: "POST",
      data: {
        firstName: 'John',
        lastName: 'Connor',
        userName: userStore.user.username,
        email: 'dragondev93@gmail.com',
        birthday: "1971-01-01",
        taxIdNum: '111223333',
        taxCountry: 'US',
        phone: '123456789',
        city: 'Las Vegas',
        region: 'NV',
        country: 'US',
        postalCode: '89145',
        street1: 'NaKaKu',
        street2: 'Apt 260',
        accountId,
        pin: '1234',
      },
      url: `http://localhost:4000/v1/auth/register`,
    })
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log("error", err);
      });

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
  const createUser = async () => {
    await axios({
      method: "POST",
      data: {
        data: {
          type: "user",
          attributes: {
            email: email.value,
            name: username,
            password: password.value,
          },
        },
      },
      url: `${PRIME_TRUST_URL}v2/users`,
    })
      .then((response) => {

      })
      .catch((err) => {
        console.log("error", err?.response?.data?.errors[0]?.title);
        res.status(400).send({ message: err.response?.data?.errors[0]?.title });
      });
  };
  return (
    <ScrollView contentContainerStyle={{ paddingVertical: 110 }} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          KYC
        </Text>
        {/* <Text style={styles.subtitle}>
          Let’s sign you up.
        </Text> */}
      </View>
      <View style={styles.body}>
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
            returnKeyType="next"
            value={taxid}
            onChangeText={(text) => setTaxico(text)}
            autoCapitalize="none"
          />
        </View>
        <View style={styles.inputgroup}>
          <Text style={styles.label}>Tax Country</Text>
          <TextInput
            placeholder="Enter Country"
            returnKeyType="next"
            value={taxco}
            onChangeText={(text) => setTaxico(text)}
            autoCapitalize="none"
          />
        </View>
        <PhoneInput
          ref={phoneInput}
          defaultValue={phonenumber}
          value={phonenumber}
          defaultCode={RNLocalize.getCountry()}
          onChangeText={(text) => {
            setPhonenumber(text);
            console.log('aa', phonenumber);
          }}
          layout="first"
          containerStyle={{
            width: '100%',
            height: 49,
            borderRadius: 10,
            backgroundColor: theme.colors.textinputbackColor
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
        {/* <CountryPicker
          countryPickerRef={(ref) => {
            countryPickerRef = ref;
          }}
          enable={true}
          darkMode={false}
          countryCode={"US"}
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
            console.log("DATA", data);
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
            container: {},
            flagStyle: {},
            callingCodeStyle: {},
            countryCodeStyle: {},
            countryNameStyle: {},
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
        />; */}
        <Button onPress={() => { createIndividualAccount(); }} color={theme.colors.backgroundColor} style={styles.mannual}>
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
    textAlign: 'center',
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
  }
});
