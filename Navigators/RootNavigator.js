import React, { useState, useEffect } from 'react'
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack'
import AuthenticationStack from './AuthenticationStack';
import AppTab from './AppTab';
import auth from '@react-native-firebase/auth'

const Stack = createStackNavigator();

export default RootNavigator = () => {

    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        let isMounted = true;
        auth().onAuthStateChanged((user) => {
            if (user === null) {
                if (isMounted) {
                    setCurrentUser(null)
                }
            } else {
                if (isMounted) {
                    setCurrentUser(user)
                }
            }
        })

        return () => {
            isMounted = false;
        }
    }, [currentUser])

    return (
        <Stack.Navigator screenOptions={{ header: () => null, cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }}>
            {
                currentUser === null ?
                    <Stack.Screen name='AuthenticationStack' component={AuthenticationStack}></Stack.Screen> :
                    <Stack.Screen name='AppTab' component={AppTab}></Stack.Screen>

            }


        </Stack.Navigator>
    )
}