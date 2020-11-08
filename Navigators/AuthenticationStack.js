import React from 'react'
import { createStackNavigator, CardStyleInterpolators, } from '@react-navigation/stack'
import SignInScreen from '../Screens/SignInScreen'
import SignUpScreen from '../Screens/SignUpScreen'

const Stack = createStackNavigator();

export default AuthenticationStack = () => {
    return (
        <Stack.Navigator screenOptions={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS}}>
            <Stack.Screen name="SignInScreen" component={SignInScreen}></Stack.Screen>
            <Stack.Screen name='SignUpScreen' component={SignUpScreen}></Stack.Screen>
        </Stack.Navigator>
    )
}