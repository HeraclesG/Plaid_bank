
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, Image, View } from 'react-native';
import { theme } from '../core/theme';
import Svg, { Path, Circle } from "react-native-svg"
import Button from '../components/Button';
import DocumentPicker from 'react-native-document-picker';
import { userStore } from '../module/user/UserStore';
import Modal from 'react-native-modal';

export default function FileuploadScreen({ navigation }) {
  const [selected, setSelected] = useState(['', '']);
  const [success, setSuccess] = useState(false);
  const [front, setFront] = useState(null);
  const [back, setBack] = useState(null);
  const [message, setMessage] = useState('error');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleOpenModalPress = () => setIsModalVisible(true);
  const handleCloseModalPress = () => setIsModalVisible(false);
  const selectFront = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      // setMessage('res : ' + JSON.stringify(res));
      setFront(res);
      setSelected(['selected', selected[1]]);
    } catch (err) {
      setFront(null);
      if (DocumentPicker.isCancel(err)) {
        // setMessage('Canceled');
      } else {
        setMessage('file upload false');
        handleOpenModalPress();
        throw err;
      }
    }
  };
  const selectBack = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      setMessage('res : ' + JSON.stringify(res));
      setSelected([selected[0], 'selected']);
      setBack(res);
    } catch (err) {
      setBack(null);
      if (DocumentPicker.isCancel(err)) {
        setMessage('Canceled');
      } else {
        setMessage('file upload false');
        handleOpenModalPress();
        throw err;
      }
    }
  };
  const uploadImage = async () => {
    // Check if any file is selected or not
    if (selected[0] !== '' && selected[1] !== '') {
      console.log(userStore.user.id);
      const fs = require
      const fileToUpload = front;
      const data = new FormData();
      console.log(fileToUpload);
      data.append('file', fileToUpload[0]);
      data.append('contact-id', userStore.user.id);
      data.append('description', "Front of Driver's License");
      data.append('label', "Front Driver's License");
      data.append('public', true);
      // Please change file upload URL
      await fetch(
        'https://sandbox.primetrust.com/v2/uploaded-documents',
        {
          method: 'post',
          body: data,
          headers: {
            // 'Accept': 'application/json',
            Authorization: `Bearer ${userStore.user.authToken}`,
            'Content-Type': 'multipart/form-data; ',
          },
        }
      ).then(res => res.json()).then(async (data1) => {
        const fs = require
        const fileToUpload = back;
        const data = new FormData();
        console.log(fileToUpload);
        data.append('file', fileToUpload[0]);
        data.append('contact-id', userStore.user.id);
        data.append('description', "Back of Driver's License");
        data.append('label', "Backside Driver's License");
        data.append('public', true);
        // Please change file upload URL
        await fetch(
          'https://sandbox.primetrust.com/v2/uploaded-documents',
          {
            method: 'post',
            body: data,
            headers: {
              // 'Accept': 'application/json',
              Authorization: `Bearer ${userStore.user.authToken}`,
              'Content-Type': 'multipart/form-data; ',
            },
          }
        ).then(res => res.json()).then((data1) => {
          setMessage('Please wait until verify');
          setSuccess(true);
          handleOpenModalPress();
        }).catch(err => {
          setMessage('File upload falied');
          handleOpenModalPress(); return;
        });
      }).catch(err => {
        setMessage('File upload falied');
        handleOpenModalPress(); return;
      });
    } else {
      setMessage('Please Select File first');
      handleOpenModalPress();
    }

  };
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
      <View >
        <View style={styles.header}>
          <Text style={styles.title}>
            KYC file upload
          </Text>
        </View>
        <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
          <View style={{ width: '80%', displa: 'flex', alignItems: 'center', marginLeft: 'auto', marginRight: 'auto' }}>
            <Text style={{ color: theme.colors.whiteColor }}>Front</Text>
            <TouchableOpacity style={styles.upload} onPress={selectFront}>
              <Svg
                width={20}
                height={20}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <Path
                  d="M10 0a1.25 1.25 0 0 1 1.25 1.25v7.5h7.5a1.25 1.25 0 0 1 0 2.5h-7.5v7.5a1.25 1.25 0 0 1-2.5 0v-7.5h-7.5a1.25 1.25 0 0 1 0-2.5h7.5v-7.5A1.25 1.25 0 0 1 10 0Z"
                  fill="#fff"
                />
              </Svg>
            </TouchableOpacity>
            <Text style={{ color: theme.colors.whiteColor }}>{selected[0]}</Text>
          </View>
          <View style={{ width: '80%', displa: 'flex', alignItems: 'center', marginLeft: 'auto', marginRight: 'auto' }}>
            <Text style={{ color: theme.colors.whiteColor }}>Back</Text>
            <TouchableOpacity style={styles.upload} onPress={selectBack}>
              <Svg
                width={20}
                height={20}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <Path
                  d="M10 0a1.25 1.25 0 0 1 1.25 1.25v7.5h7.5a1.25 1.25 0 0 1 0 2.5h-7.5v7.5a1.25 1.25 0 0 1-2.5 0v-7.5h-7.5a1.25 1.25 0 0 1 0-2.5h7.5v-7.5A1.25 1.25 0 0 1 10 0Z"
                  fill="#fff"
                />
              </Svg>
            </TouchableOpacity>
            <Text style={{ color: theme.colors.whiteColor }}>{selected[1]}</Text>
          </View>
        </View>
      </View>
      <Modal isVisible={isModalVisible} hasBackdrop={true} >
        <View style={styles.modal}>
          <TouchableOpacity onPress={() => {
            if (success) {
              navigation.navigate('DashboardScreen');
            } else {
              handleCloseModalPress()
            }
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
      <Button onPress={() => { uploadImage(); }} color={theme.colors.backgroundColor} style={styles.mannual}>
        <Text style={styles.bttext}>
          Upload
        </Text>
      </Button>
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
    marginVertical: 50,
  },
  title: {
    color: theme.colors.whiteColor,
    fontSize: theme.fontSize.subtitle0,
    fontWeight: theme.fontWeight.bold,
    textAlign: 'center',
  },
  mannual: {
    backgroundColor: theme.colors.yellowtextColor,
    marginLeft: '10%',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 20,
    position: 'absolute',
    width: '90%',
    bottom: 50,
  },
  bttext: {
    textAlign: 'center',
    fontWeight: theme.fontWeight.bold,
    fontSize: 18,
    lineHeight: 22,
    color: theme.colors.backgroundColor
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
  row: {
    height: 60,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  upload: {
    backgroundColor: theme.colors.thickgreytextColor,
    borderStyle: 'dashed',
    borderColor: theme.colors.whiteColor,
    borderWidth: 1,
    borderRadius: 5,
    width: '100%',
    height: 165,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
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
