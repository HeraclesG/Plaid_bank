import { DefaultTheme } from 'react-native-paper'

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    backgroundColor:'#000000',
    yellowtextColor:'#C6A15A',
    greytextColor:'#ADADAD',
    thickgreytextColor:'#5D5D5D',
    whiteColor:'#FFFFFF',
    thickyellowColor:'#C6A15A',
    textinputbackColor:'#3C3C3C',
    pinbackColor:'#242424',
    bottomColor:'#111111',
    description:'blue',
    error:'red'
  },
  fontSize:{
    title:54,
    title1:36,
    title2:32,
    subtitle0:30,
    subtitle:24,
    subtitle1:18,
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