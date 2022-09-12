
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, Image, View } from 'react-native';
import { theme } from '../core/theme';
import Svg, { Path, Circle } from "react-native-svg"
import Button from '../components/Button';
import DocumentPicker from 'react-native-document-picker';
import { userStore } from '../module/user/UserStore';

export default function FileuploadScreen({ navigation }) {
  const [selected, setSelected] = useState(['', '']);
  const [sort, setSort] = useState(true);
  const [front, setFront] = useState(null);
  const [back, setBack] = useState(null);
  const [message, setMessage] = useState('aaa');

  const selectFront = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      setMessage('res : ' + JSON.stringify(res));
      setFront(res);
      setSelected(['selected', selected[1]]);
    } catch (err) {
      setFront(null);
      if (DocumentPicker.isCancel(err)) {
        setMessage('Canceled');
      } else {
        setMessage('Unknown Error: ' + JSON.stringify(err));
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
        setMessage('Unknown Error: ' + JSON.stringify(err));
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
        ).then(res => res.json()).then((data1) => { console.log(data1) }).catch(err => { console.log('error', err); return; });
      }).catch(err => { console.log('error', err); return; });
    } else {
      setMessage('Please Select File first');
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
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
          <View style={{ width: '45%', displa: 'flex', alignItems: 'center' }}>
            <Text style={{ color: theme.colors.whiteColor }}>front</Text>
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
          <View style={{ width: '45%', displa: 'flex', alignItems: 'center' }}>
            <Text style={{ color: theme.colors.whiteColor }}>back</Text>
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
    backgroundColor: theme.colors.backgroundColor,
    borderStyle: 'dashed',
    borderColor: theme.colors.whiteColor,
    borderWidth: 1,
    borderRadius: 5,
    width: '100%',
    height: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
