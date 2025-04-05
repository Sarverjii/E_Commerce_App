import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const Header = () => {
  return (
    <View style = {styles.container}>
        <View style = {styles.appIconContainer}>
            <Image 
              source = {require("../assets/appicon.png")} 
              style={styles.appIcon}
            />
        </View>
        <Image source = {require("../assets/Dp.png")} style = {styles.Dp}/>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({

  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 25
  },

  Dp: {
    height: 60,
    width: 60,
    borderRadius: 30
  },
  appIconContainer : {
    backgroundColor: "#FFFFFF",
    height: 50,
    width:50,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center"
  },

  appIcon : {
    height: 40,
    width:40
  }
})