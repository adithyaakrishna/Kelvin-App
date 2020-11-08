import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { StatusBar, StyleSheet, Text, View } from 'react-native'
import RootNavigator from './Navigators/RootNavigator'
import theme from './theme.json'

const App = () => {
  return (
    <NavigationContainer>
    <StatusBar backgroundColor = {theme.black}></StatusBar>
      <RootNavigator></RootNavigator>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})

