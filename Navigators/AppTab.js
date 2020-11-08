import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../Screens/HomeScreen'
import ReportScreen from '../Screens/ReportScreen'
import theme from '../theme.json'

const BottomTab = createBottomTabNavigator();

export default AppTab = () => {
    return (
        <BottomTab.Navigator tabBarOptions={{
            style: { backgroundColor: 'black', borderTopWidth: 0 },
            activeTintColor: theme.blue,
            inactiveTintColor: 'white',
            labelStyle: {fontSize: 16}
        }}>
            <BottomTab.Screen name='HomeScreen' component={HomeScreen} options = {{tabBarIcon: () => null, title: "QR"}}></BottomTab.Screen>
            <BottomTab.Screen name='ReportScreen' component={ReportScreen} options={{ tabBarIcon: () => null, title: "Report" }}></BottomTab.Screen>
        </BottomTab.Navigator>
    )
}