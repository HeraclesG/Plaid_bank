
import { StatusBar } from 'expo-status-bar';
import moment from 'moment'
import React, { useState,useEffect, } from 'react';
import { StyleSheet, Text, Image, TouchableOpacity, View, ScrollView  } from 'react-native';
import { theme } from '../core/theme';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import Modal from 'react-native-modal';
import Svg, { Path, Circle } from "react-native-svg"
import { useSelector, useDispatch } from 'react-redux';
import { transDetailApi,transferasset } from '../module/server/home_api';
import LoadingCard from '../components/LoadingCard';


export default function TransactionDetailScreen({ navigation }) {
  const dispatch=useDispatch();
  const handleOpenModalPress = () => setIsModalVisible(true);
  const handleCloseModalPress = () => setIsModalVisible(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [message, setMessage] = useState('error');
  const date = useSelector((store) => store.user.authToken);
  const cash_num = useSelector((store) => store.user.cash_num);
  const type = useSelector((store) => store.user.midvalue2);
  const amount = useSelector((store) => store.user.contactId);
  const username = useSelector((store) => store.user.midvalue);
  const mename = useSelector((store) => store.user.username);
  const [info, setInfo]=useState();
  useEffect(() => {
    getTransDetail();
  }, []);
  const getTransDetail = async () => {
    const response = await transDetailApi(username=='Self'?mename:username);
    if (response.message) {
      console.log('success');
      setInfo({
        firstName:response.value.firstName,
        lastName:response.value.lastName,
        email:response.value.email,
        accountId:response.value.accountId,
        contactId:response.value.contactId,
        id:response.value.id,
      });
      return;
    }
    setMessage(response.value);
    handleOpenModalPress();
  }
  return (
    <View style={styles.container}>
      {!info?<LoadingCard/>:<ScrollView>
        <View style={styles.header}>
          <TouchableOpacity onPress={navigation.goBack} style={{ paddingHorizontal: 19, zIndex: 1 }}>
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
           Transaction Details
          </Text>
        </View>
        <View style={styles.body}>
          <Image style={styles.avatar} source={require('../assets/avatar.jpg')} />
          <Text style={styles.name}>
             {info.firstName} {info.lastName}
          </Text>
          <Text style={styles.name}>
            {username}
          </Text>
          <View style={styles.buttons}>
            <Button onPress={()=>{}} color={theme.colors.backgroundColor} style={styles.mannual}>
              <Text style={styles.bttext}>
               Add to contacts?
              </Text>  
              <View style={{width:7}}></View>
              <Svg
                width={16}
                height={14}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <Path
                  d="M4.667 1C2.826 1 1.333 2.477 1.333 4.3c0 1.471.584 4.963 6.326 8.493a.656.656 0 0 0 .682 0c5.742-3.53 6.326-7.022 6.326-8.493 0-1.823-1.493-3.3-3.334-3.3C9.493 1 8 3 8 3S6.507 1 4.667 1Z"
                  stroke="#000"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>  
            </Button>
            <View style={{width:10}}></View>
            <Button onPress={()=>{
              dispatch(transferasset({
                contactId: info.accountId,
                authToken: username,
                midvalue: info.email,
              }));
              navigation.navigate('SendMoneystepScreen');
            }} color={theme.colors.backgroundColor} style={styles.mannual2}>
              <Text style={styles.bttext}>
                Send Money
              </Text>  
            </Button>
          </View>
          <Text style={styles.normal}>
                {username == "Self"?'You':info.firstName+' '+info.lastName+' '} {type === "internal" ? amount > 0 ? "Received" : "Sent" : amount > 0 ? "Deposit" : "Withdraw"} {username != "Self"?'you':''} 
            <Text style={styles.special}>
             {' '}{cash_num?'$':''}{Math.abs(amount)}{cash_num?'':'USDC'}
            </Text>
          </Text>
          <Text style={styles.normal}>
            on 
            <Text style={styles.special}>
            {' '+moment(date).format('LL')+' '}
            </Text>
            at 
            <Text style={styles.special}>
            {' '+moment(date).format('LT')}
            </Text>
          </Text>
          <TouchableOpacity onPress={()=>{navigation.goBack()}}>
            <Text style={styles.viewall}>
              View your transaction history
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>}
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
    flex:1,
    paddingHorizontal: 23,
    backgroundColor: theme.colors.backgroundColor,
    flexDirection: 'row-reverse',
  },
  header: {
    marginTop: 70,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    position: 'absolute',
    width: '100%',
    textAlign: 'center',
    color: theme.colors.whiteColor,
    fontSize: theme.fontSize.subtitle,
    fontWeight: theme.fontWeight.normal,
  },
  title: {
    color: theme.colors.thickyellowColor,
    fontSize: theme.fontSize.title1,
    fontWeight: theme.fontWeight.small
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 50,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 50,
  },
  name: {
    textAlign: 'center',
    color: theme.colors.whiteColor,
    marginTop: 5,
    fontSize: theme.fontSize.content,
    fontWeight: theme.fontWeight.bold,
  },
  normal:{
    fontSize:theme.fontSize.content0,
    color:theme.colors.whiteColor,
    textAlign:'center',
    marginVertical:2,
  },
  special:{
    color:theme.colors.yellowtextColor,
    fontSize:theme.fontSize.subtitle1

  },
  viewall:{
    marginLeft:'auto',
    marginRight:'auto',
    marginTop:60,
    textAlign:'center',
    color:theme.colors.greytextColor,
    fontSize:theme.colors.content,
    borderBottomWidth:1,
    borderBottomColor:theme.colors.greytextColor,
  },
  mannual: {
    display:'flex',
    flexDirection:'row',
    backgroundColor: theme.colors.yellowtextColor,
    marginVertical: 1,
    paddingVertical: 4,
    marginLeft:'auto',
    paddingHorizontal:6,
    borderRadius: 10,
  },
   mannual2: {
    backgroundColor: theme.colors.yellowtextColor,
    marginVertical: 1,
    paddingVertical: 4,
    marginRight:'auto',
    paddingHorizontal:6,
    borderRadius: 10,
  },
  bttext: {
    textAlign: 'center',
    fontWeight: theme.fontWeight.normal,
    fontSize: 14,
    lineHeight: 14,
    color: theme.colors.backgroundColor
  },
  buttons:{
    marginBottom:30,
    paddingVertical:30,
    display:'flex',
    flexDirection:'row',
    justifyContent:'center',
    borderBottomWidth:1,
    borderBottomColor:theme.colors.whiteColor,
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
