
import React, { useState } from 'react';
import { StyleSheet, Image, Text, TouchableOpacity, FlatList,ScrollView, View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { theme } from '../core/theme';
import Svg, { Path, Circle } from "react-native-svg"
import ProfilelistCard from '../components/ProfilelistCard';
import ProfileCard from '../components/ProfileCard';

export default function ProfileScreen({ navigation, onView }) {
  const properity = {
    avatar: '',
    name: 'John Doe',
    nickname: '@johndoe',
    phone: '(000)-000-0000',
    email: 'johndoe@emailaddress.com'
  }
  const data = [
    { id: 1, avatar: "profile.svg", name: "Profile", navigate: '04 August, 2022' },
    { id: 2, avatar: "payment.svg", name: "Payment Methods", navigate: '21 July, 2022' },
    { id: 3, avatar: "wallet.svg", name: "View Wallet ID", navigate: '16 July, 2022' },
    { id: 4, avatar: "privacy.svg", name: "Privacy and Security", navigate: '08 July, 2022' },
    { id: 5, avatar: "help.svg", name: "Help", navigate: '16 July, 2022' },
    { id: 6, avatar: "logout.svg", name: "Logout", navigate: '08 July, 2022' },
  ];
  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = query => setSearchQuery(query);
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
                fill="#000"
              />
            </Svg>
          </TouchableOpacity>
          <Text style={styles.text}>
            Settings
          </Text>
        </View>
      <ScrollView>
        <ProfileCard item={properity} />
        <FlatList style={styles.list}
          data={data}
          keyExtractor={(item) => {
            return item.id;
          }}
          renderItem={(list) => {
            const item = list.item;
            return (
              <ProfilelistCard item={item} navigation={navigation} />
            )
          }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.whiteColor,
    paddingHorizontal: 19,
    paddingVertical: 50,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50
  },
  text: {
    position:'absolute',
    width: '100%',
    textAlign: 'center',
    color: theme.colors.blackColor,
    fontSize: theme.fontSize.subtitle,
    fontWeight: theme.fontWeight.normal,
  },
  searchbar: {
    marginVertical: 40,
    shadowColor: theme.colors.whiteColor,
    borderColor: theme.colors.searchborderColor,
    borderWidth: 1,
    borderRadius: 5,
  },
  list: {
    marginHorizontal: 30,
  },
  subtitle: {
    marginTop: 20,
    textAlign: 'center',
    color: theme.colors.lightgreytextColor,
    fontSize: theme.fontSize.content,
    fontWeight: theme.fontWeight.small,
    opacity: 0.66,
    letterSpacing: 1.5
  },
  header: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
