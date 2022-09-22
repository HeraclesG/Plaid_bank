
import React, { useState,useEffect } from 'react';
import { StyleSheet, Image, Text, TouchableOpacity, FlatList, View, ScrollView } from 'react-native';
import { theme } from '../core/theme';
import Svg, { Path, Circle } from "react-native-svg"
import Button from '../components/Button';
import PagerView from 'react-native-pager-view';
import HomeCard from '../components/HomeCard';
import { transdetail } from '../redux/actions/user';
import LoadingCard from '../components/LoadingCard';
import moment from 'moment';
import Modal from 'react-native-modal';
import { useSelector, useDispatch } from 'react-redux';
import { fundBalanceApi, tranSHistoryApi, fundSHistoryApi, getAssetBalanceApi } from '../module/server/home_api';

export default function SatisticsScreen({ navigation }) {
  const handleOpenModalPress = () => setIsModalVisible(true);
  const handleCloseModalPress = () => setIsModalVisible(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch=useDispatch();
  const [check, setCheck] = useState(true);
  const sort = useSelector((store) => store.user.cash_num);
  const [message, setMessage] = useState('aaa');
  const [data, setData] = useState([]);
  // const data = [
  //   { id: 1, avatar: "avatar.jpg", name: "Lisa Benson", date: '04 August, 2022', money: "25.95" },
  //   { id: 2, avatar: "avatar.jpg", name: "Cody Christian", date: '21 July, 2022', money: "40.21" },
  //   { id: 3, avatar: "avatar.jpg", name: "Abby Grahm", date: '16 July, 2022', money: "100.00" },
  //   { id: 4, avatar: "avatar.jpg", name: "Grace Jones", date: '08 July, 2022', money: "5.95" },
  // ];
  useEffect(() => {
    if (sort) {
      fundSHistory();
    } else {
      tranSHistory();
    }
  }, [sort])
  const fundSHistory = async () => {
    const response = await fundSHistoryApi();
    if (response.message) {
      const mid = [];
      for (let i = 0; i < response.value.length; i++) {
        mid.push({
          id: i + 1,
          avatar: "avatar.jpg",
          name: response.value[i].userName,
          type: response.value[i]['funds-transfer-type'],
          date: new Date(response.value[i]['settled-at']),
          money: response.value[i].amount,
        });
      }
      console.log(mid);
      setData(mid);
      return;
    }
    setMessage(response.value);
    handleOpenModalPress();
  }
  const tranSHistory = async () => {
    const response = await tranSHistoryApi();
    if (response.message) {
      const mid = [];
      for (let i = 0; i < response.value.length; i++) {
        mid.push({
          id: i + 1,
          avatar: "avatar.jpg",
          name: response.value[i].userName,
          type: response.value[i]['asset-transfer-type'],
          date: response.value[i]['settled-at'],
          money: response.value[i]['unit-count'],
        });
      }
      setData(mid);
      return;
    }
    setMessage(response.value);
    handleOpenModalPress();
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => { navigation.goBack() }} style={{zIndex:1}}>
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
          Statistics
        </Text>
      </View>
      <Text style={styles.activity}>
        Activity
      </Text>
      <View style={styles.buttongroup}>
        <View style={(check ? styles.scan : styles.show)}>
          <Text style={styles.earn}>Earned</Text>
        </View>
        <Text style={styles.spent}>Spent</Text>
      </View>
      <PagerView style={styles.pagerView} initialPage={0}>
        <ScrollView key="1">
          <View style={{ height: 300 }}>
            <Text style={{ textAlign: 'center', marginTop: 'auto', marginBottom: 'auto',color:theme.colors.whiteColor }}>Chart</Text>
          </View>
          <View style={styles.body}>
            <View style={styles.row}>
              <Text style={styles.recent}>
                Recent Activity
              </Text>
              <TouchableOpacity onPress={() => { }}>
                <Text style={styles.all}>
                  View All
                </Text>
              </TouchableOpacity>
            </View>
            {data.length?<FlatList style={styles.list}
              data={data}
              keyExtractor={(item) => {
                return item.id;
              }}
              renderItem={(list) => {
                const item = list.item;
                return (
                  <TouchableOpacity onPress={()=>{
                    dispatch(transdetail({
                      authToken:item.date,
                      midvalue:item.name,
                      midvalue2:item.type,
                      contactId:item.money
                    }));
                    navigation.navigate('TransactionDetailScreen');}}>
                    <HomeCard item={item} />
                  </TouchableOpacity>
                )
              }} />:<LoadingCard/>}
          </View>
        </ScrollView>
        <View key="2">
          <Text>Second page</Text>
        </View>
      </PagerView>
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
    paddingTop: 45,
    paddingLeft: 30,
    paddingRight: 30,
  },
  header: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    position:'absolute',
    width: '100%',
    textAlign: 'center',
    color: theme.colors.whiteColor,
    fontSize: theme.fontSize.subtitle,
    fontWeight: theme.fontWeight.normal,
  },
  activity: {
    paddingTop:30,
    width: '100%',
    textAlign: 'left',
    color: theme.colors.whiteColor,
    fontSize: theme.fontSize.subtitle,
    fontWeight: theme.fontWeight.normal,
  },
  buttongroup: {
    marginTop: 20,
    position: 'relative',
    width: '100%',
    height: 39,
    borderRadius: 20,
    backgroundColor: 'rgba(198, 161, 90, 0.33)'
  },
  scan: {
    position: 'absolute',
    left: 0,
    width: '50%',
    height: 39,
    borderRadius: 20,
    backgroundColor: 'rgba(198, 161, 90, 0.33)'
  },
  show: {
    position: 'absolute',
    right: 0,
    width: '50%',
    height: 39,
    borderRadius: 20,
    color: 'rgba(198, 161, 90, 0.33)'
  },
  pagerView: {
    flex: 1,
  },
  earn: {
    textAlign: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
    color: theme.colors.whiteColor
  },
  spent: {
    color:'#CACACA',
    textAlign: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: '50%',
  },
  avatar: {
    marginTop: 50,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  pleaseqr: {
    marginTop: 50,
    fontSize: theme.fontSize.content,
    textAlign: 'center'
  },
  body: {
    backgroundColor: theme.colors.backgroundColor,
  },
  row: {
    height: 60,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 17,
  },
  recent: {
    color: theme.colors.whiteColor,
    fontSize: theme.fontSize.subtitle1,
    fontWeight: theme.fontWeight.normal,
  },
  all: {
    color: theme.colors.whiteColor,
    fontSize: theme.fontSize.content0,
    fontWeight: theme.fontWeight.normal,
  },
  list: {
    marginHorizontal: 17,
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
