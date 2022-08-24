import { DefaultTheme } from 'react-native-paper'

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors, 
    backgroundColor:'#141414',
    blackColor:'#00000',
    searchborderColor:"#BABABA",
    homebackgroundColor:'#EFEFEF',
    yellowtextColor:'#C6A15A',
    greytextColor:'#ADADAD',
    thickgreytextColor:'#5D5D5D',
    lightgreytextColor:'#5C5C5C',
    whiteColor:'#FFFFFF',
    thickyellowColor:'#C6A15A',
    textinputbackColor:'#3C3C3C',
    pinbackColor:'#242424',
    bottomColor:'#111111',
    underlineColor:'#E2E2E2',
    description:'blue',
    bottomColor:'#242424',
    error:'red',
    redColor:'red'
  },
  fontSize:{
    title:54,
    title01:40,
    title1:36,
    title2:32,
    subtitle0:30,
    subtitle:24,
    subtitle01:20,
    subtitle1:18,
    content0:16,
    content:14,
    smallSize:12,

  },
  fontWeight:{
    large:900,
    bold:700,
    normal:400,
    small:200,
  },
}