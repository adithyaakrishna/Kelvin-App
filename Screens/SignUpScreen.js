import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator, ToastAndroid } from 'react-native'
import theme from '../theme.json'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

const SignUpScreen = ({ navigation }) => {

    const [submitted, setSubmitted] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [deviceId, setDeviceId] = useState("");

    const handleSubmit = async() => {
        setSubmitted(true)
        await auth().createUserWithEmailAndPassword(email, password).then(async(user) => {
            await firestore().collection("devices").doc(deviceId).set({
                user: email,
                currentTemp: 0,
                currentUID: "",
                deviceId: deviceId
            }).catch((error) => {console.log(error.message)})
        }).then(() => {
            setSubmitted(false)
        }).catch((err) => {
            ToastAndroid.showWithGravity(err.message, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
            setSubmitted(false)
        })
    } 

    return (
        <View style={styles.container}>
            <Text style={styles.welcomeText}>Welcome!</Text>
            <Text style={styles.signUpText}>Sign Up</Text>
            <TextInput style={styles.textInput} placeholder="Email"
                placeholderTextColor='white'
                value={email}
                onChangeText={(e) => { setEmail(e) }}
                editable={!submitted}></TextInput>
            <TextInput style={styles.textInput}
                placeholder="Password"
                placeholderTextColor='white'
                secureTextEntry={true}
                value={password}
                onChangeText={(e) => { setPassword(e) }}
                editable={!submitted}></TextInput>
            <TextInput style={styles.textInput}
                placeholder="Device ID"
                placeholderTextColor='white'
                keyboardType='number-pad'
                value={deviceId}
                onChangeText={(e) => { setDeviceId(e) }}
                editable={!submitted}></TextInput>
            <TouchableOpacity style={styles.signInButton} activeOpacity={0.8} onPress = {handleSubmit}>
                {
                    submitted ? <ActivityIndicator color='white' size={32}></ActivityIndicator> : <Text style={styles.signUpText}>Sign Up</Text>
                }
            </TouchableOpacity>

            <Text style={styles.signInText}>Already have an account?<Text style={{ color: theme.blue, fontWeight: 'bold' }} onPress={() => {
                navigation.pop();
            }}> Sign In</Text></Text>
        </View>
    )
}

export default SignUpScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 30,
        backgroundColor: theme.black,
        justifyContent: 'center'
    },
    welcomeText: {
        color: 'white',
        fontSize: 52,
        fontWeight: 'bold',
        marginVertical: 20
    },
    signUpText: {
        color: 'white',
        fontSize: 24
    },
    textInput: {
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        color: 'white',
        marginVertical: 20
    },
    signInButton: {
        backgroundColor: theme.blue,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 30,
        width: "60%",
        alignSelf: 'center'
    },
    signInText: {
        color: 'white',
        alignSelf: 'center',
        marginVertical: 30
    }
})
