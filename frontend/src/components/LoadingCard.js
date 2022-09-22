import React from 'react'
import { StyleSheet, ActivityIndicator, View } from 'react-native'

export default function LoadingCard({ mode, style, ...props }) {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={"#00ff00"} size='large'/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  }
})