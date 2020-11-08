import React, { useState, useEffect } from 'react'
import { ActivityIndicator, Button, StyleSheet, Text, View } from 'react-native'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import theme from '../theme.json'
import QRCode from 'react-native-qrcode-svg';

const HomeScreen = () => {

    const [currentData, setCurrentData] = useState(null);

    useEffect(() => {
        var isMounted = true;
        const fetchData = async () => {
            firestore().collection("devices").where("user", "==", auth().currentUser.email).onSnapshot(snapshot => {
                snapshot.forEach(snap => {
                    if (snap.exists) {
                        if (isMounted) {
                            setCurrentData(snap.data())
                        }
                    }
                })
            })
        }
        fetchData();
        return () => {
            isMounted = false
        }
    }, [])

    return (
        <View style={styles.container}>
            
                <Text style={{ color: 'white', fontSize: 32, marginVertical: 50,  fontWeight: 'bold' }}>{
                currentData !== null ? `${currentData.currentTemp.toFixed(2)}°C`  : "No Data"
                }</Text>
            
            <QRCode value={currentData !== null ? `https://kelvin-web.netlify.app/${currentData.deviceId.toString()}/${currentData.currentUID.toString()}/${currentData.currentTemp.toString()}` : "null"} size={200} backgroundColor='black' color='white' ></QRCode>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.black,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
