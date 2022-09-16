
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, Image, View } from 'react-native';
import { theme } from '../core/theme';
import Svg, { Path, Circle } from "react-native-svg"
import Button from '../components/Button';
import { depositAssetApi } from '../module/server/home_api';
import Modal from 'react-native-modal';

export default function AddcashScreen({ navigation }) {
  const [walletadd, setAdd] = useState('');
  useEffect(() => {
    depositAsset();
  }, [])
  const depositAsset = async () => {
    const response = await depositAssetApi();
    if (response.message) {
      console.log(response.value);
      setAdd(response.value);
      // setVal('$' + response.value);
      return;
    }
    setMessage(response.value);
    handleOpenModalPress();
  }
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleOpenModalPress = () => setIsModalVisible(true);
  const handleCloseModalPress = () => setIsModalVisible(false);
  const [message, setMessage] = useState('error');
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
      <View style={{ marginVertical: 'auto' }}>
        <View style={styles.header}>
          <Text style={styles.title}>
            How would you like to add money?
          </Text>
        </View>
        <Button onPress={() => { navigation.navigate('AddmoneystepScreen'); }} color={theme.colors.backgroundColor} style={styles.mannual}>
          <View style={styles.row}>
            <Text style={styles.text}>
              {walletadd}
            </Text>
          </View>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundColor,
    paddingHorizontal: 19,
    paddingTop: 45,
    paddingBottom: 130,
  },
  header: {
    textAlign: 'center',
  },
  title: {
    color: theme.colors.whiteColor,
    fontSize: theme.fontSize.subtitle0,
    fontWeight: theme.fontWeight.bold,
    marginVertical: 20,
    marginBottom: 46,
    width: 280,
    textAlign: 'left'
  },
  mannual: {
    backgroundColor: theme.colors.yellowtextColor,
    marginVertical: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 20,
    justifyContent: 'space-between'
  },
  svg: {
    marginLeft: 10,
    width: 25,
    height: 25,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.backgroundColor,
    borderRadius: 25,
  },
  text: {
    fontWeight: theme.fontWeight.normal,
    fontSize: 18,
    lineHeight: 22,
  },
  row: {
    width: '100%',
    height: 60,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
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
